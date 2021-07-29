(function (exports) {
    var userProfileId = null;
    var weeklyGraphUser = null;
    var monthlyGraphUser = null;

    exports.init = function() {
        console.log("User controller init...");
        userInit();

        $(window).on("load", (function () {
            if($(".main-user-info-container").is(":visible")) {
                userProfileId = $(".main-user-info-container").data("userid");
                weeklyGraphUser = document.getElementById('WeeklyObservationsUser').getContext('2d');
                monthlyGraphUser = document.getElementById('MonthlyObservationsUser').getContext('2d');

                showAnalyticData();
            }
        }));
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
            createWeeklyObservationGraphForUser(data);
        });

        $.ajax({
            url: "/api/analysis/user/getNumberOfObservationsMonthly",
            data: {
                "userID": userProfileId
            }
        }).done(function (data) {
            createMonthlyObservationGraphForUser(data);
        });

        $.ajax({
            url: "/api/analysis/user/getLastObservations",
            data: {
                "userID": userProfileId
            }
        }).done(function (data) {
            var rootElem = $("#ListContainer");

            $.each(data || [], function (index, dataRow) {
               var elem = $("<div>").addClass("row last-observation-row-element mb-2");
               elem.append($("<div>").addClass("col-2").append($("<span>").text(dataRow.birdName)));
               elem.append($("<div>").addClass("col-4").append($("<span>").text(dataRow.comment)));
               elem.append($("<div>").addClass("col-3").append($("<span>").text(dataRow.col)));
               elem.append($("<div>").addClass("col-3").append($("<span>").text(new Date(dataRow.date).toISOString().split('T')[0])));
                rootElem.append(elem);
            });
        });
    }

    function createMonthlyObservationGraphForUser(data) {
        var dataset = UtilsController.parseMonths(data);

        var graph = new Chart(monthlyGraphUser, {
            type: 'line',
            data: {
                labels: UtilsController.monthNames,
                datasets: [{
                    label: 'Stevilo opazovanj',
                    data: dataset,
                    borderColor: 'rgba(101, 114, 74, 1)'
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Prikaz stevila mesecnih opazovanj',
                        font: {
                            size: 18
                        },
                        align: 'start',
                        padding: {
                            top: 10,
                            bottom: 35
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function createWeeklyObservationGraphForUser(data) {
        var dataset = UtilsController.parseWeek(data);

        var graph = new Chart(weeklyGraphUser, {
            type: 'bar',
            data: {
                labels: UtilsController.dayNames,
                datasets: [{
                    label: 'Stevilo opazovanj',
                    data: dataset,
                    backgroundColor: 'rgba(101, 114, 74, 0.2)',
                    borderColor: 'rgba(101, 114, 74, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Prikaz stevila tedenskih opazovanj',
                        font: {
                            size: 18
                        },
                        align: 'start',
                        padding: {
                            top: 10,
                            bottom: 35
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
})(UserController = {})
