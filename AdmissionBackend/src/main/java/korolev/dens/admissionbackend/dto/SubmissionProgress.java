package korolev.dens.admissionbackend.dto;

public record SubmissionProgress(
        SubmissionStage stage,
        String message
) {}
