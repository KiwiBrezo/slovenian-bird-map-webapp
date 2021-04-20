(function (exports) {

    exports.ERROR = "err";
    exports.SUCCESS = "success";
    exports.PRIMARY = "primary";

    exports.init = function () {
        console.log("Notification component init...");

    }

    exports.closeNotificationWindow = function () {
        $(".notification-container").hide();
        $(".notification-container .container-body").empty();
    }

    exports.showNotification = function(msg, status) {
        if ($(".notification-container").is(":visible")) {
            return;
        }

        var msgContainer = $('<h4>').text(msg);
        if (status == NotificationComponent.ERROR) {
            $(".notification-container .fa-exclamation-circle").css("color", "#b32138");
        } else if (status == NotificationComponent.SUCCESS) {
            $(".notification-container .fa-exclamation-circle").css("color", "#28a745");
        } else if (status == NotificationComponent.PRIMARY) {
            $(".notification-container .fa-exclamation-circle").css("color", "#007bff");
        }

        $(".notification-container .container-body").append(msgContainer);

        $(".notification-container").show();

        setTimeout(function () {
            $(".notification-container").fadeOut(4000, function () {
                $(".notification-container .container-body").empty();
            });
        }, 3000);
    }

})(NotificationComponent = {});
