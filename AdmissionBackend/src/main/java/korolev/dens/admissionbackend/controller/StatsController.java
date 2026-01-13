package korolev.dens.admissionbackend.controller;

import korolev.dens.admissionbackend.dto.StatsResponse;
import korolev.dens.admissionbackend.service.StatsSink;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
public class StatsController {

    private final StatsSink statsSink;

    public StatsController(StatsSink statsSink) {
        this.statsSink = statsSink;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping(value = "/stats/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<StatsResponse> streamStats() {
        return statsSink.stream();
    }

}

