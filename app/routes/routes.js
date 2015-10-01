(function() {
    'use strict';

    angular.module('d3-item-manager').config(function($routeProvider) {

        $routeProvider.
            when('/', {
                redirectTo: '/items'
            }).
            when('/items', {
                templateUrl: 'routes/items/items.template.html',
                controller:'ItemsController',
                controllerAs: 'vm'
            });
    });
})();