(function (exports) {

    exports.init = function () {
        console.log("Identify component init...");
    }

    exports.identifyOnLocation = function (coordinates, cqlFilter) {
        var params = {
            "REQUEST": "GetFeatureInfo",
            "SERVICE": "WMS",
            "VERSION": "1.3.0",
            "LAYERS": "slovenian-bird-map:observations",
            "QUERY_LAYERS": "slovenian-bird-map:observations",
            "CRS": 3857,
            "WIDTH": MapComponent.map.getSize()[0],
            "HEIGHT": MapComponent.map.getSize()[1],
            "BBOX": MapComponent.map.getView().calculateExtent(MapComponent.map.getSize()).toString(),
            "I": coordinates.left,
            "J": coordinates.top,
            "CQL_FILTER": cqlFilter
        };

        $.ajax({
            url: "http://83.212.82.148:8080/geoserver/slovenian-bird-map/wms",
            params: $.param(params)
        }).done(function (response) {
            console.log(response);
        });
    }

})(IdentifyComponent = {});