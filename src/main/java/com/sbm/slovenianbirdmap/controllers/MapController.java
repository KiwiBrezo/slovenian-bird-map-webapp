package com.sbm.slovenianbirdmap.controllers;

import com.sbm.slovenianbirdmap.utils.JspModelAttributes;
import com.sbm.slovenianbirdmap.utils.PageNames;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/map")
public class MapController extends AbstractController {
    @GetMapping("/")
    public String getMapView(@CookieValue(value = "userRole", defaultValue = "none") String userRole,
                             @CookieValue(value = "userEmail", defaultValue = "none") String userEmail,
                             Model model) {
        if (userRole.equals("user") || userRole.equals("admin")) {
            model.addAttribute(JspModelAttributes.MAP_START_CQL_FILTER, "");
            model.addAttribute(JspModelAttributes.USER_NAME, userDao.getUserName(userEmail));
            model.addAttribute(JspModelAttributes.USER_ID, userDao.getUserID(userEmail));
            model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.MAP_PAGE);
            return PageNames.INDEX_PAGE;
        }

        return "redirect:/user/login";
    }

    @GetMapping("/{type}/{id}")
    public String getMapView(@CookieValue(value = "userRole", defaultValue = "none") String userRole,
                             @CookieValue(value = "userEmail", defaultValue = "none") String userEmail,
                             @PathVariable(value = "type", required = false) final String type,
                             @PathVariable(value = "id", required = false) final Long id,
                             Model model) {
        if (userRole.equals("user") || userRole.equals("admin")) {
            String cqlFilter = "";

            if (type != null && id != null) {
                if (type == "bird") {
                    cqlFilter = "bird_id = " + id.toString();
                } else if (type == "observation") {
                    cqlFilter = "observation_id = " + id.toString();
                } else if (type == "user") {
                    cqlFilter = "user_id = " + id.toString();
                }
            }

            model.addAttribute(JspModelAttributes.MAP_START_CQL_FILTER, cqlFilter);
            model.addAttribute(JspModelAttributes.USER_NAME, userDao.getUserName(userEmail));
            model.addAttribute(JspModelAttributes.USER_ID, userDao.getUserID(userEmail));
            model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.MAP_PAGE);
            return PageNames.INDEX_PAGE;
        }

        return "redirect:/user/login";
    }
}
