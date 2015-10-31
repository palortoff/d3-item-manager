(function() {
    'use strict';

    angular.module('d3-item-manager').factory('itemTracking', itemTracking);

    var key = 'itemTracking';

    function itemTracking($timeout, upgradeDataStructureBeforeItemLoad, itemTrackingUpgrade) {
        var tracking;
        var notifyTimer;
        return {
            get,
            save,
            setCompleteTrackingReloadRequired
        };

        function get(){
            if (!tracking){
                load();
            }
            return tracking;
        }
        function load() {
            upgradeDataStructureBeforeItemLoad();
            tracking = JSON.parse(localStorage.getItem(key)) || {};
            itemTrackingUpgrade(tracking, saveWithoutToastr);
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
        function setCompleteTrackingReloadRequired(t){
            tracking = t;
            saveWithoutToastr();
        }
    }
})();