import { useEffect, useState } from "react";
import { fromEvent, debounceTime, map, distinctUntilChanged, switchMap } from "rxjs";
import { searchProgramsStream } from "../streams/programsStream";
import { ProgramCard } from "../components/ProgramCard";

import type { EducationalProgram } from "../types/EducationalProgram";
import styles from "./ProgramsSearchPage.module.css";

export default function ProgramsSearchPage() {
    const [results, setResults] = useState<EducationalProgram[]>([]);

    useEffect(() => {
        const programs: EducationalProgram[] = [];

        const stream$ = searchProgramsStream("").subscribe({
            next: program => programs.push(program),
            complete: () => setResults(programs)
        });

        return () => stream$.unsubscribe();
    }, []);

    useEffect(() => {
        const input = document.getElementById("program-search-input") as HTMLInputElement;

        const subscription = fromEvent(input, "input")
            .pipe(
                map(e => (e.target as HTMLInputElement).value),
                debounceTime(300),
                distinctUntilChanged(),
                switchMap(query => {
                    const programs: EducationalProgram[] = [];

                    return new Promise<EducationalProgram[]>(resolve => {
                        const stream$ = searchProgramsStream(query).subscribe({
                            next: program => programs.push(program),
                            complete: () => resolve(programs)
                        });

                        return () => stream$.unsubscribe();
                    });
                })
            )
            .subscribe(programs => {
                if (Array.isArray(programs)) {
                    setResults(programs);
                }
            });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className={styles.page}>
            <h2 className={styles.title}>Educational programs search</h2>

            <input
                id="program-search-input"
                type="text"
                placeholder="Enter program name..."
                className={styles.searchInput}
            />

            <ul className={styles.list}>
                {results.map(program => (
                    <ProgramCard key={program.id} program={program} />
                ))}
            </ul>
        </div>
    );
}
