package com.sbm.slovenianbirdmap.controllers;

import com.sbm.slovenianbirdmap.utils.jsp.JspModelAttributes;
import com.sbm.slovenianbirdmap.utils.jsp.PageNames;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
public class AdminController extends AbstractController{
    @GetMapping("/dashboard/{id}")
    public String showAdminDashboard(@CookieValue(value = "userRole", defaultValue = "none") String userRole,
                                    @CookieValue(value = "userEmail", defaultValue = "none") String userEmail,
                                    @PathVariable(value = "id") final Long id,
                                    Model model) {
        if (userRole.equals("admin")) {

            model.addAttribute(JspModelAttributes.USER_ROLE_INFO, userRole);
            model.addAttribute(JspModelAttributes.USER_ID, id);
            model.addAttribute(JspModelAttributes.USER_ID_LEFT_MENU, userDao.getUserID(userEmail));;
            model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.ADMIN_DASHBOARD_PAGE);
            return PageNames.INDEX_PAGE;
        }

        return "redirect:/user/login";
    }
}
