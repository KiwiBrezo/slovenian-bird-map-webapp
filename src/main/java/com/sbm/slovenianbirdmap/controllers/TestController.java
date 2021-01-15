package com.sbm.slovenianbirdmap.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/test/*")
public class TestController {
    @GetMapping("/testJSP")
    public String test() {
        return "test/test";
    }
}
