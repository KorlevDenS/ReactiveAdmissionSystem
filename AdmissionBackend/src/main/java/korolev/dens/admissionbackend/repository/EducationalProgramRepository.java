package korolev.dens.admissionbackend.repository;

import korolev.dens.admissionbackend.model.EducationalProgram;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface EducationalProgramRepository extends ReactiveCrudRepository<EducationalProgram, Long> {

}
