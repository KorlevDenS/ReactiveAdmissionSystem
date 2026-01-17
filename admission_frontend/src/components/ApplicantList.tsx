import { useEffect, useState } from "react";
import { applicantsByProgram$ } from "../api/applicantsApi";
import { programById$ } from "../api/programsApi";
import type { Applicant } from "../types/Applicant";
import type { EducationalProgram } from "../types/EducationalProgram";
import styles from "./ApplicantList.module.css";

export function ApplicantList({ programId }: { programId: number }) {
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [program, setProgram] = useState<EducationalProgram | null>(null);

    useEffect(() => {
        const sub1 = applicantsByProgram$(programId).subscribe({
            next: setApplicants,
            error: console.error
        });

        const sub2 = programById$(programId).subscribe({
            next: setProgram,
            error: console.error
        });

        return () => {
            sub1.unsubscribe();
            sub2.unsubscribe();
        };
    }, [programId]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                {program ? `${program.title} (${program.educationLevel})` : `#${programId}`}
            </h2>

            <ul className={styles.list}>
                {(() => {
                    // Сортируем по баллам (от большего к меньшему)
                    const sorted = [...applicants].sort(
                        (a, b) => (b.pointsNumber ?? 0) - (a.pointsNumber ?? 0)
                    );

                    return sorted.map((a, index) => {
                        const points = a.pointsNumber ?? 0;
                        const min = program?.minimumPassingScore ?? null;
                        const budget = program?.budgetPlacesNumber ?? null;

                        const passesMin = min !== null && points >= min;
                        const inBudgetTop = budget !== null && index < budget;

                        let statusClass = styles.fail; // по умолчанию — оранжевый (не проходит)

                        if (passesMin) statusClass = styles.pass; // проходит минимум
                        if (passesMin && inBudgetTop) statusClass = styles.budget; // в топе бюджета

                        return (
                            <li key={a.id} className={`${styles.item} ${statusClass}`}>
                                <span className={styles.name}>
                                    {a.firstName} {a.lastName}
                                </span>
                                <span className={styles.points}>
                                    {a.previousEducationAverageScore}
                                </span>
                                <span className={styles.points}>
                                    {a.entranceTest.toLowerCase()}
                                </span>
                                <span className={styles.points}>
                                    {points} points
                                </span>
                            </li>
                        );
                    });
                })()}
            </ul>
        </div>
    );
}
