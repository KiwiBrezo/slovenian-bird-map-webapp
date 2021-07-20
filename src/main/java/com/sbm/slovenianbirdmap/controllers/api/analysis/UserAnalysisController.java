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
        return new ResponseEntity<Object>(userDao.getUserObservationCount(userIDForm), HttpStatus.OK);
    }
}
