(function (exports) {
    var SPRING_TIME = " and date > ':year-03-21T00:00:00Z' and date < ':year-06-20T00:00:00Z'";
    var SUMMER_TIME = " and date > ':year-06-21T00:00:00Z' and date < ':year-09-20T00:00:00Z'";
    var AUTUMN_TIME = " and date > ':year-09-21T00:00:00Z' and date < ':year-12-20T00:00:00Z'";
    var WINTER_TIME = " and date > ':year-12-21T00:00:00Z' and date < ':year-03-20T00:00:00Z'";

    var currentYear;
    var selectFromSeason;

    exports.advancedCqlFilter = "";


    exports.init = function () {
        console.log("Analyzer component init...");

        currentYear = new Date().getFullYear();
        selectFromSeason = false;

        $(".season-btn").click(activateSeasonTimeBtn);
    }

    exports.useAnalyzeFilter = function () {
        AnalyzerComponent.advancedCqlFilter = "";

        handleTimeSelection();
        handleSelectedLocation();
        handleAreaSelect();

        MapComponent.removeLayer(MapComponent.OBSERVATION_LAYER);
        MapComponent.loadObservationLayer();
    }

    exports.resetAnalyzeFilter = function () {
        $("#analyzeFromDate").val("").trigger("change");
        $("#analyzeToDate").val("").trigger("change");
        $("#area-select").val("-1").trigger("change");
        $(".season-btn").removeClass("activate");
        $(".draw-location-btn").removeClass("activate");

        if ($("#analyzeFromDate").hasClass("col-12")) {
            $("#analyzeFromDate").removeClass("col-12");
            $("#analyzeFromDate").addClass("col-6");
            $("#analyzeToDate").show();
        }

        AnalyzerComponent.advancedCqlFilter = "";
        MapComponent.clearDrawLayer();
        MapComponent.resetDrawTools();
        MapComponent.removeLayer(MapComponent.OBSERVATION_LAYER);
        MapComponent.loadObservationLayer();
    }

    function activateSeasonTimeBtn() {
        var element = $(this);
        if (element.hasClass("activate")) {
            element.removeClass("activate");
            selectFromSeason = false;
            $("#analyzeFromDate").removeClass("col-12");
            $("#analyzeFromDate").addClass("col-6");
            $("#analyzeToDate").show();
        } else {
            $(".season-btn").removeClass("activate");
            element.addClass("activate");
            selectFromSeason = true;
            $("#analyzeToDate").hide();
            $("#analyzeFromDate").removeClass("col-6");
            $("#analyzeFromDate").addClass("col-12");

        }
    }

    function handleTimeSelection() {
        if (selectFromSeason) {
            var selectedYear = currentYear;

            if ($("#analyzeFromDate").val() != "") {
                selectedYear = parseInt($("#analyzeFromDate").val().substring(0, 4));
            }

            if ($("#springSeasonBtn").hasClass("activate")) {
                AnalyzerComponent.advancedCqlFilter += SPRING_TIME.replaceAll(":year", selectedYear);
            }

            if ($("#summerSeasonBtn").hasClass("activate")) {
                AnalyzerComponent.advancedCqlFilter += SUMMER_TIME.replaceAll(":year", selectedYear);
            }

            if ($("#autumnSeasonBtn").hasClass("activate")) {
                AnalyzerComponent.advancedCqlFilter += AUTUMN_TIME.replaceAll(":year", selectedYear);
            }

            if ($("#winterSeasonBtn").hasClass("activate")) {
                AnalyzerComponent.advancedCqlFilter += WINTER_TIME.replace(":year", selectedYear - 1).replace(":year", selectedYear);
            }
        } else {
            if ($("#analyzeFromDate").val() != "") {
                AnalyzerComponent.advancedCqlFilter += " and date > '" + $("#analyzeFromDate").val() + "T00:00:00Z'";
            }

            if ($("#analyzeToDate").val() != "") {
                AnalyzerComponent.advancedCqlFilter += " and date < '" + $("#analyzeToDate").val() + "T00:00:00Z'";
            }
        }
    }

    function handleSelectedLocation() {
        var wkt = MapComponent.getWKTFromDrawVector();
        if (wkt != null) {
            AnalyzerComponent.advancedCqlFilter += " and INTERSECTS(geom, " + wkt + ")";
        }
    }

    // TODO fix this ... naj se doda na draw layer al nekam
    function handleAreaSelect() {
        var areaWkt = $("#area-select").val();
        if (areaWkt != "-1" || areaWkt != null) {
            AnalyzerComponent.advancedCqlFilter += " and INTERSECTS(geom, " + areaWkt + ")";

            var feature = new ol.Feature({
                geometry: MapComponent.wktFormater.readFeature(areaWkt).getGeometry().transform('EPSG:4326', 'EPSG:3857')
            })

            MapComponent.newObservationMarkerLayer.getSource().addFeature(feature);
        }
    }

})(AnalyzerComponent = {});
