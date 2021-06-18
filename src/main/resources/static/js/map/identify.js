(function (exports) {

    exports.init = function () {
        console.log("Identify component init...");
    }

    //TODO: not working...treba popravit
    exports.identifyOnLocation = function (coordinates, cqlFilter) {
        var params = {
            "REQUEST": "GetFeatureInfo",
            "SERVICE": "WMS",
            "VERSION": "1.3.0",
            "LAYERS": "slovenian-bird-map:observations",
            "QUERY_LAYERS": "slovenian-bird-map:observations",
            "CRS": "EPSG:3857",
            "WIDTH": MapComponent.map.getSize()[0],
            "HEIGHT": MapComponent.map.getSize()[1],
            "BBOX": MapComponent.map.getView().calculateExtent(MapComponent.map.getSize()).toString(),
            "I": coordinates.left,
            "J": coordinates.top,
            "INFO_FORMAT": "application/json"
        };

        if (cqlFilter != "") {
            params["CQL_FILTER"] = cqlFilter;
        }

        var url = "http://83.212.82.148:8080/geoserver/slovenian-bird-map/wms?" + $.param(params);

        $.ajax({
            url: "/proxy/data",
            data: {
                url: url
            }
        }).done(function (responseFeature) {
            console.log(responseFeature);
            if (responseFeature.features[0]) {
                var featureCoordinates = ol.proj.transform(responseFeature.features[0].geometry.coordinates, 'EPSG:3857', 'EPSG:4326');
                console.log(featureCoordinates);
                var params = {
                    "REQUEST": "GetFeature",
                    "SERVICE": "WFS",
                    "VERSION": "1.1.1",
                    "TYPENAMES": "slovenian-bird-map:observations",
                    "OUTPUTFORMAT": "application/json"
                };

                if (cqlFilter != "") {
                    params["CQL_FILTER"] = cqlFilter;
                }

                var url = "http://83.212.82.148:8080/geoserver/slovenian-bird-map/wfs?" + $.param(params);

                console.log(url);

                $.ajax({
                    url: "/proxy/data",
                    data: {
                        url: url
                    }
                }).done(function (response) {
                    console.log(response);
                    $.each(response.features || [], function (index, feature) {
                        console.log(feature.geometry.coordinates);
                        if (feature.geometry.coordinates[0] == featureCoordinates[0].toFixed(8) && feature.geometry.coordinates[1] == featureCoordinates[1].toFixed(8)) {
                            console.log(feature.geometry.coordinates);
                        }
                    })
                });
            }
        });
    }

})(IdentifyComponent = {});