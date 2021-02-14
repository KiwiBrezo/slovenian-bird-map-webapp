(function (exports) {
    exports.init = function() {
        console.log("User controller init...");
        userInit();
    }

    function userInit() {
        if ($("#succMsgVal").val() != undefined) {
            $("#succMsg").show();
        }
        if ($("#errMsgVal").val() != undefined) {
            $("#errMsg").show();
        }
    }
})(UserController = {})
