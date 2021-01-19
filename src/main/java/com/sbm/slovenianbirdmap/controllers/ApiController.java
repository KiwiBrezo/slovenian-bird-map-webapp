package com.sbm.slovenianbirdmap.controllers;

import com.sbm.slovenianbirdmap.dao.TestModelDao;
import com.sbm.slovenianbirdmap.models.TestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/*")
public class ApiController {

    @Autowired
    private TestModelDao testModelDao;

    @CrossOrigin("*")
    @GetMapping("/testAPI")
    public ResponseEntity<Object> test() {
        Map<String, String> resp = new HashMap<>();
        resp.put("status", "API working");
        return new ResponseEntity<Object>(resp, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @GetMapping("/testDB")
    public ResponseEntity<Object> testDB() {
        List<TestModel> testModels = testModelDao.getTestModels();
        return new ResponseEntity<Object>(testModels, HttpStatus.OK);
    }
}
