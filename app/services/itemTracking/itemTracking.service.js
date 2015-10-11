(function() {
    'use strict';

    angular.module('d3-item-manager').factory('itemTracking', itemTracking);

    var key = 'itemTracking';

    function itemTracking($timeout, itemCategory, upgradeDataStructureBeforeItemLoad) {
        var tracking;
        var notifyTimer;
        return {
            load,
            save
        };

        function load() {
            upgradeDataStructureBeforeItemLoad();
            tracking = JSON.parse(localStorage.getItem(key)) || {};
            removeDuplicateItemsIds();
            return tracking;
        }

        function saveWithoutToastr() {
            localStorage.setItem(key, JSON.stringify(tracking));
        }

        function save() {
            notifySave();
            saveWithoutToastr();
        }

        function notifySave() {
            $timeout.cancel(notifyTimer);
            notifyTimer = $timeout(function() {
                toastr.success('Items saved', {timeOut: 1000});
            }, 1000);
        }

        function removeDuplicateItemsIds() {
            var hasBadData = _.chain(tracking)
                    .filter(itemHasBadId)
                    .filter(itemHasDataStored)
                    .value()
                    .length > 0;

            if (hasBadData) {
                notifyForBadData();
                removeBadData();
            }
        }

        function notifyForBadData() {
            itemCategory.set(25);
            toastr.error('You had items stored that conflicted with other items. Please check the displayed list of items.', 'Data loss detected', {timeOut: 0});
        }

        function removeBadData() {
            _.forEach([1016,1026,1036,1046,1056,1066,1076,1086,1096,1106], function(id){delete tracking[id];});
            saveWithoutToastr();
        }

        function itemHasBadId(item, key) {
            switch (key) {
                case "1016":
                case "1026":
                case "1036":
                case "1046":
                case "1056":
                case "1066":
                case "1076":
                case "1086":
                case "1096":
                case "1106":
                    return true;
                default:
                    return false;
            }
        }

        function itemHasDataStored(item) {
            var s = item.hasOwnProperty('Softcore');
            var h = item.hasOwnProperty('Hardcore');
            return s || h;
        }

    }
})();