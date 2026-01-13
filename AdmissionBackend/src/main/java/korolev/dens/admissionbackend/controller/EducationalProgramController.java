package korolev.dens.admissionbackend.controller;

import korolev.dens.admissionbackend.model.EducationalProgram;
import korolev.dens.admissionbackend.service.EducationalProgramService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
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

    @GetMapping(value = "/search", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<EducationalProgram> searchPrograms(@RequestParam(required = false, defaultValue = "") String q) {
        return educationalProgramService.searchByTitle(q);
    }


}

