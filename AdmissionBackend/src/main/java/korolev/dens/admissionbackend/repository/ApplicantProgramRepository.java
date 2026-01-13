package korolev.dens.admissionbackend.repository;

import korolev.dens.admissionbackend.dto.ProgramCount;
import korolev.dens.admissionbackend.model.ApplicantProgram;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ApplicantProgramRepository
        extends ReactiveCrudRepository<ApplicantProgram, Long> {

    Flux<ApplicantProgram> findByApplicantId(Long applicantId);
    Flux<ApplicantProgram> findByProgramId(Long programId);

    Mono<Boolean> existsByApplicantIdAndProgramId(Long applicantId, Long programId);

    @Query("""
       SELECT program_id AS programId, COUNT(*) AS count
       FROM applicant_programs
       GROUP BY program_id
       """)
    Flux<ProgramCount> countByProgramRaw();

}
