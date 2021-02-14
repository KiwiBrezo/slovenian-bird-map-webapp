(function (exports) {
    exports.init = function() {
        console.log("User controller init...");
        userInit();
    }

    function userInit() {
        if ($("#succMsgVal").val() != "") {
            $("#succMsg").show();
        }
        if ($("#errMsgVal").val() != "") {
            $("#errMsg").show();
        }
    }
})(UserController = {})
