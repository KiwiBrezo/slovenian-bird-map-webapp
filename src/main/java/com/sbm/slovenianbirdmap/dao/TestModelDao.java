package com.sbm.slovenianbirdmap.dao;

import com.sbm.slovenianbirdmap.dao.mappers.TestModelMapper;
import com.sbm.slovenianbirdmap.models.TestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestModelDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<TestModel> getTestModels() {
        String sql = "SELECT * FROM \"SBM_DEMO\".test";

        return jdbcTemplate.query(sql, new TestModelMapper());
    }
}
