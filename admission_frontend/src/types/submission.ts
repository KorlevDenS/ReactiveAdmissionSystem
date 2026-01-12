
export type SubmissionStage =
    | "VALIDATING"
    | "CHECKING_PROGRAM"
    | "CHECKING_EMAIL_UNIQUENESS"
    | "CREATING_APPLICANT"
    | "DONE"
    | "ERROR";

export interface SubmissionProgress {
    stage: SubmissionStage;
    message: string;
}

export interface ApplicantSubmissionRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    previousEducationAverageScore: number;
    entranceTest: string;
    programId: number;
}
