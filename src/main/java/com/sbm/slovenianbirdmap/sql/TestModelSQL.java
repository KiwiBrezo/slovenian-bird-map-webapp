package com.sbm.slovenianbirdmap.sql;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Repository;

@Repository
@PropertySource("classpath:sql/testModelSQL.properties")
public class TestModelSQL {
    @Value("${test.test}")
    private String testSql;

    public String getTestSql() {
        return testSql;
    }
}
