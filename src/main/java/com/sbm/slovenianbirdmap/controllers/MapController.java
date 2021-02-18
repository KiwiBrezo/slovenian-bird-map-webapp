package com.sbm.slovenianbirdmap.controllers;

import com.sbm.slovenianbirdmap.utils.JspModelAttributes;
import com.sbm.slovenianbirdmap.utils.PageNames;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/map")
public class MapController {
    @GetMapping("/")
    public String getMapView(@CookieValue(value = "userRole", defaultValue = "none") String userRole,
                             @CookieValue(value = "userEmail", defaultValue = "none") String userEmail,
                             Model model) {
        //if (userRole.equals("user") || userRole.equals("admin")) {
        if (true) {
            model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.MAP_PAGE);
            return PageNames.INDEX_PAGE;
        }

        return "redirect:/user/login";
    }
}
