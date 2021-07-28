package com.sbm.slovenianbirdmap.models;

public class WeeklyObservationModel {
    private String dayName;
    private Integer numberOfObservations;

    public WeeklyObservationModel(String dayName, Integer numberOfObservations) {
        this.dayName = dayName;
        this.numberOfObservations = numberOfObservations;
    }

    public WeeklyObservationModel() {
    }

    public String getDayName() {
        return dayName;
    }

    public void setDayName(String dayName) {
        this.dayName = dayName;
    }

    public Integer getNumberOfObservations() {
        return numberOfObservations;
    }

    public void setNumberOfObservations(Integer numberOfObservations) {
        this.numberOfObservations = numberOfObservations;
    }
}
