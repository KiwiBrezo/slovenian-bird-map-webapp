package com.sbm.slovenianbirdmap.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/area")
public class AreaController extends AbstractController{
    @GetMapping("/getAll")
    public ResponseEntity<Object> getAllAreas() {
        return new ResponseEntity<Object>(areaDao.getAllAreas(), HttpStatus.OK);
    }
}
