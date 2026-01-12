export interface EducationalProgram {
    id: number;
    title: string;
    description: string;
    educationLevel: string;
    budgetPlacesNumber: number | null;
    contractPlacesNumber: number | null;
    contractCost: number | null;
    minimumPassingScore: number | null;
}
