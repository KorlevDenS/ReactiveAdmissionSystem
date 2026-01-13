package korolev.dens.admissionbackend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("applicant_programs")
public class ApplicantProgram {

    @Id
    private Long id;

    @Column("applicant_id")
    private Long applicantId;

    @Column("program_id")
    private Long programId;
}
