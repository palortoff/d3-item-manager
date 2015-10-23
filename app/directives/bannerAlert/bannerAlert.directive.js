(function() {
    'use strict';

    angular.module('d3-item-manager').directive('bannerAlert', bannerAlert);

    function bannerAlert() {
        return {
            restrict:    'E',
            transclude:  true,
            templateUrl: 'directives/bannerAlert/bannerAlert.template.html'
        };
    }

})();