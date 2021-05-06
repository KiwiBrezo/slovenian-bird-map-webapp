package com.sbm.slovenianbirdmap.models;

public class AreaModel {
    private Integer areaID;
    private String name;
    private String geom;

    public AreaModel() { }

    public AreaModel(Integer areaID, String name, String geom) {
        this.areaID = areaID;
        this.name = name;
        this.geom = geom;
    }

    public Integer getAreaID() { return areaID; }

    public void setAreaID(Integer areaID) { this.areaID = areaID; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getGeom() { return geom; }

    public void setGeom(String geom) { this.geom = geom; }
}
