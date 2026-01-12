import { useEffect, useState } from "react";
import { applicantsByProgram$ } from "../api/applicantsApi";
import { programById$ } from "../api/programsApi";
import type { Applicant } from "../types/Applicant";
import type { EducationalProgram } from "../types/EducationalProgram";

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
        <div>
            <h2>
                Applicants for program:{" "}
                {program ? `${program.title} (${program.educationLevel})` : `#${programId}`}
            </h2>
            <ul>
                {applicants.map(a => (
                    <li key={a.id}>
                        {a.firstName} {a.lastName} — {a.pointsNumber} points
                    </li>
                ))}
            </ul>
        </div>
    );
}

