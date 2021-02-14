package com.sbm.slovenianbirdmap.controllers;

import com.sbm.slovenianbirdmap.dao.UserDao;
import com.sbm.slovenianbirdmap.models.form.LoginForm;
import com.sbm.slovenianbirdmap.models.form.RegisterForm;
import com.sbm.slovenianbirdmap.utils.JspModelAttributes;
import com.sbm.slovenianbirdmap.utils.PageNames;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserDao userDao;

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

    @PostMapping("/login")
    public String loginUser(Model model, @ModelAttribute LoginForm loginForm) {
        return PageNames.INDEX_PAGE;
    }

    @PostMapping("/register")
    public String registerUser(Model model, @ModelAttribute RegisterForm registerForm) {
        if (userDao.checkIfUserExists(registerForm.getEmail())) {
            // Handle existing user
            model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.USER_REGISTER_PAGE);
            return PageNames.INDEX_PAGE;
        }

        try {
            userDao.addNewUser(registerForm);
            model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.USER_LOGIN_PAGE);
        } catch (Exception exception) {
            exception.printStackTrace();
            model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.USER_REGISTER_PAGE);
        }

        return PageNames.INDEX_PAGE;
    }
}
