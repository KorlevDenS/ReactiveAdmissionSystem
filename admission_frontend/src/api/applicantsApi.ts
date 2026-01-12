


import { from, Observable } from "rxjs";
import type { Applicant } from "../types/Applicant";

export function applicantsByProgram$(programId: number): Observable<Applicant[]> {
    return from(
        fetch(`/api/applicants/by-program/${programId}`).then(res => res.json())
    );
}

