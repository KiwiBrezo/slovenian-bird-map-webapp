package com.sbm.slovenianbirdmap.sql;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Repository;

@Repository
@PropertySource("classpath:sql/observationSQL.properties")
public class ObservationSQL {
    @Value("${add.new.observation}")
    private String addNewObservation;

    @Value("${search.observation.by.term}")
    private String searchObservationByTerm;

    @Value("${search.observation.distinct.bird.ids}")
    private String searchObservationDIstinctBirdIDs;

    @Value("${get.observation.for.user}")
    private String getObservationsForUser;

    @Value("${find.last.10.observations.for.user}")
    private String getLast10ObservationsForUser;

    @Value("${weekly.observations.for.user}")
    private String getWeeklyObservationsForUser;

    @Value("${monthly.observation.for.user}")
    private String getMonthlyObservationsForUser;

    @Value("${number.of.birds.observed}")
    private String getNumberOfBirdsObserved;

    @Value("${number.of.observers.for.bird}")
    private String getNumberOfObserversForBird;

    @Value("${monthly.observation.for.bird}")
    private String getMonthlyObservationsForBird;

    @Value("${yearly.observation.for.bird}")
    private String getYearlyObservationForBird;

    @Value("${season.observation.for.bird}")
    private String getSeasonObservationForBird;

    public String getGetObservationsForUser() { return getObservationsForUser; }

    public String getSearchObservationDIstinctBirdIDs() { return searchObservationDIstinctBirdIDs; }

    public String getSearchObservationByTerm() { return searchObservationByTerm; }

    public String getAddNewObservation() {
        return addNewObservation;
    }

    public String getGetLast10ObservationsForUser() { return getLast10ObservationsForUser; }

    public String getGetWeeklyObservationsForUser() { return getWeeklyObservationsForUser; }

    public String getGetMonthlyObservationsForUser() { return getMonthlyObservationsForUser; }

    public String getGetNumberOfBirdsObserved() { return getNumberOfBirdsObserved; }

    public String getGetNumberOfObserversForBird() { return getNumberOfObserversForBird; }

    public String getGetMonthlyObservationsForBird() { return getMonthlyObservationsForBird; }

    public String getGetYearlyObservationForBird() { return getYearlyObservationForBird; }

    public String getGetSeasonObservationForBird() { return getSeasonObservationForBird; }
}
