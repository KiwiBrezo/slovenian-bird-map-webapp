(function (exports) {
    const DEFAULT_LIMIT = 20;
    const DEFAULT_OFFSET = 0;

    var currentLimit = DEFAULT_LIMIT;
    var currentOffset = DEFAULT_OFFSET;
    var currentTerm = null;

    exports.cqlFilter = "";

    exports.init = function () {
        console.log("Search component init...");

        $('#search-observation-input').keypress(function (e) {
            if (e.which == 13) {
                $(this).parent().find("button").trigger("click");
            }
        });
    }

    exports.searchObservations = function() {
        if ($("#search-observation-input").val() == null || $("#search-observation-input").val() == "") {
            return;
        }

        currentTerm = $("#search-observation-input").val();
        currentOffset = DEFAULT_OFFSET;

        MapComponent.removeLayer(MapComponent.OBSERVATION_LAYER);
        SearchComponent.cqlFilter = "";

        $.ajax({
            url: "/api/observation/searchObservationDistinctBirdIDs",
            method: "get",
            data: {
                term: currentTerm
            }
        }).done(function (response) {
            if (response != null && response.length > 0) {
                MapComponent.loadObservationLayer(response);
            }
        });

        $.ajax({
            url: "/api/observation/searchObservation",
            method: "get",
            data: {
                term: currentTerm,
                limit: currentLimit,
                offset: currentOffset
            }
        }).done(function (response) {
            $(".search-result-container .container-body").empty();
            loadDataInResultContainer(response);
            $(".search-result-container").show();
        });
    }

    exports.fetchMoreObservation = function () {
        $("#loadMoreResults").remove();
        currentOffset += DEFAULT_LIMIT;
        $.ajax({
            url: "/api/observation/searchObservation",
            method: "get",
            data: {
                term: currentTerm,
                limit: currentLimit,
                offset: currentOffset
            }
        }).done(function (response) {
            loadDataInResultContainer(response);
            canLoadMore = true;
        });
    }

    function loadDataInResultContainer(response) {
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
                    .addClass("col-8 mx-1 observer-name-container cursor-pointer")
                    .text("Opazovalec: " + observation.userName + " " + observation.userSurname)
                    .click(function () {
                        window.location.href = "/user/dashboard/" + observation.userID;
                    }));

                rowElement.find(".first-row").append($("<div>")
                    .addClass("col-3")
                    .css("text-align", "end")
                    .append($("<i>")
                        .addClass("fas fa-map-marked-alt cursor-pointer"))
                    .click(function () {
                        MapComponent.centerToGeom(observation.geom);
                    }));

                rowElement.find(".second-row").append($("<div>")
                    .addClass("col-3")
                    .css("text-align", "end")
                    .append($("<i>")
                        .addClass("fas fa-info-circle cursor-pointer"))
                    .click(function() {
                        MapComponent.showObservationInfo(observation)
                    }));

                $(".search-result-container .container-body").append(rowElement);
            })
            if (response.length == currentLimit) {
                $(".search-result-container .container-body").append($('<div class="row">')
                    .append($('<button id="loadMoreResults" class="btn btn-primary load-more-results">Naloži več</button>')
                        .click(SearchComponent.fetchMoreObservation)));
            }
        } else {
            $(".search-result-container .container-body").append($("<p>").text("Ni bil najden noben zadetek!"));
        }
    }

})(SearchComponent = {});
