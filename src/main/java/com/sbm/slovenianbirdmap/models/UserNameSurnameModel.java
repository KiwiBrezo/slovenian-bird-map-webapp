package com.sbm.slovenianbirdmap.models;

public class UserNameSurnameModel {

    private String name;
    private String surname;

    public UserNameSurnameModel(String name, String surname) {
        this.name = name;
        this.surname = surname;
    }

    public UserNameSurnameModel() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
}
