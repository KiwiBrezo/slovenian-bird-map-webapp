package com.sbm.slovenianbirdmap.sql;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Repository;

@Repository
@PropertySource("classpath:sql/areaSQL.properties")
public class AreaSQL {
    @Value("${get.all.areas}")
    private String getAllAreas;

    public String getGetAllAreas() { return getAllAreas; }
}
