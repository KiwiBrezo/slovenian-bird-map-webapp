package com.sbm.slovenianbirdmap.utils;


import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class Proxy {
    public static final String GET_REQUEST = "GET";
    public static final String POST_REQUEST = "POST";

    public static void makeCallToUrl(String url,
                               HttpServletResponse response,
                               String method) {
        OutputStream outputStream = null;
        InputStream inputStream = null;
        try {
            inputStream = getInputStream(url, response, method);
            if (inputStream != null) {
                outputStream = response.getOutputStream();
                response.setHeader("Access-Control-Allow-Headers", "*");
                response.setHeader("X-FRAME-OPTIONS", "SAMEORIGIN");

                final int bufferSize = 20480;
                byte[] buffer = new byte[bufferSize];
                int bytsRead = inputStream.read(buffer);
                while (bytsRead != -1) {
                    outputStream.write(buffer, 0, bytsRead);
                    bytsRead = inputStream.read(buffer);
                }
                outputStream.flush();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (outputStream != null) {
                    outputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (inputStream != null) {
                    inputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private static InputStream getInputStream(String url,
                                       HttpServletResponse response,
                                       String method) throws IOException {
        InputStream inputStream = null;
        HttpURLConnection connection = null;

        if (url != null && url.length() > 0) {
            connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setRequestMethod(method);
            inputStream = connection.getInputStream();
            String rawContentDisposition = connection.getHeaderField("Content-Disposition");
            response.setContentType(RegexConst.filter(connection.getContentType(), RegexConst.HTTP_CONTENT_TYPE_FILTER));
            response.setHeader("Content-Disposition", rawContentDisposition);
        }

        return inputStream;
    }
}
