(function (exports) {
    var currentBirdId = null;
    var seasonGraphBird = null;
    var monthlyGraphBird = null;
    var yearlyGraphBird = null;

    exports.init = function () {
        console.log("Bird info component init...");

        currentBirdId = $(".main-bird-info-container").data("birdid");
        seasonGraphBird = document.getElementById('SeasonObservationsBird').getContext('2d');
        monthlyGraphBird = document.getElementById('MonthlyObservationsBird').getContext('2d');
        yearlyGraphBird = document.getElementById('YearlyObservationsBird').getContext('2d');

        showAnalyticData();
    }

    exports.showInfoForBird = function(birdID) {
        window.location.href = "/bird/" + birdID;
    }

    function showAnalyticData() {
        $.ajax({
            url: "/api/analysis/bird/getNumberOfObservedBirdType",
            data: {
                "birdID": currentBirdId
            }
        }).done(function (data) {
            $("#NumberOfObservedType").val(data || 0);
        });

        $.ajax({
            url: "/api/analysis/bird/getNumberOfObserversForBird",
            data: {
                "birdID": currentBirdId
            }
        }).done(function (data) {
            $("#NumberOfObservers").val(data || 0);
        });

        $.ajax({
            url: "/api/analysis/bird/getNumberOfObservationsMonthly",
            data: {
                "birdID": currentBirdId
            }
        }).done(function (data) {
            createMonthlyObservationGraphForBird(data);
        });

        $.ajax({
            url: "/api/analysis/bird/getNumberOfObservationsYearly",
            data: {
                "birdID": currentBirdId
            }
        }).done(function (data) {
            createYearlyObservationGraphForBird(data);
        });

        $.ajax({
            url: "/api/analysis/bird/getNumberOfObservationsSeason",
            data: {
                "birdID": currentBirdId
            }
        }).done(function (data) {
            createSeasonObservationGraphForBird(data);
        });
    }

    function createMonthlyObservationGraphForBird(data) {
        var dataset = UtilsController.parseMonths(data);

        var graph = new Chart(monthlyGraphBird, {
            type: 'line',
            data: {
                labels: UtilsController.monthNames,
                datasets: [{
                    label: 'Stevilo opazovanih osebkov',
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
                        text: 'Prikaz stevila opazenih osebkov po mesecih',
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

    function createSeasonObservationGraphForBird(data) {
        var dataset = UtilsController.parseSeasons(data);

        var graph = new Chart(seasonGraphBird, {
            type: 'doughnut',
            data: {
                labels: UtilsController.seasonNames,
                datasets: [{
                    label: 'Stevilo opazovanih osebkov',
                    data: dataset,
                    backgroundColor: [
                        'rgb(52, 164, 235)',
                        'rgb(52, 235, 122)',
                        'rgb(235, 211, 52)',
                        'rgb(230, 96, 18)'
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'right'
                    },
                    title: {
                        display: true,
                        text: 'Prikaz stevila opazenih osebkov po letnih casih',
                        font: {
                            size: 18
                        },
                        padding: {
                            bottom: 30
                        }
                    }
                }
            }
        });
    }

    function createYearlyObservationGraphForBird(data) {
        var dataset = UtilsController.parseYears(data);

        var graph = new Chart(yearlyGraphBird, {
            type: 'bar',
            data: {
                labels: UtilsController.yearNames,
                datasets: [{
                    label: 'Stevilo opazovanih osebkov',
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
                        text: 'Prikaz stevila opazenih osebkov zadnjih 10 let',
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

})(BirdInfoComponent = {});
