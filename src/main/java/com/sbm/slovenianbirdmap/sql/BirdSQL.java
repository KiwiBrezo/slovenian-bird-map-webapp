package com.sbm.slovenianbirdmap.sql;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Repository;

@Repository
@PropertySource("classpath:sql/birdSQL.properties")
public class BirdSQL {

    @Value("${get.all.bird}")
    private String getAllBird;

    public String getGetAllBird() { return getAllBird; }
}
