package com.sbm.slovenianbirdmap.dao.mappers;

import com.sbm.slovenianbirdmap.models.UserNameSurnameModel;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserNameSurnameModelMapper implements RowMapper<UserNameSurnameModel> {
    @Override
    public UserNameSurnameModel mapRow(ResultSet resultSet, int i) throws SQLException {
        UserNameSurnameModel userNameSurnameModel = new UserNameSurnameModel();

        userNameSurnameModel.setName(resultSet.getString("name"));
        userNameSurnameModel.setSurname(resultSet.getString("surname"));

        return userNameSurnameModel;
    }
}
