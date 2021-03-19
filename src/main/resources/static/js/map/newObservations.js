(function (exports) {
    exports.canSelectLocation = false;
    exports.selectedLocation = null;


    exports.init = function () {
        console.log("New observation component init...");
        exports.canSelectLocation = false;
    }

    exports.toggleLocationSelector = function () {
        if ($("#add-observation-location-selector").hasClass("activate")) {
            $("#add-observation-location-selector").removeClass("activate");
            exports.canSelectLocation = false;
        } else {
            $("#add-observation-location-selector").addClass("activate");
            exports.canSelectLocation = true;
        }
    }

    exports.addNewObservation = function () {
        $.ajax({
            url: "/api/addObservation",
            method: "post",
            data: {
                birdID: $("#bird-select-new-observation").find(":selected").val(),
                userID: $(".user-container").data("userid"),
                comment: $("#new-observation-comment").val(),
                lon: exports.selectedLocation.lon,
                lat: exports.selectedLocation.lat,
                date: $("#new-observation-date").val()
            }
        }).done(function (response) {
            console.log(response)
        })
    }


})(NewObservationComponent = {});
