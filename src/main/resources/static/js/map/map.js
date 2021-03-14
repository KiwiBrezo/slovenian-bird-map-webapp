(function (exports) {
    var mapStartZoom = 8.85;
    var mapMinZoom = 8.5;
    var mapMaxZoom = 21;
    var mapSLOCenterCoordinateLon = 15.005333; // center of slo [14.815333, 46.119944]
    var mapSLOCenterCoordinateLat = 46.119944;

    var mousePositionControl;

    exports.map = null;

    exports.init = function () {
        console.log("Map component init...");
        initMap();
    }

    exports.closeSearchResults = function() {
        $('.search-result-container').hide();
        $('.search-result-container .container-body').empty();
    }

    function toggleUserMenu() {
        var element = $(".user-menu-btn");
        if (element.hasClass("fa-caret-down")) {
            element.removeClass("fa-caret-down");
            element.addClass("fa-caret-up");
            $(".user-container").animate({
                height: "155px"
            }, 300, function () {
                $(".user-container-body").show();
            });
        } else if (element.hasClass("fa-caret-up")) {
            element.removeClass("fa-caret-up");
            element.addClass("fa-caret-down");
            $(".user-container-body").hide();
            $(".user-container").animate({
                height: "45px"
            }, 300, function () { });
        }
    }

    function toggleToolsMenu() {
        var element = $(".tool-btn-container");
        if (element.hasClass("activate")) {
            element.removeClass("activate");
            $(".tool-container").hide();
        } else {
            element.addClass("activate");
            $(".tool-container").show();
        }
    }

    function initMap() {
        mousePositionControl = new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(6),
            projection: 'EPSG:4326',
            className: 'custom-mouse-position',
            target: document.getElementById('mouse-position'),
            undefinedHTML: '---------, ---------',
        });

        MapComponent.map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([mapSLOCenterCoordinateLon, mapSLOCenterCoordinateLat]),
                zoom: mapStartZoom,
                minZoom: mapMinZoom,
                maxZoom: mapMaxZoom
            }),
            controls: ol.control.defaults().extend([mousePositionControl])
        });

        $(".ol-attribution").hide();

        $(".user-container .float-right").click(function() {
            toggleUserMenu();
        });

        $(".tool-container").draggable({
            containment: $("#map"),
            handle: $(".tool-container .drag-handle")
        });

        $(".tool-btn-container").click(function () {
            toggleToolsMenu();
        });

        $.ajax({
            url: "/bird/getAll",
        }).done(function (data) {
            var dataForSelect = [];
            data.forEach(function (obj) {
                var tmpObj = {
                    id: obj.birdID,
                    text: obj.name
                };
                dataForSelect.push(tmpObj);
            })

            $("#bird-select").select2({
                data: dataForSelect
            });
        })

        $("#area-select").select2({
            data: [{
                id: 0,
                text: "lalala"
            }, {
                id: 1,
                text: "Muh muh"
            }]
        });
    }
})(MapComponent = {});
