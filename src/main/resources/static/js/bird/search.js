(function (exports) {
    const DEFAULT_LIMIT = 10;
    const DEFAULT_OFFSET = 0;

    var currentLimit;
    var currentOffset;

    exports.init = function () {
        console.log("Bird search component init...");

        currentLimit = DEFAULT_LIMIT;
        currentOffset = DEFAULT_OFFSET;
    }

    exports.loadSomeBirds = function() {
        $.ajax({
            url: "/bird/getSome",
            data: {
                "limit": currentLimit,
                "offset": currentOffset
            }
        }).done(function (data) {
            console.log(data);
        });
    }

})(BirdSearchComponent = {});
