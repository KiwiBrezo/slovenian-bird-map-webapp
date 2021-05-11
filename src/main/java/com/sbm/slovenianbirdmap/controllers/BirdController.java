package com.sbm.slovenianbirdmap.controllers;

import com.sbm.slovenianbirdmap.utils.JspModelAttributes;
import com.sbm.slovenianbirdmap.utils.PageNames;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/bird")
public class BirdController extends AbstractController{
    @GetMapping("/")
    public String getMapView(@CookieValue(value = "userRole", defaultValue = "none") String userRole,
                             @CookieValue(value = "userEmail", defaultValue = "none") String userEmail,
                             Model model) {
        if (userRole.equals("user") || userRole.equals("admin")) {
            model.addAttribute(JspModelAttributes.BIRD_LIBRARY_LIST, birdsDao.getSomeBird(10L, 0L));
            model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.BIRD_LIBRARY_PAGE);
            return PageNames.INDEX_PAGE;
        }

        return "redirect:/user/login";
    }

    @GetMapping("/{birdID}")
    public String getMapView(@CookieValue(value = "userRole", defaultValue = "none") String userRole,
                             @CookieValue(value = "userEmail", defaultValue = "none") String userEmail,
                             @PathVariable(value = "birdID") final Long birdID,
                             Model model) {
        if (userRole.equals("user") || userRole.equals("admin")) {
            model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.BIRD_INFO_PAGE);
            return PageNames.INDEX_PAGE;
        }

        return "redirect:/user/login";
    }

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
