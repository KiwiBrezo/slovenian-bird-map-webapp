package com.sbm.slovenianbirdmap.dao.mappers;

import com.sbm.slovenianbirdmap.models.YearlyObservationModel;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class YearlyObservationModelMapper implements RowMapper<YearlyObservationModel> {
    @Override
    public YearlyObservationModel mapRow(ResultSet resultSet, int i) throws SQLException {
        YearlyObservationModel yearlyObservationModel = new YearlyObservationModel();

        yearlyObservationModel.setYearNumber(resultSet.getInt("leto"));
        yearlyObservationModel.setNumberOfObservations(resultSet.getInt("st_opazovanj"));

        return yearlyObservationModel;
    }
}
