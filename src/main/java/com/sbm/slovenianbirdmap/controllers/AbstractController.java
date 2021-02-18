package com.sbm.slovenianbirdmap.controllers;

import com.sbm.slovenianbirdmap.dao.TestModelDao;
import com.sbm.slovenianbirdmap.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;

@PropertySource("classpath:values.properties")
public class AbstractController {
    @Autowired
    protected UserDao userDao;

    @Autowired
    protected TestModelDao testModelDao;
}