(function() {
    'use strict';

    angular.module('d3-item-manager').factory('itemTracking', itemTracking);

    function itemTracking(sections, $timeout) {
        var tracking = {};
        var notifyTimer;
        return {
            load,
            save
        };

        function load(section) {
            tracking[section] = JSON.parse(localStorage.getItem(section));
            if (!tracking[section]) tracking[section] = {};
            return tracking[section];
        }

        function save() {
// TODO: not optimal, but this will be removed when new item structure is implemented.
            _.forEach(sections.all, saveSection);
        }

        function saveSection(section) {
            notifySave();
            localStorage.setItem(section, JSON.stringify(tracking[section]));
        }

        function notifySave(){
            $timeout.cancel(notifyTimer);
            notifyTimer = $timeout(function(){
            toastr.success('Items saved', {timeOut: 1000});
            }, 1000);
        }
    }
})();