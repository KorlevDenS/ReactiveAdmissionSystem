import { useEffect, useState } from "react";
import { allPrograms$ } from "../api/programsApi";
import type { EducationalProgram } from "../types/EducationalProgram";

export function ProgramSelector({
                                    onSelect
                                }: {
    onSelect: (programId: number) => void;
}) {
    const [programs, setPrograms] = useState<EducationalProgram[]>([]);

    useEffect(() => {
        const sub = allPrograms$().subscribe({
            next: setPrograms,
            error: console.error
        });
        return () => sub.unsubscribe();
    }, []);

    return (
        <div>
            <label htmlFor="program-select">Select a program:</label>
            <select
                id="program-select"
                onChange={e => onSelect(Number(e.target.value))}
            >
                <option value="">-- Choose --</option>
                {programs.map(p => (
                    <option key={p.id} value={p.id}>
                        {p.title} ({p.educationLevel})
                    </option>
                ))}
            </select>
        </div>
    );
}
