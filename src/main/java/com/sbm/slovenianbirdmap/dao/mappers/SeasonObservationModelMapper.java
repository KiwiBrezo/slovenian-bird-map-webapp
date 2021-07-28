package com.sbm.slovenianbirdmap.dao.mappers;

import com.sbm.slovenianbirdmap.models.SeasonObservationModel;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class SeasonObservationModelMapper implements RowMapper<SeasonObservationModel> {
    @Override
    public SeasonObservationModel mapRow(ResultSet resultSet, int i) throws SQLException {
        SeasonObservationModel seasonObservationModel = new SeasonObservationModel();

        seasonObservationModel.setNumberOfObservations(resultSet.getInt("st_osebkov"));

        return seasonObservationModel;
    }
}
