package com.sbm.slovenianbirdmap.dao.mappers;

import com.sbm.slovenianbirdmap.models.ObservationModel;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ObservationModelMapper implements RowMapper<ObservationModel> {
    @Override
    public ObservationModel mapRow(ResultSet resultSet, int i) throws SQLException {
        ObservationModel observationModel = new ObservationModel();

        observationModel.setObservationID(resultSet.getInt("observation_id"));
        observationModel.setBirdID(resultSet.getInt("bird_id"));
        observationModel.setUserID(resultSet.getInt("user_id"));
        observationModel.setComment(resultSet.getString("comment"));
        observationModel.setGeom(resultSet.getString("geom"));
        observationModel.setDate(resultSet.getDate("date"));
        observationModel.setBirdName(resultSet.getString("bird_name"));
        observationModel.setUserName(resultSet.getString("user_name"));
        observationModel.setUserSurname(resultSet.getString("user_surname"));

        return observationModel;
    }
}
