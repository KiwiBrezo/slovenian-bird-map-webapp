package com.sbm.slovenianbirdmap.models;

public class YearlyObservationModel {
    private Integer yearNumber;
    private Integer numberOfObservations;

    public YearlyObservationModel(Integer yearNumber, Integer numberOfObservations) {
        this.yearNumber = yearNumber;
        this.numberOfObservations = numberOfObservations;
    }

    public YearlyObservationModel() {
    }

    public Integer getYearNumber() {
        return yearNumber;
    }

    public void setYearNumber(Integer yearNumber) {
        this.yearNumber = yearNumber;
    }

    public Integer getNumberOfObservations() {
        return numberOfObservations;
    }

    public void setNumberOfObservations(Integer numberOfObservations) {
        this.numberOfObservations = numberOfObservations;
    }
}
