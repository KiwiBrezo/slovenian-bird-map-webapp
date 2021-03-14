package com.sbm.slovenianbirdmap.dao.mappers;

import com.sbm.slovenianbirdmap.models.BirdModel;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class BirdModelMapper implements RowMapper<BirdModel> {
    @Override
    public BirdModel mapRow(ResultSet resultSet, int i) throws SQLException {
        BirdModel bird = new BirdModel();

        bird.setBirdID(resultSet.getInt("bird_id"));
        bird.setName(resultSet.getString("name"));
        bird.setNameLat(resultSet.getString("name_lat"));
        bird.setImageLink(resultSet.getString("image_link"));
        bird.setJsonData(resultSet.getString("json_data"));

        return bird;
    }
}
