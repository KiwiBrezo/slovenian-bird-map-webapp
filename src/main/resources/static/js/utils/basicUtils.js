(function (exports) {
    exports.monthNames = ['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December'];
    exports.dayNames = ['Ponedeljek', 'Torek', 'Sreda', 'Cetrtek', 'Petek', 'Sobota', 'Nedelja'];
    exports.seasonNames = ['Zima', 'Pomlad', 'Poletje', 'Jesen'];
    exports.yearNames = ['', '', '', '', '', '', '', '', '', ''];

    exports.init = function() {
        console.log("Basic utils controller init...");

        var year = new Date().getFullYear() - 9;
        for (var i = 0; i < 10; i++) {
            UtilsController.yearNames[i] = year;
            year++;
        }
    }

    exports.parseMonths = function(data) {
        var numberOfObservationsPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        $.each(data, function (index, value) {
            numberOfObservationsPerMonth[value.month-1] = value.numberOfObservations;
        });

        return numberOfObservationsPerMonth;
    }

    exports.parseYears = function(data) {
        var numberOfObservationsPerYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var currentYear = new Date().getFullYear();

        $.each(data, function (index, value) {
            numberOfObservationsPerYear[9 - (currentYear - value.yearNumber)] = value.numberOfObservations;
        });

        return numberOfObservationsPerYear;
    }

    exports.parseWeek = function(data) {
        var numberOfObservationsPerWeek = [0, 0, 0, 0, 0, 0, 0];

        $.each(data, function (index, value) {
            switch (value.dayName) {
                case "mon":
                    numberOfObservationsPerWeek[0] = value.numberOfObservations;
                    break;
                case "tue":
                    numberOfObservationsPerWeek[1] = value.numberOfObservations;
                    break;
                case "wed":
                    numberOfObservationsPerWeek[2] = value.numberOfObservations;
                    break;
                case "thu":
                    numberOfObservationsPerWeek[3] = value.numberOfObservations;
                    break;
                case "fri":
                    numberOfObservationsPerWeek[4] = value.numberOfObservations;
                    break;
                case "sat":
                    numberOfObservationsPerWeek[5] = value.numberOfObservations;
                    break;
                case "sun":
                    numberOfObservationsPerWeek[6] = value.numberOfObservations;
                    break;
                default:
                    break;
            }
        });

        return numberOfObservationsPerWeek;
    }

    exports.parseSeasons = function(data) {
        var numberOfObservationsPerSeason = [0, 0, 0, 0];

        $.each(data, function (index, value) {
            switch (value.seasonNumber) {
                case 1:
                    numberOfObservationsPerSeason[0] = value.numberOfObservations || 0;
                    break;
                case 2:
                    numberOfObservationsPerSeason[1] = value.numberOfObservations || 0;
                    break;
                case 3:
                    numberOfObservationsPerSeason[2] = value.numberOfObservations || 0;
                    break;
                case 4:
                    numberOfObservationsPerSeason[3] = value.numberOfObservations || 0;
                    break;
                default:
                    break;
            }
        });

        return numberOfObservationsPerSeason;
    }
})(UtilsController = {})