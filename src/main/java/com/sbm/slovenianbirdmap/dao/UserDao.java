package com.sbm.slovenianbirdmap.dao;

import com.sbm.slovenianbirdmap.models.form.LoginForm;
import com.sbm.slovenianbirdmap.models.form.RegisterForm;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;

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
}
