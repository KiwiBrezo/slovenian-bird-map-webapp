package com.sbm.slovenianbirdmap.controllers;

import com.sbm.slovenianbirdmap.utils.RegexConst;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@Controller
@RequestMapping("/proxy")
public class ProxyController {
    @GetMapping("/get")
    public void getProxy(@RequestParam("url") String url, HttpServletResponse response) {
        makeCallToUrl(url, response);
    }

    @PostMapping("/post")
    public void postProxy(@RequestParam("url") String url, HttpServletResponse response) {
        makeCallToUrl(url, response);
    }

    private void makeCallToUrl(String sanitizedUrl, HttpServletResponse response) {
        OutputStream rostream = null;
        InputStream ristream = null;
        try {

            ristream = getInputStream(sanitizedUrl, response);
            if (ristream != null) {
                rostream = response.getOutputStream();
                response.setHeader("Access-Control-Allow-Headers", "*");
                response.setHeader("X-FRAME-OPTIONS", "SAMEORIGIN");

                if (sanitizedUrl.contains(".terrain")) {
                    response.addHeader("Content-Encoding", "gzip");
                }

                final int bufferSize = 20480;
                byte[] buffer = new byte[bufferSize];
                int bytsRead = ristream.read(buffer);
                while (bytsRead != -1) {
                    rostream.write(buffer, 0, bytsRead);
                    bytsRead = ristream.read(buffer);
                }
                rostream.flush();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rostream != null) {
                    rostream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (ristream != null) {
                    ristream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private InputStream getInputStream(final String sanitizedUrl, HttpServletResponse response) throws IOException {
        InputStream is = null;
        HttpURLConnection connection = null;

        if (sanitizedUrl != null && sanitizedUrl.length() > 0) {

            connection = (HttpURLConnection) new URL(sanitizedUrl).openConnection();
            connection.setRequestMethod("GET");
            is = connection.getInputStream();
            String rawContentDisposition = connection.getHeaderField("Content-Disposition");
            response.setContentType(RegexConst.filter(connection.getContentType(), RegexConst.HTTP_CONTENT_TYPE_FILTER));
            response.setHeader("Content-Disposition", rawContentDisposition);
        }

        return is;
    }
}
