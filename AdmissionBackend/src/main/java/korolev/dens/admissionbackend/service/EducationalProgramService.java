package korolev.dens.admissionbackend.service;

import korolev.dens.admissionbackend.model.EducationalProgram;
import korolev.dens.admissionbackend.repository.ApplicantProgramRepository;
import korolev.dens.admissionbackend.repository.EducationalProgramRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class EducationalProgramService {

    private final ApplicantProgramRepository applicantProgramRepository;
    private final EducationalProgramRepository educationalProgramRepository;

    public EducationalProgramService(ApplicantProgramRepository applicantProgramRepository, EducationalProgramRepository educationalProgramRepository) {
        this.applicantProgramRepository = applicantProgramRepository;
        this.educationalProgramRepository = educationalProgramRepository;
    }

    public Flux<EducationalProgram> getAllPrograms() {
        return educationalProgramRepository.findAll();
    }

    public Mono<EducationalProgram> getProgramById(Long programId) {
        return educationalProgramRepository.findById(programId);
    }

    public Flux<EducationalProgram> getProgramsByApplicant(Long applicantId) {
        return applicantProgramRepository.findByApplicantId(applicantId)
                .flatMap(link -> educationalProgramRepository.findById(link.getProgramId()));
    }


}
