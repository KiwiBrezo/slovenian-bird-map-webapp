(function (exports) {
    var mapStartZoom = 8.85;
    var mapMinZoom = 8.5;
    var mapMaxZoom = 21;
    var mapSLOCenterCoordinateLon = 15.005333; // center of slo [14.815333, 46.119944]
    var mapSLOCenterCoordinateLat = 46.119944;

    exports.map = null;

    exports.init = function () {
        console.log("Map component init...");
        initMap();
    }

    exports.closeSearchResults = function() {
        $('.search-result-container').hide();
        $('.search-result-container .container-body').empty();
    }

    function initMap() {
        MapComponent.map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([mapSLOCenterCoordinateLon, mapSLOCenterCoordinateLat]),
                zoom: mapStartZoom,
                minZoom: mapMinZoom,
                maxZoom: mapMaxZoom
            })
        });

        $(".ol-attribution").hide();
    }
})(MapComponent = {});
