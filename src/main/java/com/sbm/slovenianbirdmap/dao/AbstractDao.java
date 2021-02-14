package com.sbm.slovenianbirdmap.dao;

import com.sbm.slovenianbirdmap.sql.TestModelSQL;
import com.sbm.slovenianbirdmap.sql.UserSQL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

public class AbstractDao {

    @Autowired
    protected TestModelSQL testModelSQL;

    @Autowired
    protected UserSQL userSQL;

    @Autowired
    protected JdbcTemplate jdbcTemplate;

    @Autowired
    protected NamedParameterJdbcTemplate namedParameterJdbcTemplate;
}
