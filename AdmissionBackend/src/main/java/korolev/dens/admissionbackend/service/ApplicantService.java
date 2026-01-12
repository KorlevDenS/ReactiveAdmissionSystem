package korolev.dens.admissionbackend.service;

import korolev.dens.admissionbackend.dto.ApplicantSubmissionRequest;
import korolev.dens.admissionbackend.dto.SubmissionProgress;
import korolev.dens.admissionbackend.dto.SubmissionStage;
import korolev.dens.admissionbackend.model.Applicant;
import korolev.dens.admissionbackend.model.ApplicantProgram;
import korolev.dens.admissionbackend.repository.ApplicantProgramRepository;
import korolev.dens.admissionbackend.repository.ApplicantRepository;
import korolev.dens.admissionbackend.repository.EducationalProgramRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ApplicantService {

    private final ApplicantProgramRepository applicantProgramRepository;
    private final ApplicantRepository applicantRepository;
    private final EducationalProgramRepository educationalProgramRepository;

    public ApplicantService(ApplicantProgramRepository applicantProgramRepository,
                            ApplicantRepository applicantRepository,
                            EducationalProgramRepository educationalProgramRepository) {
        this.applicantProgramRepository = applicantProgramRepository;
        this.applicantRepository = applicantRepository;
        this.educationalProgramRepository = educationalProgramRepository;
    }

    public Flux<Applicant> getApplicantsByProgram(Long programId) {
        return applicantProgramRepository.findByProgramId(programId)
                .flatMap(link -> applicantRepository.findById(link.getApplicantId()));
    }

    public Flux<Applicant> getApplicantsByProgramSorted(Long programId) {
        return applicantRepository.findApplicantsByProgramSorted(programId);
    }

    private Mono<Applicant> findApplicantByEmail(String email) {
        return applicantRepository.findByEmail(email);
    }

    private Mono<Boolean> hasApplied(Long applicantId, Long programId) {
        return applicantProgramRepository.existsByApplicantIdAndProgramId(applicantId, programId);
    }

    private Mono<ApplicantProgram> linkApplicantToProgram(Long applicantId, Long programId) {
        ApplicantProgram ap = new ApplicantProgram();
        ap.setApplicantId(applicantId);
        ap.setProgramId(programId);
        return applicantProgramRepository.save(ap);
    }


    public Flux<SubmissionProgress> submitWithProgress(ApplicantSubmissionRequest req) {

        return Flux.concat(

                        // 1. Проверка существующего applicant ДО валидации
                        Flux.just(new SubmissionProgress(
                                SubmissionStage.CHECKING_EXISTING_APPLICATION,
                                "Checking if applicant already exists")),

                        findApplicantByEmail(req.email())
                                .flatMap(existingApplicant ->
                                        hasApplied(existingApplicant.getId(), req.programId())
                                                .flatMap(alreadyApplied -> {
                                                    if (alreadyApplied) {
                                                        return Mono.error(new IllegalStateException(
                                                                "This applicant has already applied to this program"));
                                                    }
                                                    // applicant есть, но программа новая → создаём связь и завершаем
                                                    return linkApplicantToProgram(existingApplicant.getId(), req.programId())
                                                            .then(Mono.error(new StopProcessingException()));
                                                })
                                )
                                .switchIfEmpty(Mono.empty()) // applicant не найден → продолжаем
                                .thenMany(Flux.empty()),


                        // 2. Валидация
                        Flux.just(new SubmissionProgress(SubmissionStage.VALIDATING, "Validating input data")),
                        validateSync(req).thenMany(Flux.empty()),

                        // 3. Проверка программы
                        Flux.just(new SubmissionProgress(SubmissionStage.CHECKING_PROGRAM, "Checking if program exists")),
                        checkProgramExists(req.programId()).thenMany(Flux.empty()),

                        // 4. Создание applicant
                        Flux.just(new SubmissionProgress(SubmissionStage.CREATING_APPLICANT, "Creating applicant")),
                        createApplicant(req)
                                .flatMap(newApplicant ->
                                        linkApplicantToProgram(newApplicant.getId(), req.programId())
                                )
                                .thenMany(Flux.empty()),

                        // 5. DONE
                        Flux.just(new SubmissionProgress(SubmissionStage.DONE, "Application successfully submitted"))
                )
                .onErrorResume(StopProcessingException.class, ex ->
                        Flux.just(new SubmissionProgress(SubmissionStage.DONE,
                                "Applicant already existed; linked to program"))
                )
                .onErrorResume(ex ->
                        Flux.just(new SubmissionProgress(SubmissionStage.ERROR, ex.getMessage()))
                );
    }

    private Mono<Void> validateSync(ApplicantSubmissionRequest r) {
        if (r.firstName() == null || r.firstName().isBlank()) {
            return Mono.error(new IllegalArgumentException("First name is required"));
        }
        if (r.lastName() == null || r.lastName().isBlank()) {
            return Mono.error(new IllegalArgumentException("Last name is required"));
        }
        if (r.email() == null || r.email().isBlank()) {
            return Mono.error(new IllegalArgumentException("Email is required"));
        }
        if (!r.email().contains("@")) {
            return Mono.error(new IllegalArgumentException("Invalid email format"));
        }
        if (r.phoneNumber() == null || r.phoneNumber().isBlank()) {
            return Mono.error(new IllegalArgumentException("Phone number is required"));
        }
        if (r.address() == null || r.address().isBlank()) {
            return Mono.error(new IllegalArgumentException("Address is required"));
        }
        if (r.previousEducationAverageScore() == null ||
                r.previousEducationAverageScore() < 0 ||
                r.previousEducationAverageScore() > 150) {
            return Mono.error(new IllegalArgumentException("Invalid average score"));
        }
        if (r.entranceTest() == null) {
            return Mono.error(new IllegalArgumentException("Entrance test is required"));
        }
        if (r.programId() == null) {
            return Mono.error(new IllegalArgumentException("Program ID is required"));
        }
        return Mono.empty();
    }

    private Mono<Void> checkProgramExists(Long programId) {
        return educationalProgramRepository.existsById(programId)
                .flatMap(exists -> exists
                        ? Mono.empty()
                        : Mono.error(new IllegalArgumentException("Program does not exist"))
                );
    }

    private Mono<Void> checkEmailUnique(String email) {
        return applicantRepository.existsByEmail(email)
                .flatMap(exists -> exists
                        ? Mono.error(new IllegalArgumentException("Email already used"))
                        : Mono.empty()
                );
    }

    private Mono<Applicant> createApplicant(ApplicantSubmissionRequest req) {
        Applicant applicant = new Applicant();
        applicant.setId(null);

        applicant.setFirstName(req.firstName());
        applicant.setLastName(req.lastName());
        applicant.setEmail(req.email());
        applicant.setPhoneNumber(req.phoneNumber());
        applicant.setAddress(req.address());
        applicant.setPreviousEducationAverageScore(req.previousEducationAverageScore());
        applicant.setEntranceTest(req.entranceTest());
        applicant.setPointsNumber(0);

        return applicantRepository.save(applicant);
    }


}
