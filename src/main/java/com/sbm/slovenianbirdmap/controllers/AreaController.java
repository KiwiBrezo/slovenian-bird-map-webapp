package com.sbm.slovenianbirdmap.controllers;

import com.sbm.slovenianbirdmap.models.AreaModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/area")
public class AreaController extends AbstractController{
    @GetMapping("/getAll")
    public List<AreaModel> getAllAreas() {
        return new ArrayList<AreaModel>();
    }
}
