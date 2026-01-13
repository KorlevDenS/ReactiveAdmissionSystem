import { useState } from "react";
import { ProgramSelector } from "../components/ProgramSelector";
import { ApplicantList } from "../components/ApplicantList";
import styles from "./ApplicantsPage.module.css";

export function ApplicantsPage() {
    const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null);

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Applicants by Program</h1>

            <ProgramSelector onSelect={setSelectedProgramId} />

            {selectedProgramId !== null && (
                <ApplicantList programId={selectedProgramId} />
            )}
        </div>
    );
}
