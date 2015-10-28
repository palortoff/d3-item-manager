(function() {
    'use strict';

    angular.module('d3-item-manager').factory('upgradeDataStructureBeforeItemLoad', upgradeDataStructureBeforeItemLoad);

    var key = 'itemTracking';

    function upgradeDataStructureBeforeItemLoad() {
        var tracking;
        return function () {
            var hasOldSectionData = !!localStorage.getItem('armor') || !!localStorage.getItem('weapons') || !!localStorage.getItem('jewelry');
            var hasTrackingContainer = !!localStorage.getItem(key);

            if (hasOldSectionData && !hasTrackingContainer) {
                var armor = JSON.parse(localStorage.getItem('armor'));
                var weapons = JSON.parse(localStorage.getItem('weapons'));
                var jewls = JSON.parse(localStorage.getItem('jewelry'));
                tracking = _.defaults({}, armor, weapons, jewls);
                save();
                console.log("upgradedFromCubeSectionsToOneTrackingContainer");

                localStorage.setItem('armor_backup', JSON.stringify(armor));
                localStorage.setItem('weapons_backup', JSON.stringify(weapons));
                localStorage.setItem('jewls_backup', JSON.stringify(jewls));

                localStorage.removeItem('armor');
                localStorage.removeItem('weapons');
                localStorage.removeItem('jewelry');
            }
        };

        function save() {
            localStorage.setItem(key, JSON.stringify(tracking));
        }
    }
})();