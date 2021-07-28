(function (exports) {
    var userProfileId = null;

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

        if($(".main-user-info-container").is(":visible")) {
            userProfileId = $(".main-user-info-container").data("userid");
            showAnalyticData();
        }
    }

    function showAnalyticData() {
        $.ajax({
            url: "/api/analysis/user/getNumberOfObservations",
            data: {
                "userID": userProfileId
            }
        }).done(function (data) {
            $("#AllObservations").val(data.allTimeObservation);
            $("#YearObservations").val(data.thisYearObservation);
        });

        $.ajax({
            url: "/api/analysis/user/getNumberOfObservationsWeekly",
            data: {
                "userID": userProfileId
            }
        }).done(function (data) {
            console.log(data);
        });

        $.ajax({
            url: "/api/analysis/user/getNumberOfObservationsMonthly",
            data: {
                "userID": userProfileId
            }
        }).done(function (data) {
            console.log(data);
        });

        $.ajax({
            url: "/api/analysis/user/getLastObservations",
            data: {
                "userID": userProfileId
            }
        }).done(function (data) {
            console.log(data);
        });
    }
})(UserController = {})
