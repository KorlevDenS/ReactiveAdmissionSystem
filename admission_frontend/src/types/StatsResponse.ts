export interface StatsResponse {
    totalApplicants: number;
    applicationsByProgram: Record<string, number>;
    applicationsByEntranceTest: Record<string, number>;
    averageScoreOverall: number;
    averageScoreByEntranceTest: Record<string, number>;
}
