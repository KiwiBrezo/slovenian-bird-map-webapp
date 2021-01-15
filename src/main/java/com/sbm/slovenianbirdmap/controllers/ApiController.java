package com.sbm.slovenianbirdmap.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/*")
public class ApiController {
    @GetMapping("/testAPI")
    public ResponseEntity<Object> test() {
        Map<String, String> resp = new HashMap<>();
        resp.put("status", "API working");
        return new ResponseEntity<Object>(resp, HttpStatus.OK);
    }
}
