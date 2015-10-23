(function() {
    'use strict';

    angular.module('d3-item-manager').factory('exportService', exportService);

    var separator = ';';

    function exportService($q, itemTracking, columns, gameModes, items, seasons) {
        return {
            data
        };

        function data() {
            var lines = [];
            return $q.when().
                then(makeGameModeLine).
                then(addLines.bind(null, lines)).
                then(makeSeasonLine).
                then(addLines.bind(null, lines)).
                then(makeColumnLine).
                then(addLines.bind(null, lines)).
                then(makeItemLines).
                then(addLines.bind(null, lines)).
                then(function() {return _.flatten(lines).join('\r\n');});
        }

        function addLines(lines, newLines) {
            lines.push(newLines);
        }

        function makeGameModeLine() {
            var res = separator;

            _.each(allGameModes(), function(gm) {
                res += gm;
                _.each(allSeasons(), function() {
                    _.each(allColumns(), function() {
                        res += separator;
                    });
                });
            });
            return res;
        }

        function makeSeasonLine() {
            var res = separator;

            _.each(allGameModes(), function() {
                _.each(allSeasons(), function(season) {
                    res += season;
                    _.each(allColumns(), function() {
                        res += separator;
                    });
                });
            });
            return res;

        }

        function makeColumnLine() {
            var res = separator;

            _.each(allGameModes(), function() {
                _.each(allSeasons(), function() {
                    _.each(allColumns(), function(col) {
                        res += col + separator;
                    });
                });
            });
            return res;
        }

        function makeItemLines() {
            return items.load().then(function(items) {
                var itemsForLines = getItemsForLines(items);
                return _.map(itemsForLines, makeItemLine);
            });
        }

        function makeItemLine(item) {
            var res = item.name + separator;
            var gmData, sData, colData;
            _.each(allGameModes(), function(gm) {
                gmData = item[gm];
                if (gmData) {
                    _.each(allSeasons(), function(s) {
                        sData = gmData[s];
                        if (sData) {
                            _.each(allColumns(), function(col) {
                                colData = sData[col];
                                res += (colData ? 1 : '') + separator;
                            });
                        }
                        else {
                            _.each(allColumns(), function() {
                                res += separator;
                            });

                        }
                    });
                }
                else {
                    _.each(allSeasons(), function() {
                        _.each(allColumns(), function() {
                            res += separator;
                        });
                    });
                }
            });
            return res;
        }

        function getItemsForLines(items) {
            var trackingItems = itemTracking.get();
            _.each(trackingItems, addItemName.bind(null, items));
            return trackingItems;
        }

        function addItemName(items, trackingItem, id) {
            var item = _.find(items, function(item) {return item.id === Number(id);});
            trackingItem.name = item.name;
        }

        function allGameModes() {return gameModes.all();}

        function allSeasons() {return seasons.reallyAll();}

        function allColumns() { return columns.reallyAll(); }
    }
})();