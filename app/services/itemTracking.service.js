(function() {
    'use strict';

    angular.module('d3-item-manager').factory('itemTracking', itemTracking);

    var key = 'itemTracking';

    function itemTracking($timeout) {
        var tracking;
        var notifyTimer;
        return {
            load,
            save
        };

        function load() {
            //update();
            tracking = JSON.parse(localStorage.getItem(key)) || {};
            return tracking;
        }

        function save() {
            notifySave();
            localStorage.setItem(key, JSON.stringify(tracking));
        }

        function notifySave(){
            $timeout.cancel(notifyTimer);
            notifyTimer = $timeout(function(){
            toastr.success('Items saved', {timeOut: 1000});
            }, 1000);
        }
    }
})();