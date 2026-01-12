package korolev.dens.admissionbackend.dto;

public enum SubmissionStage {
    CHECKING_EXISTING_APPLICATION,
    VALIDATING,
    CHECKING_PROGRAM,
    CHECKING_EMAIL_UNIQUENESS,
    CREATING_APPLICANT,
    DONE,
    ERROR
}