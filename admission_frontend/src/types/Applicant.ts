export interface Applicant {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    pointsNumber: number | null;
    previousEducationAverageScore: number | null;
    entranceTest: string;
}
