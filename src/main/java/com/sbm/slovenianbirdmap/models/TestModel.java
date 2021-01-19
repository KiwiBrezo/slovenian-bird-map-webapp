package com.sbm.slovenianbirdmap.models;

public class TestModel {
    private Long testId;
    private String dbType;
    private String dbVersion;

    public TestModel() { }

    public TestModel(Long testId, String dbType, String dbVersion) {
        this.testId = testId;
        this.dbType = dbType;
        this.dbVersion = dbVersion;
    }

    public Long getTestId() {
        return testId;
    }

    public void setTestId(Long testId) {
        this.testId = testId;
    }

    public String getDbType() {
        return dbType;
    }

    public void setDbType(String dbType) {
        this.dbType = dbType;
    }

    public String getDbVersion() {
        return dbVersion;
    }

    public void setDbVersion(String dbVersion) {
        this.dbVersion = dbVersion;
    }
}
