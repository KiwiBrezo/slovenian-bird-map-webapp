package com.sbm.slovenianbirdmap.controllers;

import com.sbm.slovenianbirdmap.models.ObservationModel;
import com.sbm.slovenianbirdmap.models.TestModel;
import com.sbm.slovenianbirdmap.models.form.ObservationForm;
import com.sbm.slovenianbirdmap.models.form.SearchObservationForm;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController extends AbstractController {

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

    @CrossOrigin("*")
    @PostMapping("/addObservation")
    public ResponseEntity<Object> addNewObservation(@ModelAttribute ObservationForm observationForm) {
        if (!observationDao.addNewObservation(observationForm)) {
            return new ResponseEntity<Object>("NOT OK", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Object>("OK", HttpStatus.OK);
    }

    @CrossOrigin("*")
    @GetMapping("/searchObservation")
    public ResponseEntity<Object> searchObservationByTerm(@ModelAttribute SearchObservationForm searchObservationForm) {
        List<ObservationModel> list = observationDao.getObservationByTerm(searchObservationForm);
        return new ResponseEntity<Object>(list, HttpStatus.OK);
    }
}
