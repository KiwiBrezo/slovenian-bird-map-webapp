package com.sbm.slovenianbirdmap.sql;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Repository;

@Repository
@PropertySource("classpath:sql/userSQL.properties")
public class UserSQL {

    @Value("${user.register.new}")
    private String registerNewUser;

    @Value("${user.register.check.email.exists}")
    private String checkIfUserExists;

    public String getRegisterNewUser() {
        return registerNewUser;
    }

    public String getCheckIfUserExists() {
        return checkIfUserExists;
    }
}
