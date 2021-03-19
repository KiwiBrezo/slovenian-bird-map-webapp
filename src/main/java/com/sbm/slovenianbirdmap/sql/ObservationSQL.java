package com.sbm.slovenianbirdmap.sql;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Repository;

@Repository
@PropertySource("classpath:sql/observationSQL.properties")
public class ObservationSQL {
    @Value("${add.new.observation}")
    private String addNewObservation;

    public String getAddNewObservation() {
        return addNewObservation;
    }
}
