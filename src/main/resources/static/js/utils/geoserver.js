(function (exports) {
    exports.geoserverWms = "";
    exports.geoserverWfs = "";

    exports.init = function () {
        console.log("Geoserver util component init...");
        GeoserverUtilComponent.geoserverWfs = $("#geoserverData").data("wfs");
        GeoserverUtilComponent.geoserverWms = $("#geoserverData").data("wms");
    }

})(GeoserverUtilComponent = {})