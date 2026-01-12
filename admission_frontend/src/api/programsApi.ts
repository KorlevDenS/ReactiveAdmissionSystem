


import { from, Observable } from "rxjs";
import type { EducationalProgram } from "../types/EducationalProgram";

export function programsByApplicant$(applicantId: number): Observable<EducationalProgram[]> {
    return from(
        fetch(`/api/programs/by-applicant/${applicantId}`).then(res => res.json())
    );
}

export function allPrograms$(): Observable<EducationalProgram[]> {
    return from(
        fetch("/api/programs").then(res => res.json())
    );
}

export function programById$(programId: number): Observable<EducationalProgram> {
    return from(
        fetch(`/api/programs/${programId}`).then(res => res.json())
    );
}
