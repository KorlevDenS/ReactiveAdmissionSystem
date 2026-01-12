package korolev.dens.admissionbackend.controller;

import korolev.dens.admissionbackend.model.EducationalProgram;
import korolev.dens.admissionbackend.service.EducationalProgramService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/programs")
public class EducationalProgramController {

    private final EducationalProgramService educationalProgramService;

    public EducationalProgramController(EducationalProgramService educationalProgramService) {
        this.educationalProgramService = educationalProgramService;
    }

    @GetMapping
    public Flux<EducationalProgram> getAllPrograms() {
        return educationalProgramService.getAllPrograms();
    }

    @GetMapping("/{id}")
    public Mono<EducationalProgram> getAllProgramById(@PathVariable Long id) {
        return educationalProgramService.getProgramById(id);
    }

    @GetMapping("/by-applicant/{applicantId}")
    public Flux<EducationalProgram> getProgramsByApplicant(@PathVariable Long applicantId) {
        return educationalProgramService.getProgramsByApplicant(applicantId);
    }
}

