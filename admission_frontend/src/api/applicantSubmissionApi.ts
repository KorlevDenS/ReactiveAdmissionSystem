import { Observable } from "rxjs";
import type {
    ApplicantSubmissionRequest,
    SubmissionProgress,
} from "../types/submission";

export function submitApplicationWithProgress$(
    data: ApplicantSubmissionRequest
): Observable<SubmissionProgress> {
    return new Observable<SubmissionProgress>((subscriber) => {
        let cancelled = false;
        console.log(JSON.stringify(data))

        fetch("/api/applicants/submit-stream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "text/event-stream",
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (!res.body) {
                    throw new Error("No response body");
                }

                const reader = res.body.getReader();
                const decoder = new TextDecoder("utf-8");
                let buffer = "";

                const read = (): void => {
                    if (cancelled) {
                        reader.cancel().catch(() => {});
                        return;
                    }

                    reader
                        .read()
                        .then(({ done, value }) => {
                            if (done) {
                                subscriber.complete();
                                return;
                            }

                            buffer += decoder.decode(value, { stream: true });

                            const parts = buffer.split("\n\n");
                            buffer = parts.pop() ?? "";

                            for (const part of parts) {
                                const lines = part.split("\n");
                                const dataLine = lines.find((l) => l.startsWith("data:"));
                                if (!dataLine) continue;

                                const jsonStr = dataLine.slice("data:".length).trim();
                                if (!jsonStr) continue;

                                try {
                                    const obj = JSON.parse(jsonStr) as SubmissionProgress;
                                    subscriber.next(obj);
                                } catch (e) {
                                    subscriber.error(e);
                                    return;
                                }
                            }

                            read();
                        })
                        .catch((err) => {
                            subscriber.error(err);
                        });
                };

                read();
            })
            .catch((err) => {
                subscriber.error(err);
            });

        return () => {
            cancelled = true;
        };
    });
}
