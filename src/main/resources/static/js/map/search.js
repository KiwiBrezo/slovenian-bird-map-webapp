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
            console.log(response);
            $(".search-result-container .container-body").empty();
            $.each(response || [], function (index, observation) {
                var rowElement = $("<div>")

                rowElement.append($("<p>").text(observation.birdName));

                $(".search-result-container .container-body").append(rowElement);
            })
            if (response != null) {
                $(".search-result-container").show();
            }
        });
    }


})(SearchComponent = {});
