package korolev.dens.admissionbackend.db_ulils;

import korolev.dens.admissionbackend.model.EducationLevel;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.stereotype.Component;

@ReadingConverter
@Component
public class EducationLevelReadConverter implements Converter<String, EducationLevel> {
    @Override
    public EducationLevel convert(String source) {
        return EducationLevel.valueOf(source);
    }
}
