package com.sbm.slovenianbirdmap.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sbm.slovenianbirdmap.dao.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;

@PropertySource("classpath:values.properties")
public class AbstractController {
    @Autowired
    protected UserDao userDao;

    @Autowired
    protected BirdsDao birdsDao;

    @Autowired
    protected ObservationDao observationDao;

    @Autowired
    protected AreaDao areaDao;

    @Autowired
    protected TestModelDao testModelDao;

    protected ObjectMapper objectMapper = new ObjectMapper();
}
