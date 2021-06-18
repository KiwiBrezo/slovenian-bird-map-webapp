package com.sbm.slovenianbirdmap.controllers.api;

import com.sbm.slovenianbirdmap.controllers.AbstractController;
import com.sbm.slovenianbirdmap.models.ObservationModel;
import com.sbm.slovenianbirdmap.models.TestModel;
import com.sbm.slovenianbirdmap.models.form.GetObservationsUserForm;
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
    @GetMapping("/mobile/getObservationForUser")
    public ResponseEntity<Object> getObservationForUser(@ModelAttribute GetObservationsUserForm getObservationsUserForm) {
        try {
            if (userDao.checkUserMobileToken(getObservationsUserForm.getUserID(), getObservationsUserForm.getMobileToken())) {
                List<ObservationModel> list = observationDao.getObservationForUser(getObservationsUserForm);
                return new ResponseEntity<Object>(list, HttpStatus.OK);
            } else {
                return new ResponseEntity<Object>("PROBLEMS WITH TOKEN", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Object>("PROBLEMS WITH USER_ID", HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin("*")
    @GetMapping("/mobile/getAllBirds")
    public ResponseEntity<Object> getAllBirds() {
        return new ResponseEntity<Object>(birdsDao.getAllBird(), HttpStatus.OK);
    }
}
