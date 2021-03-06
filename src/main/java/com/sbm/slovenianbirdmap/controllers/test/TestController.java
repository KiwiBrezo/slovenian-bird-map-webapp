package com.sbm.slovenianbirdmap.controllers.test;

import com.sbm.slovenianbirdmap.utils.jsp.PageNames;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
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
    @GetMapping("/testUserCookie")
    public String testUserCookie(@CookieValue(value = "userRole", defaultValue = "none") String userRole, Model model) {
        if (userRole.equals("none")) {
            return "redirect:/user/login";
        } else {
            model.addAttribute("viewBody", PageNames.JSP_TEST_PAGE);
        }
        return PageNames.INDEX_PAGE;
    }
}
