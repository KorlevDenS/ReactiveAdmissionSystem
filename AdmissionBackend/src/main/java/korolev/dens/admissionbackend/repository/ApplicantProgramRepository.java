package korolev.dens.admissionbackend.repository;

import korolev.dens.admissionbackend.model.ApplicantProgram;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ApplicantProgramRepository extends ReactiveCrudRepository<ApplicantProgram, Void> {

    Flux<ApplicantProgram> findByApplicantId(Long applicantId);
    Flux<ApplicantProgram> findByProgramId(Long programId);

    Mono<Boolean> existsByApplicantIdAndProgramId(Long applicantId, Long programId);
}
