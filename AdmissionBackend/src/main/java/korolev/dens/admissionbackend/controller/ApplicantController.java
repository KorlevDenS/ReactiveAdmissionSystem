package korolev.dens.admissionbackend.controller;

import korolev.dens.admissionbackend.dto.ApplicantSubmissionRequest;
import korolev.dens.admissionbackend.dto.SubmissionProgress;
import korolev.dens.admissionbackend.model.Applicant;
import korolev.dens.admissionbackend.service.ApplicantService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@Slf4j
@RestController
@RequestMapping("/applicants")
public class ApplicantController {

    private final ApplicantService applicantService;

    public ApplicantController(ApplicantService applicantService) {
        this.applicantService = applicantService;
    }

    @GetMapping("/by-program/{programId}")
    public Flux<Applicant> getApplicantsByProgram(@PathVariable Long programId) {
        return applicantService.getApplicantsByProgramSorted(programId);
    }

    @PostMapping(value = "/submit-stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<SubmissionProgress> submitStream(@RequestBody ApplicantSubmissionRequest request) {
        return applicantService.submitWithProgress(request);
    }
}
