package com.sbm.slovenianbirdmap.controllers.api.analysis;

import com.sbm.slovenianbirdmap.controllers.AbstractController;
import com.sbm.slovenianbirdmap.models.form.BirdIDForm;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analysis/bird")
public class BirdAnalysisController extends AbstractController {
    @CrossOrigin("*")
    @GetMapping("/getNumberOfObservedBirdType")
    public ResponseEntity<Object> getNumberOfObservedBirdType(@ModelAttribute BirdIDForm birdIDForm) {
        return new ResponseEntity<Object>(observationDao.getObservationForBirdType(birdIDForm), HttpStatus.OK);
    }

    @CrossOrigin("*")
    @GetMapping("/getNumberOfObserversForBird")
    public ResponseEntity<Object> getNumberOfObserversForBird(@ModelAttribute BirdIDForm birdIDForm) {
        return new ResponseEntity<Object>(observationDao.getNumberOfObserversForBird(birdIDForm), HttpStatus.OK);
    }

    @CrossOrigin("*")
    @GetMapping("/getNumberOfObservationsMonthly")
    public ResponseEntity<Object> getNumberOfObservationsMonthlyForBird(@ModelAttribute BirdIDForm birdIDForm) {
        return new ResponseEntity<Object>(observationDao.getMonthlyObservationForBird(birdIDForm), HttpStatus.OK);
    }

    @CrossOrigin("*")
    @GetMapping("/getNumberOfObservationsYearly")
    public ResponseEntity<Object> getNumberOfObservationsYearlyForBird(@ModelAttribute BirdIDForm birdIDForm) {
        return new ResponseEntity<Object>(observationDao.getYearlyObservationForBird(birdIDForm), HttpStatus.OK);
    }

    @CrossOrigin("*")
    @GetMapping("/getNumberOfObservationsSeason")
    public ResponseEntity<Object> getNumberOfObservationsSeasonForBird(@ModelAttribute BirdIDForm birdIDForm) {
        return new ResponseEntity<Object>(observationDao.getSeasonObservationForBird(birdIDForm), HttpStatus.OK);
    }
}
