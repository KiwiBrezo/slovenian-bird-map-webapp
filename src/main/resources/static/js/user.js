(function (exports) {
    exports.init = function() {
        console.log("User controller init...");
        userInit();
    }

    exports.deleteUsersObservation = function () {
        if ($("#ResetObservationPassw").val() == "") {
            showResetObservationInput();
        } else {
            //TODO
        }
    }

    function showResetObservationInput() {
        $("#ResetObservationPassw").show();
        $("#ResetObservationPassw").val(null);
    }

    function userInit() {
        if ($("#succMsgVal").text() != "") {
            $("#succMsg").show();
        }
        if ($("#errMsgVal").text() != "") {
            $("#errMsg").show();
        }

        $('#loginForm').submit(function() {
            $("#loginPasswordInput").val(sha512($("#loginPasswordInput").text()));
            return true;
        });

        $('#registerForm').submit(function() {
            $("#registerPasswordInput").val(sha512($("#loginPasswordInput").text()));
            return true;
        });
    }
})(UserController = {})
