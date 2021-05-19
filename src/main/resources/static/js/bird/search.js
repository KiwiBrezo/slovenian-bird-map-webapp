(function (exports) {
    const DEFAULT_LIMIT = 10;
    const DEFAULT_OFFSET = 0;

    var currentLimit;
    var currentOffset;

    exports.init = function () {
        console.log("Bird search component init...");

        currentLimit = DEFAULT_LIMIT;
        currentOffset = DEFAULT_OFFSET;
        disableLoadMore();
    }

    exports.loadSomeBirds = function() {
        $.ajax({
            url: "/bird/getSome",
            data: {
                "limit": currentLimit,
                "offset": currentOffset
            }
        }).done(function (data) {
            appendResults(data);
        });
    }

    exports.loadSearchedBirds = function () {
        $.post({
            url: "/bird/library/search",
            data: {
                "term": $("#librarySearchInput").val() || "",
                "limit": currentLimit,
                "offset": currentOffset
            }
        }).done(function (data) {
            appendResults(data);
        });
    }

    exports.searchBirds = function() {
        currentLimit = DEFAULT_LIMIT;
        currentOffset = DEFAULT_OFFSET;
        $(".search-results-container").empty();
        BirdSearchComponent.loadSearchedBirds();
    }

    exports.loadMoreResults = function () {
        currentOffset += currentLimit;
        if ($("#librarySearchInput").val() != "") {
            BirdSearchComponent.loadSearchedBirds();
        } else {
            BirdSearchComponent.loadSomeBirds();
        }
    }

    function appendResults(jsonObj) {
        $.each(jsonObj || [], function (index, item) {
            var element = $("<div>")
                .addClass("bird-result-container")
                .append($("<div>")
                    .addClass("row")
                    .append($("<div>")
                        .addClass("col-8 bird-name-field")
                        .append($("<a href='/bird/" + item.birdID + "'>")
                            .addClass("bird-name")
                            .text(item.name))
                        .append("<br>")
                        .append($("<span>")
                            .text(item.nameLat)))
                    .append($("<div>")
                        .addClass("col-4 bird-photo-field")
                        .append($("<img src='" + item.imageLink + "' alt='Ni fotografije...'>"))));

            $(".search-results-container").append(element);
        });

        if (jsonObj.length == 0) {
            $(".load-more-bird-results").hide();
        } else {
            disableLoadMore();
        }
    }

    function disableLoadMore() {
        var numberOfResults = $(".search-results-container").children().length;
        if (numberOfResults == 0) {
            $(".search-results-container")
                .append($("<p>")
                    .text("Ni podatkov"));
        }
        if (numberOfResults % DEFAULT_LIMIT != 0 || numberOfResults < DEFAULT_LIMIT) {
            $(".load-more-bird-results").hide();
            return;
        }
        $(".load-more-bird-results").show();
    }

})(BirdSearchComponent = {});
