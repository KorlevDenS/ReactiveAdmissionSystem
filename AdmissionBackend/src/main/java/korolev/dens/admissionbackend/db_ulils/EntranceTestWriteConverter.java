package korolev.dens.admissionbackend.db_ulils;

import korolev.dens.admissionbackend.model.EntranceTest;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.WritingConverter;
import org.springframework.stereotype.Component;

@Component
@WritingConverter
public class EntranceTestWriteConverter implements Converter<EntranceTest, String> {

    @Override
    public String convert(EntranceTest source) {
        return source.name();
    }

}
