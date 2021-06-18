package com.sbm.slovenianbirdmap.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Repository;

@Repository
@PropertySource("classpath:geoserver.properties")
public class GeoserverUtils {
    @Value("${sbm.geoserver.url}")
    private String geoserverUrl;

    @Value("${sbm.geoserver.wfs}")
    private String geoserverWfs;

    @Value("${sbm.geoserver.wms}")
    private String geoserverWms;

    public String getGeoserverUrl() {
        return geoserverUrl;
    }

    public String getGeoserverWfs() {
        return geoserverUrl.concat(geoserverWfs);
    }

    public String getGeoserverWms() {
        return geoserverUrl.concat(geoserverWms);
    }
}
