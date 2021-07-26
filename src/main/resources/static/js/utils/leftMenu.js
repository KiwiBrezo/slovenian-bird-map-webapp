(function (exports) {

    exports.init = function () {
        console.log("Left menu component init...");

        $("#LeftMenu").show();

        $("#ExpendButton").click(function () {
           var element = $(this);

           if (element.hasClass("activate")) {
               element.find("svg")
                   .removeClass("fa-chevron-left")
                   .addClass("fa-chevron-right");
               element.removeClass("activate");
               menuShrink();
           } else if (!element.hasClass("activate")) {
               element.find("svg")
                   .removeClass("fa-chevron-right")
                   .addClass("fa-chevron-left");
               element.addClass("activate");
               menuExpend();
           }
        });

        $("#MapButton").click(function () {
            window.location.href = "/map/";
        });

        $("#LibraryButton").click(function () {
            window.location.href = "/bird/";
        });

        $("#ProfileButton").click(function () {
            window.location.href = "/user/dashboard/" + $("#LeftMenu").data("userid");
        });

        $("#AdminButton").click(function () {
           window.location.href = "/map/";
        });

        $("#LogoutButton").click(function () {
           window.location.href = "/user/logout";
        });

        $("#LoginButton").click(function () {
            window.location.href = "/user/login";
        });
    }
    
    function menuExpend() {
        $('#LeftMenu').animate({
            width:'165px'
        }, 400, "swing", function () {
            $("#LeftMenu .btn-tooltip").show();
        });
    }
    
    function menuShrink() {
        $("#LeftMenu .btn-tooltip").hide();
        $('#LeftMenu').animate({
            width:'65px'
        });
    }

})(LeftMenuComponent = {})
