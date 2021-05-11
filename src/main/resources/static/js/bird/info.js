(function (exports) {
    exports.init = function () {
        console.log("Bird info component init...");
    }

    exports.showInfoForBird = function(birdID) {
        window.location.href = "/bird/" + birdID;
    }

})(BirdInfoComponent = {});
