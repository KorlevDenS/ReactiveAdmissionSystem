package korolev.dens.admissionbackend.repository;

import korolev.dens.admissionbackend.model.EducationalProgram;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface EducationalProgramRepository extends ReactiveCrudRepository<EducationalProgram, Long> {

    @Query("""
       SELECT *
       FROM programs
       WHERE LOWER(title) LIKE LOWER(CONCAT('%', :query, '%'))
       ORDER BY title
       """)
    Flux<EducationalProgram> searchByTitle(String query);


}
