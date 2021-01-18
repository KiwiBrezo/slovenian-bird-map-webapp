package com.sbm.slovenianbirdmap.controllers;

import com.sbm.slovenianbirdmap.utils.JspModelAttributes;
import com.sbm.slovenianbirdmap.utils.PageNames;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/map")
public class MapController {
    @GetMapping("/")
    public String getMapView(Model model) {
        model.addAttribute(JspModelAttributes.VIEW_BODY, PageNames.MAP_PAGE);
        return PageNames.INDEX_PAGE;
    }
}
