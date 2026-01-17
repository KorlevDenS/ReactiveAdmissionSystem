package korolev.dens.admissionbackend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("applicants")
public class Applicant {

    @Id
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private Integer pointsNumber;
    private Double previousEducationAverageScore;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private EntranceTest entranceTest;

}
