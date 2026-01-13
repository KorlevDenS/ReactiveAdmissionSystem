package korolev.dens.admissionbackend.service;

import jakarta.annotation.PostConstruct;
import korolev.dens.admissionbackend.dto.StatsResponse;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@Component
public class StatsSink {

    private final Sinks.Many<StatsResponse> sink = Sinks.many().replay().latest();
    private final StatsService statsService;

    public StatsSink(StatsService statsService) {
        this.statsService = statsService;
    }

    @PostConstruct
    public void init() {
        statsService.collectStats()
                .subscribe(this::emit);
    }


    public void emit(StatsResponse stats) {
        sink.tryEmitNext(stats);
    }

    public Flux<StatsResponse> stream() {
        return sink.asFlux();
    }
}
