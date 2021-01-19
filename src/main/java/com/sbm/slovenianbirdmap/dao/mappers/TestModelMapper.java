package com.sbm.slovenianbirdmap.dao.mappers;

import com.sbm.slovenianbirdmap.models.TestModel;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TestModelMapper implements RowMapper<TestModel> {
    @Override
    public TestModel mapRow(ResultSet resultSet, int i) throws SQLException {
        return new TestModel(
                resultSet.getLong("test_id"),
                resultSet.getString("db_type"),
                resultSet.getString("db_version")
        );
    }
}
