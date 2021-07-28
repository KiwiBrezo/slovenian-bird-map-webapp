package com.sbm.slovenianbirdmap.dao;

import com.sbm.slovenianbirdmap.dao.mappers.MonthlyObservationModelMapper;
import com.sbm.slovenianbirdmap.dao.mappers.ObservationModelMapper;
import com.sbm.slovenianbirdmap.dao.mappers.WeeklyObservationModelMapper;
import com.sbm.slovenianbirdmap.dao.mappers.YearlyObservationModelMapper;
import com.sbm.slovenianbirdmap.models.*;
import com.sbm.slovenianbirdmap.models.analysis.UserObservation;
import com.sbm.slovenianbirdmap.models.form.*;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
                    .addValue("date", date)
                    .addValue("col", observationForm.getCol());

            namedParameterJdbcTemplate.update(sql, params);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<ObservationModel> getObservationByTerm(SearchObservationForm searchObservationForm) {
        String sql = observationSQL.getSearchObservationByTerm();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("name", "%" + searchObservationForm.getTerm().toLowerCase() + "%")
                .addValue("nameLat", "%" + searchObservationForm.getTerm().toLowerCase() + "%")
                .addValue("limit", searchObservationForm.getLimit())
                .addValue("offset", searchObservationForm.getOffset());

        return namedParameterJdbcTemplate.query(sql, params, new ObservationModelMapper());
    }

    public List<ObservationModel> getObservationForUser(GetObservationsUserForm getObservationsUserForm) {
        String sql = observationSQL.getGetObservationsForUser();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", getObservationsUserForm.getUserID());

        return namedParameterJdbcTemplate.query(sql, params, new ObservationModelMapper());
    }

    public List<Integer> getObservationDistinctBirdIDs(SearchObservationForm searchObservationForm) {
        String sql = observationSQL.getSearchObservationDIstinctBirdIDs();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("name", "%" + searchObservationForm.getTerm().toLowerCase() + "%")
                .addValue("nameLat", "%" + searchObservationForm.getTerm().toLowerCase() + "%");

        return namedParameterJdbcTemplate.queryForList(sql, params, Integer.class);
    }

    public UserObservation getUserObservationCount(UserIDForm userIDForm) {
        UserObservation userObservation = new UserObservation();

        String sql = userSQL.getGetAllObservationForUser();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", userIDForm.getUserID());

        userObservation.setAllTimeObservation(namedParameterJdbcTemplate.queryForObject(sql, params, Long.class));

        sql = userSQL.getGetAllObservationForUserYear();

        userObservation.setThisYearObservation(namedParameterJdbcTemplate.queryForObject(sql, params, Long.class));

        return userObservation;
    }

    public List<WeeklyObservationModel> getWeeklyObservationForUser(UserIDForm userIDForm) {
        String sql = observationSQL.getGetWeeklyObservationsForUser();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("userId", userIDForm.getUserID());

        return namedParameterJdbcTemplate.query(sql, params, new WeeklyObservationModelMapper());
    }

    public List<MonthlyObservationModel> getMonthlyObservationForUser(UserIDForm userIDForm) {
        String sql = observationSQL.getGetMonthlyObservationsForUser();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("userId", userIDForm.getUserID());

        return namedParameterJdbcTemplate.query(sql, params, new MonthlyObservationModelMapper());
    }

    public List<ObservationModel> getLast10ObservationForUser(UserIDForm userIDForm) {
        String sql = observationSQL.getGetLast10ObservationsForUser();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("userId", userIDForm.getUserID());

        return namedParameterJdbcTemplate.query(sql, params, new ObservationModelMapper());
    }

    public Integer getObservationForBirdType(BirdIDForm birdIDForm) {
        String sql = observationSQL.getGetNumberOfBirdsObserved();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("birdId", birdIDForm.getBirdID());

        return namedParameterJdbcTemplate.queryForObject(sql, params, Integer.class);
    }

    public Integer getNumberOfObserversForBird(BirdIDForm birdIDForm) {
        String sql = observationSQL.getGetNumberOfObserversForBird();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("birdId", birdIDForm.getBirdID());

        return namedParameterJdbcTemplate.queryForObject(sql, params, Integer.class);
    }

    public List<MonthlyObservationModel> getMonthlyObservationForBird(BirdIDForm birdIDForm) {
        String sql = observationSQL.getGetMonthlyObservationsForBird();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("birdId", birdIDForm.getBirdID());

        return namedParameterJdbcTemplate.query(sql, params, new MonthlyObservationModelMapper());
    }

    public List<YearlyObservationModel> getYearlyObservationForBird(BirdIDForm birdIDForm) {
        String sql = observationSQL.getGetYearlyObservationForBird();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("birdId", birdIDForm.getBirdID());

        return namedParameterJdbcTemplate.query(sql, params, new YearlyObservationModelMapper());
    }

    public List<SeasonObservationModel> getSeasonObservationForBird(BirdIDForm birdIDForm) {
        Integer currentYear = YearMonth.now().getYear();
        LocalDate startWinterDate = LocalDate.of(currentYear-1, 12, 21);
        LocalDate endWinterDate = LocalDate.of(currentYear, 3, 20);;
        LocalDate startSpringDate = LocalDate.of(currentYear, 3, 21);;
        LocalDate endSpringDate = LocalDate.of(currentYear, 6, 20);;
        LocalDate startSummerDate = LocalDate.of(currentYear, 6, 21);;
        LocalDate endSummerDate = LocalDate.of(currentYear, 9, 20);;
        LocalDate startAutumnDate = LocalDate.of(currentYear, 9, 21);;
        LocalDate endAutumnDate = LocalDate.of(currentYear, 12, 20);;

        List<SeasonObservationModel> seasons = new ArrayList<SeasonObservationModel>();

        String sql = observationSQL.getGetSeasonObservationForBird();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("birdId", birdIDForm.getBirdID())
                .addValue("startOfSeason", startWinterDate)
                .addValue("endOfSeason", endWinterDate);

        seasons.add(new SeasonObservationModel(1, namedParameterJdbcTemplate.queryForObject(sql, params, Integer.class)));

        params = new MapSqlParameterSource()
                .addValue("birdId", birdIDForm.getBirdID())
                .addValue("startOfSeason", startSpringDate)
                .addValue("endOfSeason", endSpringDate);

        seasons.add(new SeasonObservationModel(2, namedParameterJdbcTemplate.queryForObject(sql, params, Integer.class)));

        params = new MapSqlParameterSource()
                .addValue("birdId", birdIDForm.getBirdID())
                .addValue("startOfSeason", startSummerDate)
                .addValue("endOfSeason", endSummerDate);

        seasons.add(new SeasonObservationModel(3, namedParameterJdbcTemplate.queryForObject(sql, params, Integer.class)));

        params = new MapSqlParameterSource()
                .addValue("birdId", birdIDForm.getBirdID())
                .addValue("startOfSeason", startAutumnDate)
                .addValue("endOfSeason", endAutumnDate);

        seasons.add(new SeasonObservationModel(4, namedParameterJdbcTemplate.queryForObject(sql, params, Integer.class)));

        return seasons;
    }
}
