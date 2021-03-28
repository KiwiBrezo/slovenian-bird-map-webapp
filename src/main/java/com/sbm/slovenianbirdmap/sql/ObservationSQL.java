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

    public String getGetObservationsForUser() { return getObservationsForUser; }

    public String getSearchObservationDIstinctBirdIDs() { return searchObservationDIstinctBirdIDs; }

    public String getSearchObservationByTerm() { return searchObservationByTerm; }

    public String getAddNewObservation() {
        return addNewObservation;
    }
}
