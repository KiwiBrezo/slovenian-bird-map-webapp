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
        if ($("#bird-select-new-observation").find(":selected").val() < 0) {
            return;
        }
        if ($(".user-container").data("userid") == null || $(".user-container").data("userid") == undefined) {
            return;
        }
        if($("#new-observation-date").val() == null || $("#new-observation-date").val() == undefined) {
            return;
        }
        if(exports.selectedLocation == null) {
            return;
        }
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
            console.log(response);
            resetValues();
        });
    }

    function resetValues() {
        exports.selectedLocation = null;
        $("#new-observation-comment").val(null);
        $("#new-observation-date").val(null);
        $("#bird-select-new-observation").val(-1).trigger("change");
    }


})(NewObservationComponent = {});
