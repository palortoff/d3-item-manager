(function() {
    'use strict';

    angular.module('d3-item-manager').factory('backup', backup);

    function backup(config, itemTracking) {
        return {
            data
        };

        function data() {
            return {
                config:   config.getCompleteConfig(),
                tracking: itemTracking.get()
            };
        }
    }
})();