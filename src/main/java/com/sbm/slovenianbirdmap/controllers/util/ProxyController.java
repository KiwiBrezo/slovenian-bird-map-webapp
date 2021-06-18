package com.sbm.slovenianbirdmap.controllers.util;

import com.sbm.slovenianbirdmap.utils.Proxy;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/proxy")
public class ProxyController {
    @GetMapping("/data")
    public void getDataProxy(@RequestParam("url") String url,
                         HttpServletResponse response) {
        Proxy.makeCallToUrl(url, response, Proxy.GET_REQUEST);
    }

    @PostMapping("/data")
    public void postDataProxy(@RequestParam("url") String url,
                         HttpServletResponse response) {
        Proxy.makeCallToUrl(url, response, Proxy.POST_REQUEST);
    }
}
