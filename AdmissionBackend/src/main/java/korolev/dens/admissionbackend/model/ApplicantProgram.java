package korolev.dens.admissionbackend.model;

import lombok.Data;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("applicant_programs")
public class ApplicantProgram {

    private Long applicantId;
    private Long programId;
}

