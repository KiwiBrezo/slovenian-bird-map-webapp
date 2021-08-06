package com.sbm.slovenianbirdmap.controllers;

import com.sbm.slovenianbirdmap.utils.jsp.JspModelAttributes;
import com.sbm.slovenianbirdmap.utils.jsp.PageNames;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController extends AbstractController{
    @GetMapping("/")
    public String mainPage(@CookieValue(value = "userRole", defaultValue = "none") String userRole,
                           @CookieValue(value = "userEmail", defaultValue = "none") String userEmail,
                           Model model) {
        if (userRole.equals("user") || userRole.equals("admin")) {
            //model.addAttribute(JspModelAttributes.USER_ROLE_INFO, userRole);
            //model.addAttribute(JspModelAttributes.USER_ID_LEFT_MENU, userDao.getUserID(userEmail));
            return "redirect:/map/";
        }

        //return PageNames.INDEX_PAGE;

        return "redirect:/user/login";
    }
}
