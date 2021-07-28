package com.sbm.slovenianbirdmap.dao.mappers;

import com.sbm.slovenianbirdmap.models.MonthlyObservationModel;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MonthlyObservationModelMapper implements RowMapper<MonthlyObservationModel> {
    @Override
    public MonthlyObservationModel mapRow(ResultSet resultSet, int i) throws SQLException {
        MonthlyObservationModel monthlyObservationModel = new MonthlyObservationModel();

        monthlyObservationModel.setMonth(resultSet.getInt("mesec"));
        monthlyObservationModel.setNumberOfObservations(resultSet.getInt("st_opazovanj"));

        return monthlyObservationModel;
    }
}
