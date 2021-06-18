package com.sbm.slovenianbirdmap.controllers;

import com.sbm.slovenianbirdmap.models.form.LoginForm;
import com.sbm.slovenianbirdmap.models.form.RegisterForm;
import com.sbm.slovenianbirdmap.utils.jsp.JspModelAttributes;
import com.sbm.slovenianbirdmap.utils.jsp.PageNames;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/user")
public class UserController extends AbstractController {

    @Value("${register.error}")
    private String registerErrMsg;

    @Value("${register.success}")
    private String registerSuccMsg;

    @Value("${register.user.exists}")
    private String registerUserExistMsg;

    @Value("${login.error}")
    private String loginErrMsg;

    @GetMapping("/login")
    public String getLoginPage(Model model, @RequestParam(name = "redirected", required = false) Boolean redirected) {
        if (redirected != null) {
            model.addAttribute(JspModelAttributes.SUCCESS_MSG, registerSuccMsg);
        }
        model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.USER_LOGIN_PAGE);
        return PageNames.INDEX_PAGE;
    }

    @GetMapping("/register")
    public String getRegisterPage(Model model) {
        model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.USER_REGISTER_PAGE);
        return PageNames.INDEX_PAGE;
    }

    @PostMapping("/login")
    public String loginUser(HttpServletResponse response, Model model, @ModelAttribute LoginForm loginForm) {
        try {
            if (userDao.loginUserWebapp(loginForm)) {
                Cookie cookieRole = new Cookie("userRole", userDao.getUserRole(loginForm));
                cookieRole.setMaxAge(60 * 60);
                cookieRole.setHttpOnly(true);
                cookieRole.setPath("/");
                response.addCookie(cookieRole);
                Cookie cookieUserID = new Cookie("userEmail", loginForm.getEmail());
                cookieUserID.setMaxAge(60 * 60);
                cookieUserID.setHttpOnly(true);
                cookieUserID.setPath("/");
                response.addCookie(cookieUserID);
                return "redirect:/map/";
            } else {
                model.addAttribute(JspModelAttributes.ERROR_MSG, loginErrMsg);
                model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.USER_LOGIN_PAGE);
                return PageNames.INDEX_PAGE;
            }
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute(JspModelAttributes.ERROR_MSG, loginErrMsg);
            model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.USER_LOGIN_PAGE);
            return PageNames.INDEX_PAGE;
        }
    }

    @PostMapping("/register")
    public String registerUser(Model model, @ModelAttribute RegisterForm registerForm) {
        if (userDao.checkIfUserExists(registerForm.getEmail())) {
            // Handle existing user
            model.addAttribute(JspModelAttributes.ERROR_MSG, registerUserExistMsg);
            model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.USER_REGISTER_PAGE);
            return PageNames.INDEX_PAGE;
        }

        try {
            userDao.addNewUser(registerForm);
            model.addAttribute("redirected", true);
        } catch (Exception exception) {
            exception.printStackTrace();
            model.addAttribute(JspModelAttributes.ERROR_MSG, registerErrMsg);
            model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.USER_REGISTER_PAGE);
            return PageNames.INDEX_PAGE;
        }
        return "redirect:/user/login";
    }

    @GetMapping("/logout")
    public String logoutUser(HttpServletResponse response) {
        Cookie cookieRole = new Cookie("userRole", null);
        cookieRole.setMaxAge(0);
        cookieRole.setHttpOnly(true);
        cookieRole.setPath("/");
        response.addCookie(cookieRole);
        Cookie cookieUserID = new Cookie("userEmail", null);
        cookieUserID.setMaxAge(0);
        cookieUserID.setHttpOnly(true);
        cookieUserID.setPath("/");
        response.addCookie(cookieUserID);
        return "redirect:/";
    }
}
