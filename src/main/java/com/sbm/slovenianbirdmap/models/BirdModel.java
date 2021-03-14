package com.sbm.slovenianbirdmap.models;

public class BirdModel {
    private Integer birdID;
    private String name;
    private String nameLat;
    private String imageLink;
    private String jsonData;

    public BirdModel() { }

    public BirdModel(Integer birdID, String name, String nameLat, String imageLink, String jsonData) {
        this.birdID = birdID;
        this.name = name;
        this.nameLat = nameLat;
        this.imageLink = imageLink;
        this.jsonData = jsonData;
    }

    public Integer getBirdID() {
        return birdID;
    }

    public void setBirdID(Integer birdID) {
        this.birdID = birdID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameLat() {
        return nameLat;
    }

    public void setNameLat(String nameLat) {
        this.nameLat = nameLat;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }

    public String getJsonData() {
        return jsonData;
    }

    public void setJsonData(String jsonData) {
        this.jsonData = jsonData;
    }
}
