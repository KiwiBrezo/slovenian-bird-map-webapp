package com.sbm.slovenianbirdmap.models;

import java.util.Date;

public class ObservationModel {
    private Integer observationID;
    private Integer birdID;
    private Integer userID;
    private String comment;
    private String geom;
    private Date date;
    private String birdName;
    private String userName;
    private String userSurname;

    public void setUserSurname(String userSurname) {
        this.userSurname = userSurname;
    }

    public ObservationModel() {
    }

    public ObservationModel(Integer observationID, Integer birdID, Integer userID, String comment, String geom, Date date, String birdName, String userName, String userSurname) {
        this.observationID = observationID;
        this.birdID = birdID;
        this.userID = userID;
        this.comment = comment;
        this.geom = geom;
        this.date = date;
        this.birdName = birdName;
        this.userName = userName;
        this.userSurname = userSurname;
    }

    public Integer getObservationID() {
        return observationID;
    }

    public void setObservationID(Integer observationID) {
        this.observationID = observationID;
    }

    public Integer getBirdID() {
        return birdID;
    }

    public void setBirdID(Integer birdID) {
        this.birdID = birdID;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getGeom() {
        return geom;
    }

    public void setGeom(String geom) {
        this.geom = geom;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getBirdName() {
        return birdName;
    }

    public void setBirdName(String birdName) {
        this.birdName = birdName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserSurname() {
        return userSurname;
    }
}
