package com.sbm.slovenianbirdmap.models;

public class MonthlyObservationModel {
    private Integer month;
    private Integer numberOfObservations;

    public MonthlyObservationModel(Integer month, Integer numberOfObservations) {
        this.month = month;
        this.numberOfObservations = numberOfObservations;
    }

    public MonthlyObservationModel() {
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getNumberOfObservations() {
        return numberOfObservations;
    }

    public void setNumberOfObservations(Integer numberOfObservations) {
        this.numberOfObservations = numberOfObservations;
    }
}
