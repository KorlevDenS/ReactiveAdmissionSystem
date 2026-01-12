package korolev.dens.admissionbackend.db_ulils;

import korolev.dens.admissionbackend.model.EducationLevel;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.WritingConverter;
import org.springframework.stereotype.Component;

@WritingConverter
@Component
public class EducationLevelWriteConverter implements Converter<EducationLevel, String> {
    @Override
    public String convert(EducationLevel source) {
        return source.name();
    }
}
