package korolev.dens.admissionbackend.service;

import korolev.dens.admissionbackend.dto.EntranceTestAvg;
import korolev.dens.admissionbackend.dto.EntranceTestCount;
import korolev.dens.admissionbackend.dto.StatsResponse;
import korolev.dens.admissionbackend.repository.ApplicantProgramRepository;
import korolev.dens.admissionbackend.repository.ApplicantRepository;
import korolev.dens.admissionbackend.repository.EducationalProgramRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
public class StatsService {

    private final ApplicantRepository applicantRepository;
    private final ApplicantProgramRepository applicantProgramRepository;
    private final EducationalProgramRepository educationalProgramRepository;

    public StatsService(ApplicantRepository applicantRepository, ApplicantProgramRepository applicantProgramRepository, EducationalProgramRepository educationalProgramRepository) {
        this.applicantRepository = applicantRepository;
        this.applicantProgramRepository = applicantProgramRepository;
        this.educationalProgramRepository = educationalProgramRepository;
    }

    private Mono<Map<String, Long>> countByProgramGrouped() {
        return applicantProgramRepository.countByProgramRaw()
                .flatMap(pc ->
                        educationalProgramRepository.findById(pc.programid())
                                .map(program -> Map.entry(program.getTitle(), pc.count()))
                )
                .collectMap(Map.Entry::getKey, Map.Entry::getValue);
    }



    private Mono<Map<String, Long>> countByEntranceTestGrouped() {
        return applicantRepository.countByEntranceTestRaw()
                .collectMap(EntranceTestCount::entrancetest, EntranceTestCount::count);
    }


    private Mono<Double> averageScoreOverall() {
        return applicantRepository.averageScoreOverallRaw()
                .map(avg -> avg != null ? avg : 0.0);
    }

    private Mono<Map<String, Double>> averageScoreByEntranceTestGrouped() {
        return applicantRepository.averageScoreByEntranceTestRaw()
                .collectMap(EntranceTestAvg::entrancetest, EntranceTestAvg::avg);
    }


    public Mono<StatsResponse> collectStats() {

        Mono<Long> totalApplicants = applicantRepository.count();

        Mono<Map<String, Long>> applicationsByProgram = countByProgramGrouped();

        Mono<Map<String, Long>> applicationsByEntranceTest = countByEntranceTestGrouped();

        Mono<Double> averageScoreOverall = averageScoreOverall();

        Mono<Map<String, Double>> averageScoreByEntranceTest = averageScoreByEntranceTestGrouped();

        return Mono.zip(
                totalApplicants,
                applicationsByProgram,
                applicationsByEntranceTest,
                averageScoreOverall,
                averageScoreByEntranceTest
        ).map(tuple -> new StatsResponse(
                tuple.getT1(),
                tuple.getT2(),
                tuple.getT3(),
                tuple.getT4(),
                tuple.getT5()
        ));
    }
}
