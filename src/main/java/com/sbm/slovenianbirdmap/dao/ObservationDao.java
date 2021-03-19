package com.sbm.slovenianbirdmap.dao;

import com.sbm.slovenianbirdmap.models.form.ObservationForm;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class ObservationDao extends AbstractDao{

    public Boolean addNewObservation(ObservationForm observationForm) {
        String sql = observationSQL.getAddNewObservation();

        try {
            sql = sql.replace(":lon:", observationForm.getLon());
            sql = sql.replace(":lat:", observationForm.getLat());

            Date date = new SimpleDateFormat("yyyy-MM-dd").parse(observationForm.getDate());

            SqlParameterSource params = new MapSqlParameterSource()
                    .addValue("bird_id", observationForm.getBirdID())
                    .addValue("user_id", observationForm.getUserID())
                    .addValue("comment", observationForm.getComment())
                    .addValue("date", date);

            namedParameterJdbcTemplate.update(sql, params);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
