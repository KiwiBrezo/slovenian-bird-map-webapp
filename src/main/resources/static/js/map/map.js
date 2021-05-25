(function (exports) {
    var mapStartZoom = 8.85;
    var mapMinZoom = 8.5;
    var mapMaxZoom = 21;
    var mapSLOCenterCoordinateLon = 15.005333; // center of slo [14.815333, 46.119944]
    var mapSLOCenterCoordinateLat = 46.119944;

    var mousePositionControl;
    var draw;
    var snap;
    var drawVectorSource;
    var drawVectorLayer;
    var drawModify;

    exports.OBSERVATION_LAYER = "observation_layer";
    exports.DRAW_LAYER = "draw_layer";
    exports.AREA_LAYER = "area_layer";

    exports.newObservationMarkerLayer = null;
    exports.areaLayer = null;
    exports.map = null;
    exports.wktFormater = null;

    exports.init = function () {
        console.log("Map component init...");
        initMap();
        NewObservationComponent.init();
        AnalyzerComponent.init();
        SearchComponent.init();
        NotificationComponent.init();

        var startCql = $("#defaultCqlFilter").data("cql");
        if (startCql != null && startCql != "") {
            $(".search-field-container").hide();
            $(".tool-btn-container").trigger("click");
            $(".tool-btn-container").css("right", "20px");
            $(".heatmap-btn-container").css("right", "75px");
            SearchComponent.cqlFilter = startCql;
            MapComponent.loadObservationLayer();
        }
    }

    exports.closeSearchResults = function() {
        MapComponent.removeLayer(MapComponent.OBSERVATION_LAYER);
        SearchComponent.cqlFilter = "";
        AnalyzerComponent.advancedCqlFilter = "";

        $('.search-result-container').hide();
        $('.search-result-container .container-body').empty();
    }

    exports.showObservationInfo = function(data) {
        $('.observation-info-container #birdNormalName')
            .text(data.birdName)
            .click(function () {
                BirdInfoComponent.showInfoForBird(data.birdID)
            });
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

    exports.addNewImageLayer = function(params, layerName) {
        var newLayer = new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: "http://83.212.82.148:8080/geoserver/slovenian-bird-map/wms",
                params: params || {}
            }),
            name: layerName
        });

        MapComponent.map.addLayer(newLayer);
    }

    exports.removeLayer = function(layerName) {
        MapComponent.map.getLayers().forEach(function (layer) {
            if (layer.get("name") == layerName) {
                MapComponent.map.removeLayer(layer);
            }
        });
    }

    exports.getLayerByName = function(layerName) {
        var returnLayer = null;
        MapComponent.map.getLayers().forEach(function (layer) {
            if (layer.get("name") == layerName) {
                returnLayer = layer;
            }
        });
        return returnLayer;
    }

    exports.centerToGeom = function(geom) {
        var feature = MapComponent.wktFormater.readFeature(geom);
        var extent = feature.getGeometry().transform('EPSG:4326', 'EPSG:3857').getExtent();

        MapComponent.map.getView().fit(extent, {
            size: MapComponent.map.getSize(),
            padding: [500, 500, 500, 500]
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

    exports.showObservationLayerHeatmap = function() {
        if (SearchComponent.cqlFilter !== "") {
            MapComponent.addNewImageLayer({
                "REQUEST": "GetMap",
                "SERVICE": "WMS",
                "VERSION": "1.3.0",
                "LAYERS": "slovenian-bird-map:observations_heatmap",
                "CRS": 3857,
                "WIDTH": MapComponent.map.getSize()[0],
                "HEIGHT": MapComponent.map.getSize()[1],
                "BBOX": MapComponent.map.getView().calculateExtent(MapComponent.map.getSize()).toString(),
                "FORMAT": "image/png",
                "CQL_FILTER": SearchComponent.cqlFilter + AnalyzerComponent.advancedCqlFilter
            }, MapComponent.OBSERVATION_LAYER);
        }
    }

    exports.loadObservationLayer = function(birdIDs) {
        if (birdIDs != null) {
            var cqlFilter = "bird_id IN (";
            $.each(birdIDs || [], function (index, id) {
                cqlFilter += id + ", ";
            });
            cqlFilter = cqlFilter.slice(0, -2).concat(")");

            SearchComponent.cqlFilter = cqlFilter;
        }

        if (SearchComponent.cqlFilter !== "") {
            if ($(".heatmap-btn-container").hasClass("activate")) {
                MapComponent.showObservationLayerHeatmap();
            } else {
                MapComponent.addNewLayer({
                    "REQUEST": "GetMap",
                    "SERVICE": "WMS",
                    "VERSION": "1.3.0",
                    "LAYERS": "slovenian-bird-map:observations",
                    "CRS": 3857,
                    "WIDTH": MapComponent.map.getSize()[0],
                    "HEIGHT": MapComponent.map.getSize()[1],
                    "BBOX": MapComponent.map.getView().calculateExtent(MapComponent.map.getSize()).toString(),
                    "FORMAT": "image/png",
                    "CQL_FILTER": SearchComponent.cqlFilter + AnalyzerComponent.advancedCqlFilter
                }, MapComponent.OBSERVATION_LAYER);
            }

            console.log(SearchComponent.cqlFilter + AnalyzerComponent.advancedCqlFilter);
        }
    }

    exports.activateAndSetDrawingOnMap = function(type) {
        MapComponent.resetDrawTools();
        MapComponent.clearDrawLayer();
        MapComponent.areaLayer.getSource().clear();
        $("#area-select").val("-1").trigger("change");
        if (type == "Circle") {
            if ($(".circle-selector-btn").hasClass("activate")) {
                $(".circle-selector-btn").removeClass("activate");
                return;
            } else {
                $(".poligon-selector-btn").removeClass("activate");
                $(".circle-selector-btn").addClass("activate");
            }
        } else if (type == "Polygon") {
            if ($(".poligon-selector-btn").hasClass("activate")) {
                $(".poligon-selector-btn").removeClass("activate");
                return;
            } else {
                $(".circle-selector-btn").removeClass("activate");
                $(".poligon-selector-btn").addClass("activate");
            }
        }
        addDrawInteraction(type);
    }

    exports.clearDrawLayer = function() {
        drawVectorSource.clear();
    }

    exports.resetDrawTools = function() {
        if (draw != null) MapComponent.map.removeInteraction(draw);
        if (snap != null) MapComponent.map.removeInteraction(snap);
    }

    exports.getWKTFromDrawVector = function () {
        if ($(".circle-selector-btn").hasClass("activate")) {
            return MapComponent.wktFormater.writeGeometry(ol.geom.Polygon.fromCircle(drawVectorSource.getFeatures()[0].getGeometry().transform('EPSG:3857', 'EPSG:4326')))
        }
        if ($(".poligon-selector-btn").hasClass("activate")) {
            return MapComponent.wktFormater.writeGeometry(drawVectorSource.getFeatures()[0].getGeometry().transform('EPSG:3857', 'EPSG:4326'));
        }
        return null;
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

    function toggleHeatmap() {
        var element = $(".heatmap-btn-container");
        if (SearchComponent.cqlFilter != "" && SearchComponent.cqlFilter != null) {
            MapComponent.removeLayer(MapComponent.OBSERVATION_LAYER);
            if (element.hasClass("activate")) {
                element.removeClass("activate");
                MapComponent.loadObservationLayer();
            } else {
                element.addClass("activate");
                MapComponent.showObservationLayerHeatmap();
            }
        }
    }

    function addDrawInteraction(type) {
        draw = new ol.interaction.Draw({
            source: drawVectorSource,
            type: type,
            stopClick: true
        });

        snap = new ol.interaction.Snap({
            source: drawVectorSource
        });

        MapComponent.map.addInteraction(draw);
        MapComponent.map.addInteraction(snap);
    }

    function initMap() {
        MapComponent.wktFormater = new ol.format.WKT()

        drawVectorSource = new ol.source.Vector();

        drawVectorSource.on("change", function() {
            if (drawVectorSource.getFeatures().length == 1) {
                MapComponent.resetDrawTools();
            }
        });

        drawVectorLayer = new ol.layer.Vector({
            source: drawVectorSource,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
                stroke: new ol.style.Stroke({
                    color: '#d91e3a',
                    width: 2,
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#d91e3a',
                    }),
                }),
            }),
            name: MapComponent.DRAW_LAYER
        });

        drawModify = new ol.interaction.Modify({
            source: drawVectorSource
        });

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
                }),
                drawVectorLayer
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

        MapComponent.areaLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#d91e3a',
                    width: 2
                })
            })
        });

        MapComponent.map.addLayer(MapComponent.newObservationMarkerLayer);

        MapComponent.map.addLayer(MapComponent.areaLayer);

        MapComponent.map.addInteraction(drawModify);

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

        $(".heatmap-btn-container").click(function () {
            toggleHeatmap();
        });

        $(".location-selector-select").change(function () {
            console.log($(".location-selector-select").val());
            if ($(".location-selector-select").val() != "-1" || $(".location-selector-select").val() != null) {
                MapComponent.centerToGeom($(".location-selector-select").val());
            }
        });

        $('.observation-info-container #zoomToBtn').click(function() {
            MapComponent.centerToGeom($(this).data("geom"));
        })

        $("#area-select").change(function () {
            MapComponent.clearDrawLayer();
            MapComponent.resetDrawTools();
            $(".draw-location-btn").removeClass("activate");
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

        $.ajax({
            url: "/area/getAll",
        }).done(function (data) {
            var dataForSelect = [];
            data.forEach(function (obj) {
                var tmpObj = {
                    id: obj.geom,
                    text: obj.name
                };
                dataForSelect.push(tmpObj);
                $(".location-selector-select").append($("<option>").val(obj.geom).text(obj.name));
            })

            $("#area-select").select2({
                data: dataForSelect
            });
        });
    }
})(MapComponent = {});
