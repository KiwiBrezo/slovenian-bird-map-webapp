(function (exports) {

    exports.advancedCqlFilter = "";


    exports.init = function () {
        console.log("Analyzer component init...");
    }

    exports.useAnalyzeFilter = function () {
        AnalyzerComponent.advancedCqlFilter = "";

        if ($("#analyzeFromDate").val() != "") {
            AnalyzerComponent.advancedCqlFilter += " and date > '" + $("#analyzeFromDate").val() + "T00:00:00Z'";
        }

        if ($("#analyzeToDate").val() != "") {
            AnalyzerComponent.advancedCqlFilter += " and date < '" + $("#analyzeToDate").val() + "T00:00:00Z'";
        }

        MapComponent.removeLayer(MapComponent.OBSERVATION_LAYER);
        MapComponent.loadObservationLayer();
    }


})(AnalyzerComponent = {});
