(function (exports) {
    exports.init = function() {
        console.log("User controller init...");
        userInit();
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
