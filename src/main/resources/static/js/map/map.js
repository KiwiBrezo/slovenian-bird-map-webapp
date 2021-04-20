(function (exports) {
    var mapStartZoom = 8.85;
    var mapMinZoom = 8.5;
    var mapMaxZoom = 21;
    var mapSLOCenterCoordinateLon = 15.005333; // center of slo [14.815333, 46.119944]
    var mapSLOCenterCoordinateLat = 46.119944;

    var mousePositionControl;

    exports.OBSERVATION_LAYER = "observation_layer";

    exports.newObservationMarkerLayer = null;
    exports.map = null;

    exports.init = function () {
        console.log("Map component init...");
        initMap();
        NewObservationComponent.init();
        AnalyzerComponent.init();
        SearchComponent.init();
        NotificationComponent.init();
    }

    exports.closeSearchResults = function() {
        MapComponent.removeLayer(MapComponent.OBSERVATION_LAYER);
        SearchComponent.cqlFilter = "";

        $('.search-result-container').hide();
        $('.search-result-container .container-body').empty();
    }

    exports.showObservationInfo = function(data) {
        $('.observation-info-container #birdNormalName').text(data.birdName);
        $('.observation-info-container #userData').text("Opazovalec: " + data.userName + " " + data.userSurname);
        $('.observation-info-container #col').text("Št. osebkov: " + data.col);
        $('.observation-info-container #dateOfObservation').text("Datum: " + new Date(data.date).toISOString().split('T')[0]);
        $('.observation-info-container #comment').text(data.comment);
        $('.observation-info-container #zoomToBtn').attr("data-geom", data.geom);
        $('.observation-info-container').show();
    }

    exports.closeObservationInfo = function() {
        $('.observation-info-container').hide();
    }

    exports.addNewLayer = function(params, layerName) {
        var newLayer = new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: "http://83.212.82.148:8080/geoserver/slovenian-bird-map/wms",
                params: params || {}
            }),
            name: layerName
        });

        MapComponent.map.addLayer(newLayer);
    }

    exports.removeLayer = function(layerName) {
        MapComponent.map.getLayers().forEach(function (layer) {
            if (layer.get("name") === layerName) {
                MapComponent.map.removeLayer(layer);
            }
        });
    }

    exports.addTestLayer = function () {
        console.log(exports.map.getSize());
        console.log(exports.map.getView().calculateExtent(exports.map.getSize()));

        var testParams = {
            "REQUEST": "GetMap",
            "SERVICE": "WMS",
            "VERSION": "1.3.0",
            "LAYERS": "slovenian-bird-map:observations",
            "CRS": 3857,
            "WIDTH": exports.map.getSize()[0],
            "HEIGHT": exports.map.getSize()[1],
            "BBOX": exports.map.getView().calculateExtent(exports.map.getSize()).toString(),
            "FORMAT": "image/png",
            "CQL_FILTER": "bird_id=24"
        };

        var name = "TestLayer";

        MapComponent.addNewLayer(testParams, name);
    }

    exports.removeTestLayer = function () {
        MapComponent.removeLayer("TestLayer");
    }

    function toggleUserMenu() {
        var element = $(".user-menu-btn");
        if (element.hasClass("fa-caret-down")) {
            element.removeClass("fa-caret-down");
            element.addClass("fa-caret-up");
            $(".user-container").animate({
                height: "155px"
            }, 300, function () {
                $(".user-container-body").show();
            });
        } else if (element.hasClass("fa-caret-up")) {
            element.removeClass("fa-caret-up");
            element.addClass("fa-caret-down");
            $(".user-container-body").hide();
            $(".user-container").animate({
                height: "45px"
            }, 300, function () { });
        }
    }

    function toggleToolsMenu() {
        var element = $(".tool-btn-container");
        if (element.hasClass("activate")) {
            element.removeClass("activate");
            $(".tool-container").hide();
        } else {
            element.addClass("activate");
            $(".tool-container").show();
        }
    }

    function initMap() {
        mousePositionControl = new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(6),
            projection: 'EPSG:4326',
            className: 'custom-mouse-position',
            target: document.getElementById('mouse-position'),
            undefinedHTML: '---------, ---------',
        });

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
            }),
            controls: ol.control.defaults().extend([mousePositionControl])
        });

        MapComponent.map.on("singleclick", function (e) {
            if (NewObservationComponent.canSelectLocation) {
                var coordinate = ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
                NewObservationComponent.selectedLocation = {
                    lon: coordinate[0],
                    lat: coordinate[1]
                }
                NewObservationComponent.toggleLocationSelector();

                var marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(coordinate)));
                MapComponent.newObservationMarkerLayer.getSource().addFeature(marker);
            }
        });

        MapComponent.newObservationMarkerLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                image: new ol.style.RegularShape({
                    fill: new ol.style.Fill({
                        color: 'red'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'black',
                        width: 2
                    }),
                    points: 4,
                    radius: 10,
                    radius2: 0,
                    angle: Math.PI / 4,
                }),
            })
        });

        MapComponent.map.addLayer(MapComponent.newObservationMarkerLayer);

        $(".ol-attribution").hide();

        $(".user-container .float-right").click(function() {
            toggleUserMenu();
        });

        $(".tool-container").draggable({
            containment: $("#map"),
            handle: $(".tool-container .drag-handle")
        });

        $(".observation-info-container").draggable({
            containment: $("#map"),
            handle: $(".observation-info-container .drag-handle")
        });

        $(".tool-btn-container").click(function () {
            toggleToolsMenu();
        });

        $.ajax({
            url: "/bird/getAll",
        }).done(function (data) {
            var dataForSelect = [];
            data.forEach(function (obj) {
                var tmpObj = {
                    id: obj.birdID,
                    text: obj.name
                };
                dataForSelect.push(tmpObj);
            })

            $("#bird-select-new-observation").select2({
                data: dataForSelect
            });
        });

        $("#area-select").select2({
            data: [{
                id: 0,
                text: "lalala"
            }, {
                id: 1,
                text: "Muh muh"
            }]
        });
    }
})(MapComponent = {});
