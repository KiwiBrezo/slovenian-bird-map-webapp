(function (exports) {
    exports.init = function() {
        console.log("Main app controller init...");
        initOther();
    }

    function initOther() {
        var controllerTypes = ($("#typeOfController").data("controller") || "none").split(",");
        $.each(controllerTypes || [], function (index, val) {
            switch (val) {
                case "Map":
                    MapComponent.init();
                    break;
                case "BirdSearch":
                    BirdSearchComponent.init();
                    break;
                case "BirdInfo":
                    BirdInfoComponent.init();
                    break;
                case "Test":
                    TestComponent.init();
                    break;
                case "Main":
                    // TODO: need main controller
                    break;
                case "User":
                    UserController.init();
                    break;
                case "Admin":
                    // TODO: need admin controller
                    break;
                case "LeftMenu":
                    LeftMenuComponent.init();
                    break;
                default:
                    console.log("No controller needed");
            }
        });

        UtilsController.init();
    }
})(AppController = {})
