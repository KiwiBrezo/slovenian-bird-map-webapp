package com.sbm.slovenianbirdmap.models.form;

public class ObservationForm {
    private Integer birdID;
    private Integer userID;
    private String comment;
    private String lon;
    private String lat;
    private String date;
    private Integer col;

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

    public String getLon() {
        return lon;
    }

    public void setLon(String lon) {
        this.lon = lon;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getCol() { return col; }

    public void setCol(Integer col) { this.col = col; }
}
