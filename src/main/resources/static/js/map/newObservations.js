(function (exports) {
    exports.canSelectLocation = false;
    exports.selectedLocation = null;


    exports.init = function () {
        console.log("New observation component init...");
        exports.canSelectLocation = false;
    }

    exports.toggleLocationSelector = function () {
        MapComponent.newObservationMarkerLayer.getSource().clear();
        if ($("#add-observation-location-selector").hasClass("activate")) {
            $("#add-observation-location-selector").removeClass("activate");
            exports.canSelectLocation = false;
            MapComponent.canIdentify = true;
        } else {
            $("#add-observation-location-selector").addClass("activate");
            exports.canSelectLocation = true;
            MapComponent.canIdentify = false;
        }
    }

    exports.addNewObservation = function () {
        if ($("#bird-select-new-observation").find(":selected").val() < 0) {
            NotificationComponent.showNotification("Ni izbrana opazovana ptica!", NotificationComponent.ERROR);
            return;
        }
        if ($(".user-container").data("userid") == null || $(".user-container").data("userid") == undefined) {
            NotificationComponent.showNotification("Neznan uporabnik!", NotificationComponent.ERROR);
            return;
        }
        if($("#new-observation-date").val() == null || $("#new-observation-date").val() == "") {
            NotificationComponent.showNotification("Ni podan datum opazovanja!", NotificationComponent.ERROR);
            return;
        }
        if ($("#observation-number").val() == null || $("#observation-number").val() <= 0) {
            NotificationComponent.showNotification("Nepravilna kolicina opazovanih osebkov!", NotificationComponent.ERROR);
            return;
        }
        if(exports.selectedLocation == null) {
            NotificationComponent.showNotification("Ni izbarana lokacija opazovanja!", NotificationComponent.ERROR);
            return;
        }
        $.ajax({
            url: "/api/observation/addObservation",
            method: "post",
            data: {
                birdID: $("#bird-select-new-observation").find(":selected").val(),
                userID: $(".user-container").data("userid"),
                comment: $("#new-observation-comment").val(),
                lon: exports.selectedLocation.lon,
                lat: exports.selectedLocation.lat,
                date: $("#new-observation-date").val(),
                col: $("#observation-number").val()
            }
        }).done(function (response) {
            console.log(response);
            if (response != "OK") {
                NotificationComponent.showNotification("Pri dodajanju opazovanja je prišlo do napake!", NotificationComponent.ERROR);
                return;
            }

            resetValues();
            NotificationComponent.showNotification("Uspešno dodano opazovanje!", NotificationComponent.SUCCESS);
        });
    }

    function resetValues() {
        exports.selectedLocation = null;
        $("#new-observation-comment").val(null);
        $("#new-observation-date").val(null);
        $("#bird-select-new-observation").val(-1).trigger("change");
        $("#observation-number").val(1);
        MapComponent.newObservationMarkerLayer.getSource().clear();
        MapComponent.canIdentify = true;
    }


})(NewObservationComponent = {});
