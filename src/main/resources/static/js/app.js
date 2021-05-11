(function (exports) {
    exports.init = function() {
        console.log("Main app controller init...");
        initOther();
    }

    function initOther() {
        MapComponent.init();
        TestComponent.init();
        UserController.init();
        BirdInfoComponent.init();
        BirdSearchComponent.init();
    }
})(AppController = {})
