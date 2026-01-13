import { Observable } from "rxjs";
import type {EducationalProgram} from "../types/EducationalProgram.ts";

export function searchProgramsStream(query: string): Observable<EducationalProgram> {
    return new Observable<EducationalProgram>(subscriber => {
        const controller = new AbortController();

        fetch(`/api/programs/search?q=${encodeURIComponent(query)}`, {
            headers: { Accept: "text/event-stream" },
            signal: controller.signal
        })
            .then(async response => {
                const reader = response.body?.getReader();
                if (!reader) {
                    subscriber.complete();
                    return;
                }

                const decoder = new TextDecoder();

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    const lines = chunk.split("\n");

                    for (const line of lines) {
                        if (line.startsWith("data:")) {
                            try {
                                const program: EducationalProgram = JSON.parse(line.slice(5));
                                subscriber.next(program);
                            } catch (e) {
                                console.error("JSON parse error:", e);
                            }
                        }
                    }
                }

                subscriber.complete();
            })
            .catch(err => subscriber.error(err));

        return () => controller.abort();
    });
}
