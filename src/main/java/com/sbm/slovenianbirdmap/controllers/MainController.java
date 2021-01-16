package com.sbm.slovenianbirdmap.controllers;

import com.sbm.slovenianbirdmap.utils.PageNames;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    @GetMapping("/")
    public String mainPage(Model model) {
        model.addAttribute("viewBody", PageNames.MAIN_PAGE);
        return PageNames.INDEX_PAGE;
    }
}
