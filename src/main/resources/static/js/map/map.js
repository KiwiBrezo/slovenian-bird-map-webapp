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

    exports.canIdentify = true;
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
        IdentifyComponent.init();
        GeoserverUtilComponent.init();

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
        $('.observation-info-container #userData').text("Opazovalec: " + data.userName + " " + data.userSurname).click(function () {
            window.location.href = "/user/dashboard/" + data.userID;
        });
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
                url: GeoserverUtilComponent.geoserverWms,
                params: params || {}
            }),
            name: layerName
        });

        MapComponent.map.addLayer(newLayer);
    }

    exports.addNewImageLayer = function(params, layerName) {
        var newLayer = new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: GeoserverUtilComponent.geoserverWms,
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
                MapComponent.canIdentify = false;
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
                MapComponent.canIdentify = true;
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
                height: "130px"
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
                MapComponent.canIdentify = true;
            } else {
                element.addClass("activate");
                MapComponent.showObservationLayerHeatmap();
                MapComponent.canIdentify = false;
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
            } else if (MapComponent.canIdentify) {
                return;
                //TODO: identify not working rn
                MapComponent.newObservationMarkerLayer.getSource().clear();
                var coordinate = ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');

                var marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(coordinate)));
                marker.setStyle(new ol.style.Style({
                        image: new ol.style.Icon({
                            src: 'data:image/png;base64,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PEUckxWV8r15h2XOW5yVWoN17slfGCqqK1mu04wiiSWkkIYACQ1UUYOJOK0qKQYytJ9w8Q/b/jS5JHJVwcixgDoUiLYf/A9+d2uUJiecpFACCLxY1scIENwF2k3L+j62rPYJ4HsGrtSuv94CZj5Jb3a12BEwsA1cXHc1aQ+43AGGnjRRF23JR9NbKgHvZ/RNBWDwFuhfc3rr7OP0AchRV8s3wMEhMFqm7HWXd/f19vbvmU5/P5p/crcf09+JAAANGGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6R0lNUD0iaHR0cDovL3d3dy5naW1wLm9yZy94bXAvIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcE1NOkRvY3VtZW50SUQ9ImdpbXA6ZG9jaWQ6Z2ltcDpmMTVkMjhjMy1mYjhhLTRiYjMtYTQzNC05Njk5NWQ4MDUyMTAiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MWQwNGM5OTItZDE1Yi00MTY2LTk1MmMtMDFhZDlmZjBjMjQ5IgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZmM3NjNjZmUtNWE2My00ZTg4LTllYmMtNzgzNzkyZDA5YzAwIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJXaW5kb3dzIgogICBHSU1QOlRpbWVTdGFtcD0iMTYyMjIwNzEzNDQ2ODgzMCIKICAgR0lNUDpWZXJzaW9uPSIyLjEwLjI0IgogICBkYzpGb3JtYXQ9ImltYWdlL3BuZyIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1OWYxYTE5Yi04YWYwLTQwZDAtYjY0NS0zNzAzMDUyYTlmMWQiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoV2luZG93cykiCiAgICAgIHN0RXZ0OndoZW49IjIwMjEtMDUtMjhUMTU6MDU6MzQiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+OXeDCwAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+UFHA0FIvi9YTQAAAQqSURBVFjDzZhdaBxVFIC/mdn8bbMpiVKZLWKwD9LkpfhDjRlsitWHdARB9KFgi/a5tlBQsOJD89DHQuiTf/Tdl4I34F9tKrMGUTEPxiJUTAruQFvzs7vZzW529vqw02UzO7s7mZ2kHljYPefcc745d+65d69CB5I2jcMKvAaMAweBIde0DNwCUsA1XVg/hc2hhBlkm8arwEXgUMAh88BHurC+3FFA2zQGgc+pVi2MXAPe0YW1EjmgbRrDwHXgSTqTv4BjurAWIwNMm0ZSgR+BJ4hGliS8kBRWumPA9KShKSo33YXQIBtlh7VikfxmmZLjANCtacS7Yuzt6aE3pjULnQJ5RBcpp1V+te0TqJzzg6tIiZ1bZ2ktw+pGsQYHUHIcVjeKLK1lsHPrVKT0Cz0OytmOKmgfNwZQWAQG6/VORXInk90C1Up6NI3HBxJoakO6FSnlcHImlQlXQYVTXjiAdC7nhVsFpoHT7mfa1QFQdBzSuXW/DIOKopxshRBr8/BvehWZYon8ZrleNSvhjaNzC/e3KJ8fnULhC2ACIL+5SaZYYqCn2y/HlW1PsX3ciKOQ9VZ5cS1DsVyr3p8S+czRuT98yzM7NrIHlF+BpwB6YhrDewcaXmek7NdnUoXtTbHCiNderlTq4QCmmsEBTFRtU7WpLjuUK5VGBkUZCfMOPuZVlJytwSV81W6BeH28MZrlCgLY79dathS5Ullu2yYky61iuJIIA3i/YUWpHndVPRBgrzrQMkZV7oUB/Mer6NYa3N8K0AZPtokBkA7XqE1j2dsH09l1sqXSg595YHxibmHefxWPHnLPhHGARHc3ycSehmatC2so7Fb3tVcx1Ndb/zMO3JgdGz0xOzZae9jvDx9UZsdGTwA3HsD5jG2aYzsVfBn4puHlLGzwb77gN02/ud+fBvR646PxPh7xB3xFF9a3oU8ztmn8DDzr1d/NF1gpbATaiwf7etkX7/Mz/aIL67mOTjPAu9V2tlX2xfvYn+inS2seoktT2Z/obwYngTORHFht07gKnGpmz2+WKZTLtV1CU1XisRjxrpZb/VVdWG+3yx0LAiiRHygor/s1b4B4V1sYr+SQXAjiGGSKSYpUGrhEdHJJn2l/3A8M6NbxMrAYAdzfUsrLQZ0DA+oiVQDeiwDw/WSTo1Ukf9xt07gJvBgS7gddWEe2M0ANkeSsX9sJtNaqY9lRQF1Y88BnIQA/dcey0xUEuABkt+GfccewK4C6sO66l0dBZUoX1r1dA3Sb9zRwO4DrbSnldNg8oQGTIlUCzgdwPZ+cSZV29X7Q03a+A15qYr6uC+tYJ/FVOpdzgN8diBOmrUQOqAvrd+ATH9PHurAWHjpgXdupvzVdAT6MInAkgLqwlj1t56Kr4/9SQZBcoXqzf0tWml8GPVSxTWPSNo3JKGP+B8b8ax7S335ZAAAAAElFTkSuQmCC',
                            anchor: [0.5, 1]
                        })
                    })
                );
                MapComponent.newObservationMarkerLayer.getSource().addFeature(marker);

                IdentifyComponent.identifyOnLocation({
                    left: e.pixel_[0],
                    top: e.pixel_[1]
                }, SearchComponent.cqlFilter);

                /*IdentifyComponent.identifyOnLocation({
                    lon: coordinate[0],
                    lat: coordinate[1]
                }, SearchComponent.cqlFilter);*/
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
            url: "/api/bird/getAll",
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
            url: "/api/area/getAll",
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
