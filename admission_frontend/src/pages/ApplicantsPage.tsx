import { useState } from "react";
import { ProgramSelector } from "../components/ProgramSelector";
import { ApplicantList } from "../components/ApplicantList";

export function ApplicantsPage() {
    const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null);

    return (
        <div>
            <h1>Applicants by Program</h1>
            <ProgramSelector onSelect={setSelectedProgramId} />
            {selectedProgramId !== null && (
                <ApplicantList programId={selectedProgramId} />
            )}
        </div>
    );
}
