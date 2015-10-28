(function() {
    'use strict';

    angular.module('d3-item-manager').factory('about', about);

    function about(config, constants) {
        return {
            hasBeenSeen
        };

        function hasBeenSeen() {
            return config.getItem('aboutSeen') === constants.aboutVersion;
        }
    }
})();