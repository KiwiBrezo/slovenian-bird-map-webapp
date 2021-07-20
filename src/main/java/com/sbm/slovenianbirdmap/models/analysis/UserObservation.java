package com.sbm.slovenianbirdmap.models.analysis;

public class UserObservation {
    private Long allTimeObservation;
    private Long thisYearObservation;

    public Long getAllTimeObservation() {
        return allTimeObservation;
    }

    public void setAllTimeObservation(Long allTimeObservation) {
        this.allTimeObservation = allTimeObservation;
    }

    public Long getThisYearObservation() {
        return thisYearObservation;
    }

    public void setThisYearObservation(Long thisYearObservation) {
        this.thisYearObservation = thisYearObservation;
    }
}
