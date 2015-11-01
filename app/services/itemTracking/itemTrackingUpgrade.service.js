(function() {
    'use strict';

    angular.module('d3-item-manager').factory('itemTrackingUpgrade', itemTrackingUpgrade);

    var tracking;
    var saveFn;
    var configKey = 'itemTrackingVersion';

    function itemTrackingUpgrade(config,
                                 itemTrackingUpgrade_001,
                                 itemTrackingUpgrade_002) {
        return function(t, s) {
            tracking = t;
            saveFn = s;
            runUpdates();
        };

        function runUpdates() {
            runUpdate(1, itemTrackingUpgrade_001);
            runUpdate(2, itemTrackingUpgrade_002);
        }

        function runUpdate(version, fn) {
            if (currentVersion() < version) {
                console.log(`running itemTracking upgrade ${version}`);
                fn(tracking, saveFn);
                updateCurrentVersion(version);
            }
            else {
                console.log(`skipping itemTracking upgrade ${version}`);
            }
        }

        function currentVersion() {
            return Number(config.getItem(configKey,0));
        }

        function updateCurrentVersion(version) {
            config.setItem(configKey, version);
        }
    }

})();