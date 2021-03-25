(function (exports) {


    exports.init = function () {
        console.log("Search component init...");
    }

    exports.searchObservations = function() {
        if ($("#search-observation-input").val() == null || $("#search-observation-input").val() == "") {
            return;
        }

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
                            .addClass("fas fa-info-circle cursor-pointer")));

                    $(".search-result-container .container-body").append(rowElement);
                })
            } else {
                $(".search-result-container .container-body").append($("<p>").text("Ni bil najden noben zadetek!"));
            }
            $(".search-result-container").show();
        });
    }


})(SearchComponent = {});
