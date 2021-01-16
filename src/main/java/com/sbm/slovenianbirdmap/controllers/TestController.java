package com.sbm.slovenianbirdmap.controllers;

import com.sbm.slovenianbirdmap.utils.PageNames;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/test/*")
public class TestController {
    @GetMapping("/testJSP")
    public String test(Model model) {
        model.addAttribute("viewBody", PageNames.JSP_TEST_PAGE);
        return PageNames.INDEX_PAGE;
    }
}
