(function (exports) {
    var currentBirdId = null;

    exports.init = function () {
        console.log("Bird info component init...");

        currentBirdId = $(".main-bird-info-container").data("birdid");

        showAnalyticData();
    }

    exports.showInfoForBird = function(birdID) {
        window.location.href = "/bird/" + birdID;
    }

    function showAnalyticData() {
        $.ajax({
            url: "/api/analysis/bird/getNumberOfObservedBirdType",
            data: {
                "birdID": currentBirdId
            }
        }).done(function (data) {
            console.log(data);
        });

        $.ajax({
            url: "/api/analysis/bird/getNumberOfObserversForBird",
            data: {
                "birdID": currentBirdId
            }
        }).done(function (data) {
            console.log(data);
        });

        $.ajax({
            url: "/api/analysis/bird/getNumberOfObservationsMonthly",
            data: {
                "birdID": currentBirdId
            }
        }).done(function (data) {
            console.log(data);
        });

        $.ajax({
            url: "/api/analysis/bird/getNumberOfObservationsYearly",
            data: {
                "birdID": currentBirdId
            }
        }).done(function (data) {
            console.log(data);
        });

        $.ajax({
            url: "/api/analysis/bird/getNumberOfObservationsSeason",
            data: {
                "birdID": currentBirdId
            }
        }).done(function (data) {
            console.log(data);
        });
    }

})(BirdInfoComponent = {});
