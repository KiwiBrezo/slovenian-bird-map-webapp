package com.sbm.slovenianbirdmap.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/bird")
public class BirdController extends AbstractController{
    @GetMapping("/getAll")
    public ResponseEntity<Object> getAllBirds() {
        return new ResponseEntity<Object>(birdsDao.getAllBird(), HttpStatus.OK);
    }
}
