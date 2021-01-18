package com.sbm.slovenianbirdmap.controllers;

import com.sbm.slovenianbirdmap.utils.JspModelAttributes;
import com.sbm.slovenianbirdmap.utils.PageNames;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {
    @GetMapping("/login")
    public String getLoginPage(Model model) {
        model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.USER_LOGIN_PAGE);
        return PageNames.INDEX_PAGE;
    }

    @GetMapping("/register")
    public String getRegisterPage(Model model) {
        model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.USER_REGISTER_PAGE);
        return PageNames.INDEX_PAGE;
    }
}
