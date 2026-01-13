package korolev.dens.admissionbackend.dto;

import java.util.Map;

public record StatsResponse(
        Long totalApplicants,
        Map<String, Long> applicationsByProgram,
        Map<String, Long> applicationsByEntranceTest,
        Double averageScoreOverall,
        Map<String, Double> averageScoreByEntranceTest
) {}
