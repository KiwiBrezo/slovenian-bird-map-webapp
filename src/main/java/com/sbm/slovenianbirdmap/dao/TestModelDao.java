package com.sbm.slovenianbirdmap.dao;

import com.sbm.slovenianbirdmap.dao.mappers.TestModelMapper;
import com.sbm.slovenianbirdmap.models.TestModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestModelDao extends AbstractDao {

    public List<TestModel> getTestModels() {
        String sql = testModelSQL.getTestSql();

        return jdbcTemplate.query(sql, new TestModelMapper());
    }
}
