package com.sbm.slovenianbirdmap.controllers.api;

import com.sbm.slovenianbirdmap.controllers.AbstractController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/api/bird")
public class BirdApiController extends AbstractController {
    @PostMapping("/library/search")
    public ResponseEntity<Object> librarySearchForBird(@RequestParam(name = "term") String term,
                                                       @RequestParam(name = "limit") Long limit,
                                                       @RequestParam(name = "offset") Long offset) {
        return new ResponseEntity<Object>(birdsDao.searchBirdByTerm(term, limit, offset), HttpStatus.OK);
    }

    @GetMapping("/getSome")
    public ResponseEntity<Object> libraryLoadBirds(@RequestParam(name = "limit") Long limit,
                                                   @RequestParam(name = "offset") Long offset) {
        return new ResponseEntity<Object>(birdsDao.getSomeBird(limit, offset), HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<Object> getAllBirds() {
        return new ResponseEntity<Object>(birdsDao.getAllBird(), HttpStatus.OK);
    }
}
