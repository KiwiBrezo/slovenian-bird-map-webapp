package com.sbm.slovenianbirdmap.utils;

import org.springframework.util.StringUtils;

public class RegexConst {
    public static final String NUMERIC_STRING = "^[0-9]*$";

    public static final String ALPHANUMERIC_STRING = "^[a-zA-Z0-9_]*$";

    public static final String DOCUMENT_TITLE = "^[A-Za-z0-9čćžšđČĆŽŠĐ\\s.,\\-_#()= /]*$";

    public static final String DOCUMENT_TITLE_FILTER = "[^A-Za-z0-9čćžšđČĆŽŠĐ.,\\-_#()= /]";
    public static final String COUNTRY_NANE_FILTER = "[^A-Za-z0-9čćžšđČĆŽŠĐ ]";
    public static final String MINISTRY_NANE_FILTER = "[^A-Za-z0-9čćžšđČĆŽŠĐ \\-/,.]";

    public static final String HTTP_CONTENT_TYPE_FILTER = "[^A-Za-z0-9 \\-/;,.=*]";

    public static String filter(String in, String regex) {
        if (StringUtils.isEmpty(in)) {
            return in;
        }
        return in.replaceAll(regex, "");
    }
}
