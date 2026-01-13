package korolev.dens.admissionbackend.service;

import org.springframework.stereotype.Component;

@Component
public class StatsUpdater {

    private final StatsService statsService;
    private final StatsSink statsSink;

    public StatsUpdater(StatsService statsService, StatsSink statsSink) {
        this.statsService = statsService;
        this.statsSink = statsSink;
    }

    public void updateStats() {
        statsService.collectStats().subscribe(statsSink::emit);
    }
}
