package com.sbm.slovenianbirdmap.controllers.api.analysis;

import com.sbm.slovenianbirdmap.controllers.AbstractController;
import com.sbm.slovenianbirdmap.models.form.UserIDForm;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analysis/user")
public class UserAnalysisController extends AbstractController {
    @CrossOrigin("*")
    @GetMapping("/getNumberOfObservations")
    public ResponseEntity<Object> getNumberOfObservationsForUser(@ModelAttribute UserIDForm userIDForm) {
        return new ResponseEntity<Object>(observationDao.getUserObservationCount(userIDForm), HttpStatus.OK);
    }

    @CrossOrigin("*")
    @GetMapping("/getNumberOfObservationsWeekly")
    public ResponseEntity<Object> getNumberOfObservationsWeeklyForUser(@ModelAttribute UserIDForm userIDForm) {
        return new ResponseEntity<Object>(observationDao.getWeeklyObservationForUser(userIDForm), HttpStatus.OK);
    }

    @CrossOrigin("*")
    @GetMapping("/getNumberOfObservationsMonthly")
    public ResponseEntity<Object> getNumberOfObservationsMonthlyForUser(@ModelAttribute UserIDForm userIDForm) {
        return new ResponseEntity<Object>(observationDao.getMonthlyObservationForUser(userIDForm), HttpStatus.OK);
    }

    @CrossOrigin("*")
    @GetMapping("/getLastObservations")
    public ResponseEntity<Object> getLast10ObservationsForUser(@ModelAttribute UserIDForm userIDForm) {
        return new ResponseEntity<Object>(observationDao.getLast10ObservationForUser(userIDForm), HttpStatus.OK);
    }
}
