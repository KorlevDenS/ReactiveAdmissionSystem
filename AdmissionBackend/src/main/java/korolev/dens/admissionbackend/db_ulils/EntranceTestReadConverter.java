package korolev.dens.admissionbackend.db_ulils;

import korolev.dens.admissionbackend.model.EntranceTest;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.stereotype.Component;

@Component
@ReadingConverter
public class EntranceTestReadConverter implements Converter<String, EntranceTest> {

    @Override
    public EntranceTest convert(String source) {
        return EntranceTest.valueOf(source);
    }

}
