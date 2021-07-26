package com.sbm.slovenianbirdmap.dao;

import com.sbm.slovenianbirdmap.dao.mappers.UserNameSurnameModelMapper;
import com.sbm.slovenianbirdmap.models.UserNameSurnameModel;
import com.sbm.slovenianbirdmap.models.analysis.UserObservation;
import com.sbm.slovenianbirdmap.models.form.LoginForm;
import com.sbm.slovenianbirdmap.models.form.RegisterForm;
import com.sbm.slovenianbirdmap.models.form.UserIDForm;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;
import static java.time.temporal.TemporalAdjusters.firstDayOfYear;
import static java.time.temporal.TemporalAdjusters.lastDayOfYear;

import java.time.LocalDate;
import java.util.UUID;

@Service
public class UserDao extends AbstractDao{

    public Boolean checkIfUserExists(String email) {
        String sql = userSQL.getCheckIfUserExists();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("email", email);

        return namedParameterJdbcTemplate.queryForObject(sql, params, Boolean.class);
    }

    public void addNewUser(RegisterForm registerForm) {
        String sql = userSQL.getRegisterNewUser();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("name", registerForm.getName())
                .addValue("surname", registerForm.getSurname())
                .addValue("email", registerForm.getEmail())
                .addValue("password", registerForm.getPassword())
                .addValue("mobile_token", UUID.randomUUID().toString());

        namedParameterJdbcTemplate.update(sql, params);
    }

    public Boolean loginUserWebapp(LoginForm loginForm) {
        String sql = userSQL.getLoginUserInWebapp();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("email", loginForm.getEmail())
                .addValue("password", loginForm.getPassword());

        return namedParameterJdbcTemplate.queryForObject(sql, params, Boolean.class);
    }

    public String getUserRole(LoginForm loginForm) {
        String sql = userSQL.getLoginUserRole();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("email", loginForm.getEmail());

        return namedParameterJdbcTemplate.queryForObject(sql, params, String.class);
    }

    public String getUserName(String email) {
        String sql = userSQL.getGetUserName();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("email", email);

        return namedParameterJdbcTemplate.queryForObject(sql, params, String.class);
    }

    public Long getUserID(String email) {
        String sql = userSQL.getGetUserID();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("email", email);

        return namedParameterJdbcTemplate.queryForObject(sql, params, Long.class);
    }

    public Boolean checkUserMobileToken(Integer userID, String mobileToken) {
        String sql = userSQL.getCheckUserMobile();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", userID)
                .addValue("token", mobileToken);

        return namedParameterJdbcTemplate.queryForObject(sql, params, Boolean.class);
    }

    public UserNameSurnameModel getUserNameSurname(Long userId) {
        String sql = userSQL.getGetUserNameSurname();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("userId", userId);

        return namedParameterJdbcTemplate.queryForObject(sql, params, new UserNameSurnameModelMapper());
    }

    public UserObservation getUserObservationCount(UserIDForm userIDForm) {
        UserObservation userObservation = new UserObservation();
        LocalDate dateToday = LocalDate.now();
        LocalDate startOfTheYear = dateToday.with(firstDayOfYear());
        LocalDate lastOfTheYear = dateToday.with(lastDayOfYear());

        String sql = userSQL.getGetAllObservationForUser();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", userIDForm.getUserID());

        userObservation.setAllTimeObservation(namedParameterJdbcTemplate.queryForObject(sql, params, Long.class));

        sql = userSQL.getGetAllObservationForUserYear();

        params = new MapSqlParameterSource()
                .addValue("id", userIDForm.getUserID())
                .addValue("startOfYear", startOfTheYear)
                .addValue("endOfYear", lastOfTheYear);

        userObservation.setThisYearObservation(namedParameterJdbcTemplate.queryForObject(sql, params, Long.class));

        return userObservation;
    }
}
