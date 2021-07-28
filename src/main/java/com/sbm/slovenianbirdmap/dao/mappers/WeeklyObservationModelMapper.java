package com.sbm.slovenianbirdmap.dao.mappers;

import com.sbm.slovenianbirdmap.models.WeeklyObservationModel;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class WeeklyObservationModelMapper implements RowMapper<WeeklyObservationModel> {
    @Override
    public WeeklyObservationModel mapRow(ResultSet resultSet, int i) throws SQLException {
        WeeklyObservationModel weeklyObservationModel = new WeeklyObservationModel();

        weeklyObservationModel.setDayName(resultSet.getString("dan_v_tednu"));
        weeklyObservationModel.setNumberOfObservations(resultSet.getInt("st_opazovanj"));

        return weeklyObservationModel;
    }
}
