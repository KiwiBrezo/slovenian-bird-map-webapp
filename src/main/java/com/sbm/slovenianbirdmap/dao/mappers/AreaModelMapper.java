package com.sbm.slovenianbirdmap.dao.mappers;

import com.sbm.slovenianbirdmap.models.AreaModel;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AreaModelMapper implements RowMapper<AreaModel> {
    @Override
    public AreaModel mapRow(ResultSet resultSet, int i) throws SQLException {
        AreaModel area = new AreaModel();

        area.setAreaID(resultSet.getInt("area_id"));
        area.setName(resultSet.getString("name"));
        area.setGeom(resultSet.getString("geom"));

        return area;
    }
}
