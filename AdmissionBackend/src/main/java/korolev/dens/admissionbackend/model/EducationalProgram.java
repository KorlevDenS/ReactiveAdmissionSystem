package korolev.dens.admissionbackend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("programs")
public class EducationalProgram {

    @Id
    private Long id;

    private String title;
    private String description;
    private EducationLevel educationLevel;
    private Integer budgetPlacesNumber;
    private Integer contractPlacesNumber;
    private Integer contractCost;
    private Integer minimumPassingScore;

}
