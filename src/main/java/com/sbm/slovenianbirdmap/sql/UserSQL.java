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

    @Value("${user.login.webapp}")
    private String loginUserInWebapp;

    @Value("${user.login.webapp.role}")
    private String loginUserRole;

    @Value("${user.get.name}")
    private String getUserName;

    @Value("${user.get.name.surname}")
    private String getUserNameSurname;

    @Value("${user.get.userID}")
    private String getUserID;

    @Value("${user.check.user.mobile.token}")
    private String checkUserMobile;

    @Value("${user.get.number.of.all.observations}")
    private String getAllObservationForUser;

    @Value("${user.get.number.of.all.observations.year}")
    private String getAllObservationForUserYear;

    public String getCheckUserMobile() { return checkUserMobile; }

    public String getGetUserName() {
        return getUserName;
    }

    public String getGetUserNameSurname() { return getUserNameSurname; }

    public String getGetUserID() { return getUserID; }

    public String getLoginUserInWebapp() {
        return loginUserInWebapp;
    }

    public String getRegisterNewUser() {
        return registerNewUser;
    }

    public String getCheckIfUserExists() {
        return checkIfUserExists;
    }

    public String getLoginUserRole() {
        return loginUserRole;
    }

    public String getGetAllObservationForUser() { return getAllObservationForUser; }

    public String getGetAllObservationForUserYear() { return getAllObservationForUserYear; }
}
