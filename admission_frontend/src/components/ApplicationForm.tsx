import React, { useEffect, useState } from "react";
import { submitApplicationWithProgress$ } from "../api/applicantSubmissionApi";
import { allPrograms$ } from "../api/programsApi";
import type { EducationalProgram } from "../types/EducationalProgram";
import type {
    ApplicantSubmissionRequest,
    SubmissionProgress,
} from "../types/submission";
import styles from "./ApplicationForm.module.css";

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
        });
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>Submit documents</h2>
            <p className={styles.subtitle}>
                Fill in your personal data and choose a program to submit your application.
            </p>

            <div className={styles.grid}>
                <div className={styles.field}>
                    <label className={styles.label}>First name</label>
                    <input
                        className={styles.input}
                        value={form.firstName}
                        onChange={handleChange("firstName")}
                        disabled={isSubmitting}
                        placeholder="John"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Last name</label>
                    <input
                        className={styles.input}
                        value={form.lastName}
                        onChange={handleChange("lastName")}
                        disabled={isSubmitting}
                        placeholder="Doe"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input
                        className={styles.input}
                        type="email"
                        value={form.email}
                        onChange={handleChange("email")}
                        disabled={isSubmitting}
                        placeholder="name@example.com"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Phone number</label>
                    <input
                        className={styles.input}
                        type="tel"
                        value={form.phoneNumber}
                        onChange={handleChange("phoneNumber")}
                        disabled={isSubmitting}
                        placeholder="+7 ..."
                    />
                </div>

                <div className={styles.fieldFull}>
                    <label className={styles.label}>Address</label>
                    <input
                        className={styles.input}
                        value={form.address}
                        onChange={handleChange("address")}
                        disabled={isSubmitting}
                        placeholder="Street, city, country"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Previous education average score</label>
                    <input
                        className={styles.input}
                        type="number"
                        step="0.0001"
                        value={form.previousEducationAverageScore}
                        onChange={handleChange("previousEducationAverageScore")}
                        disabled={isSubmitting}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Entrance test</label>
                    <select
                        className={styles.select}
                        value={form.entranceTest}
                        onChange={handleChange("entranceTest")}
                        disabled={isSubmitting}
                    >
                        <option value="ENTRANCE_EXAM">Entrance exam</option>
                        <option value="STATE_EXAM">State exam</option>
                        <option value="OLYMPIAD">Olympiad</option>
                        <option value="PORTFOLIO">Portfolio</option>
                        <option value="SOCIAL_BENEFIT">Social benefit</option>
                        <option value="RECOMMENDATION_LETTER">Recommendation letter</option>
                    </select>
                </div>

                <div className={styles.fieldFull}>
                    <label className={styles.label}>Program</label>
                    <select
                        className={styles.select}
                        value={form.programId || ""}
                        onChange={handleChange("programId")}
                        disabled={isSubmitting}
                    >
                        <option value="">-- choose a program --</option>
                        {programs.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                className={styles.button}
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Submitting..." : "Submit application"}
            </button>

            {progress && (
                <div className={styles.progressBox}>
                    <div className={styles.progressHeader}>
                        <span className={styles.progressDot} />
                        <span className={styles.progressTitle}>Submission status</span>
                    </div>
                    <div className={styles.progressLine}>
                        <span className={styles.progressLabel}>Stage:</span>
                        <span className={styles.progressValue}>{progress.stage}</span>
                    </div>
                    <div className={styles.progressLine}>
                        <span className={styles.progressLabel}>Message:</span>
                        <span className={styles.progressValue}>{progress.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
