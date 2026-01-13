package korolev.dens.admissionbackend.repository;

import korolev.dens.admissionbackend.dto.EntranceTestAvg;
import korolev.dens.admissionbackend.dto.EntranceTestCount;
import korolev.dens.admissionbackend.model.Applicant;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ApplicantRepository extends ReactiveCrudRepository<Applicant, Long> {

    @Query("""
            SELECT a.*
            FROM applicants a
            JOIN applicant_programs ap ON ap.applicant_id = a.id
            WHERE ap.program_id = :programId
            ORDER BY a.points_number DESC
    """)
    Flux<Applicant> findApplicantsByProgramSorted(Long programId);

    Mono<Boolean> existsByEmail(String email);

    Mono<Applicant> findByEmail(String email);

    @Query("SELECT AVG(previous_education_average_score) FROM applicants")
    Mono<Double> averageScoreOverallRaw();

    @Query("""
       SELECT entrance_test AS entranceTest, COUNT(*) AS count
       FROM applicants
       GROUP BY entrance_test
       """)
    Flux<EntranceTestCount> countByEntranceTestRaw();

    @Query("""
       SELECT entrance_test AS entranceTest, AVG(previous_education_average_score) AS avg
       FROM applicants
       GROUP BY entrance_test
       """)
    Flux<EntranceTestAvg> averageScoreByEntranceTestRaw();


}
