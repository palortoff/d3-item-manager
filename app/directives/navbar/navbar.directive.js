(function () {
    'use strict';

    angular.module('d3-item-manager').directive('navBar', function () {
        return {
            restrict:'E',
            templateUrl: 'directives/navbar/navbar.template.html',
            scope: {},
            controller: 'NavBarController',
            controllerAs: 'vm'
        };
    });
})();