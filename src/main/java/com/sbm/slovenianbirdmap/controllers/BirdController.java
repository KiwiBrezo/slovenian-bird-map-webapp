package com.sbm.slovenianbirdmap.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.sbm.slovenianbirdmap.models.BirdModel;
import com.sbm.slovenianbirdmap.utils.jsp.JspModelAttributes;
import com.sbm.slovenianbirdmap.utils.jsp.PageNames;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Controller
@RequestMapping("/bird")
public class BirdController extends AbstractController{
    @GetMapping("/")
    public String getMapView(@CookieValue(value = "userRole", defaultValue = "none") String userRole,
                             @CookieValue(value = "userEmail", defaultValue = "none") String userEmail,
                             Model model) {
        if (userRole.equals("user") || userRole.equals("admin")) {
            model.addAttribute(JspModelAttributes.BIRD_LIBRARY_LIST, birdsDao.getSomeBird(10L, 0L));
            model.addAttribute(JspModelAttributes.USER_ROLE_INFO, userRole);
            model.addAttribute(JspModelAttributes.USER_ID_LEFT_MENU, userDao.getUserID(userEmail));
            model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.BIRD_LIBRARY_PAGE);
            return PageNames.INDEX_PAGE;
        }

        return "redirect:/user/login";
    }

    @GetMapping("/{birdID}")
    public String getMapView(@CookieValue(value = "userRole", defaultValue = "none") String userRole,
                             @CookieValue(value = "userEmail", defaultValue = "none") String userEmail,
                             @PathVariable(value = "birdID") final Long birdID,
                             Model model) throws IOException {
        if (userRole.equals("user") || userRole.equals("admin")) {
            BirdModel bird = birdsDao.getBirdByID(birdID);
            Object obj = objectMapper.readValue(bird.getJsonData(), new TypeReference<Object>(){});
            model.addAttribute(JspModelAttributes.USER_ROLE_INFO, userRole);
            model.addAttribute(JspModelAttributes.USER_ID_LEFT_MENU, userDao.getUserID(userEmail));
            model.addAttribute(JspModelAttributes.BIRD_DATA_OBJECT, bird);
            model.addAttribute(JspModelAttributes.BIRD_INFO_DATA, obj);
            model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.BIRD_INFO_PAGE);
            return PageNames.INDEX_PAGE;
        }

        return "redirect:/user/login";
    }
}
