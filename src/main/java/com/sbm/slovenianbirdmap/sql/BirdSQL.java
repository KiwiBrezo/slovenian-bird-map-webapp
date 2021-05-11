package com.sbm.slovenianbirdmap.sql;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Repository;

@Repository
@PropertySource("classpath:sql/birdSQL.properties")
public class BirdSQL {

    @Value("${get.all.bird}")
    private String getAllBird;

    @Value("${get.some.birds}")
    private String getSomeBirds;

    @Value("${search.bird.by.term}")
    private String searchBirdByTerm;

    public String getGetAllBird() { return getAllBird; }

    public String getGetSomeBirds() { return getSomeBirds; }

    public String getSearchBirdByTerm() { return searchBirdByTerm; }
}
