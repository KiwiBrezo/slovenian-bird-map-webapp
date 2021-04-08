(function (exports) {

    exports.cqlFilter = "";


    exports.init = function () {
        console.log("Search component init...");
    }

    exports.searchObservations = function() {
        if ($("#search-observation-input").val() == null || $("#search-observation-input").val() == "") {
            return;
        }

        MapComponent.removeLayer(MapComponent.OBSERVATION_LAYER);
        SearchComponent.cqlFilter = "";

        $.ajax({
            url: "/api/searchObservationDistinctBirdIDs",
            method: "get",
            data: {
                term: $("#search-observation-input").val()
            }
        }).done(function (response) {
            if (response != null && response.length > 0) {
                loadObservationLayer(response);
            }
        });

        $.ajax({
            url: "/api/searchObservation",
            method: "get",
            data: {
                term: $("#search-observation-input").val()
            }
        }).done(function (response) {
            $(".search-result-container .container-body").empty();
            if ((response.length || []) > 0) {
                $.each(response || [], function (index, observation) {
                    var rowElement = $("<div>").addClass("result-info-container").append($("<div>")
                            .addClass("row first-row"))
                        .append($("<div>")
                            .addClass("row second-row"))

                    rowElement.find(".first-row").append($("<p>")
                        .addClass("col-8 mx-1 bird-name-container")
                        .text(observation.birdName));

                    rowElement.find(".second-row").append($("<p>")
                        .addClass("col-8 mx-1 observer-name-container")
                        .text("Opazovalec: " + observation.userName + " " + observation.userSurname));

                    rowElement.find(".first-row").append($("<div>")
                        .addClass("col-3")
                        .css("text-align", "end")
                        .append($("<i>")
                            .addClass("fas fa-map-marked-alt cursor-pointer")));

                    rowElement.find(".second-row").append($("<div>")
                        .addClass("col-3")
                        .css("text-align", "end")
                        .append($("<i>")
                            .addClass("fas fa-info-circle cursor-pointer"))
                        .click(MapComponent.showObservationInfo));

                    $(".search-result-container .container-body").append(rowElement);
                })
            } else {
                $(".search-result-container .container-body").append($("<p>").text("Ni bil najden noben zadetek!"));
            }
            $(".search-result-container").show();
        });
    }

    function loadObservationLayer(birdIDs) {
        var cqlFilter = "";
        $.each(birdIDs || [], function (index, id) {
            cqlFilter += "bird_id=" + id + " or ";
        });
        cqlFilter = cqlFilter.slice(0, -4);

        SearchComponent.cqlFilter = cqlFilter;

        if (cqlFilter !== "") {
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
                "CQL_FILTER": cqlFilter
            }, MapComponent.OBSERVATION_LAYER);
        }
    }

})(SearchComponent = {});
