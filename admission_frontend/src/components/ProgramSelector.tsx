import { useEffect, useState } from "react";
import { allPrograms$ } from "../api/programsApi";
import type { EducationalProgram } from "../types/EducationalProgram";
import styles from "./ProgramSelector.module.css";

export function ProgramSelector({ onSelect }: { onSelect: (programId: number | null) => void }) {
    const [programs, setPrograms] = useState<EducationalProgram[]>([]);

    useEffect(() => {
        const sub = allPrograms$().subscribe({
            next: setPrograms,
            error: console.error
        });
        return () => sub.unsubscribe();
    }, []);

    return (
        <div className={styles.selectorContainer}>
            <label htmlFor="program-select" className={styles.label}>
                Select a program:
            </label>

            <select
                id="program-select"
                className={styles.select}
                onChange={e => {
                    const value = e.target.value;
                    onSelect(value === "" ? null : Number(value));
                }}
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
