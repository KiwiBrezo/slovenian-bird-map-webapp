package com.sbm.slovenianbirdmap.models;

public class SeasonObservationModel {
    private Integer seasonNumber;
    private Integer numberOfObservations;

    public SeasonObservationModel(Integer seasonNumber, Integer numberOfObservations) {
        this.seasonNumber = seasonNumber;
        this.numberOfObservations = numberOfObservations;
    }

    public SeasonObservationModel() {
    }

    public Integer getSeasonNumber() {
        return seasonNumber;
    }

    public void setSeasonNumber(Integer seasonNumber) {
        this.seasonNumber = seasonNumber;
    }

    public Integer getNumberOfObservations() {
        return numberOfObservations;
    }

    public void setNumberOfObservations(Integer numberOfObservations) {
        this.numberOfObservations = numberOfObservations;
    }
}
