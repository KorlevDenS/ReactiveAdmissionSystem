package korolev.dens.admissionbackend.dto;

import korolev.dens.admissionbackend.model.EntranceTest;

public record ApplicantSubmissionRequest(
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        String address,
        Double previousEducationAverageScore,
        EntranceTest entranceTest,

        Long programId
) {}
