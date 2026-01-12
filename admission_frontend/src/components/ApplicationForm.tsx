
import React, { useEffect, useState } from "react";
import { submitApplicationWithProgress$ } from "../api/applicantSubmissionApi";
import { allPrograms$ } from "../api/programsApi";
import type { EducationalProgram } from "../types/EducationalProgram";
import type {
    ApplicantSubmissionRequest,
    SubmissionProgress,
} from "../types/submission";

export function ApplicationForm() {
    const [programs, setPrograms] = useState<EducationalProgram[]>([]);

    const [form, setForm] = useState<ApplicantSubmissionRequest>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        previousEducationAverageScore: 0,
        entranceTest: "STATE_EXAM",
        programId: 0,
    });

    const [progress, setProgress] = useState<SubmissionProgress | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const sub = allPrograms$().subscribe({
            next: setPrograms,
            error: console.error,
        });

        return () => sub.unsubscribe();
    }, []);

    const handleChange =
        (field: keyof ApplicantSubmissionRequest) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                const value =
                    field === "previousEducationAverageScore" || field === "programId"
                        ? Number(e.target.value)
                        : e.target.value;

                setForm((prev) => ({
                    ...prev,
                    [field]: value,
                }));
            };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setProgress(null);

        submitApplicationWithProgress$(form).subscribe({
            next: (p) => {
                setProgress(p);
                if (p.stage === "DONE" || p.stage === "ERROR") {
                    setIsSubmitting(false);
                }
            },
            error: (err) => {
                console.error(err);
                setProgress({
                    stage: "ERROR",
                    message: err instanceof Error ? err.message : String(err),
                });
                setIsSubmitting(false);
            },
            complete: () => {

            },
        });
    };

    return (
        <div>
            <h2>Submit Documents</h2>

            <div>
                <label>First name:</label>
                <input
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                    disabled={isSubmitting}
                />
            </div>

            <div>
                <label>Last name:</label>
                <input
                    value={form.lastName}
                    onChange={handleChange("lastName")}
                    disabled={isSubmitting}
                />
            </div>

            <div>
                <label>Email:</label>
                <input
                    value={form.email}
                    onChange={handleChange("email")}
                    disabled={isSubmitting}
                />
            </div>

            <div>
                <label>Phone number:</label>
                <input
                    value={form.phoneNumber}
                    onChange={handleChange("phoneNumber")}
                    disabled={isSubmitting}
                />
            </div>

            <div>
                <label>Address:</label>
                <input
                    value={form.address}
                    onChange={handleChange("address")}
                    disabled={isSubmitting}
                />
            </div>

            <div>
                <label>Previous education average score:</label>
                <input
                    type="number"
                    step="0.0001"
                    value={form.previousEducationAverageScore}
                    onChange={handleChange("previousEducationAverageScore")}
                    disabled={isSubmitting}
                />
            </div>


            <div>
                <label>Entrance test:</label>
                <select
                    value={form.entranceTest}
                    onChange={handleChange("entranceTest")}
                    disabled={isSubmitting}
                >
                    <option value="ENTRANCE_EXAM">Entrance exam</option>
                    <option value="STATE_EXAM">State exam</option>
                    <option value="OLYMPIAD">Olympiad</option>
                    <option value="PORTFOLIO">Portfolio</option>
                    <option value="SOCIAL_BENEFIT">Social Benefit</option>
                    <option value="RECOMMENDATION_LETTER">Recommendation letter</option>
                </select>
            </div>

            <div>
                <label>Program:</label>
                <select
                    value={form.programId || ""}
                    onChange={handleChange("programId")}
                    disabled={isSubmitting}
                >
                    <option value="">-- choose --</option>
                    {programs.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.title}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            {progress && (
                <div style={{ marginTop: "16px" }}>
                    <div>
                        <strong>Stage:</strong> {progress.stage}
                    </div>
                    <div>
                        <strong>Message:</strong> {progress.message}
                    </div>
                </div>
            )}
        </div>
    );
}
