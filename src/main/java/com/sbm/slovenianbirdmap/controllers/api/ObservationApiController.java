package com.sbm.slovenianbirdmap.controllers.api;

import com.sbm.slovenianbirdmap.controllers.AbstractController;
import com.sbm.slovenianbirdmap.models.ObservationModel;
import com.sbm.slovenianbirdmap.models.form.ObservationForm;
import com.sbm.slovenianbirdmap.models.form.SearchObservationForm;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/observation")
public class ObservationApiController extends AbstractController {
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

    @CrossOrigin("*")
    @GetMapping("/searchObservationDistinctBirdIDs")
    public ResponseEntity<Object> searchObservationDistinctBirdIDs(@ModelAttribute SearchObservationForm searchObservationForm) {
        List<Integer> list = observationDao.getObservationDistinctBirdIDs(searchObservationForm);
        return new ResponseEntity<Object>(list, HttpStatus.OK);
    }
}
