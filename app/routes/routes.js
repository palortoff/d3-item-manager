(function() {
    'use strict';

    angular.module('d3-item-manager').config(function($routeProvider) {

        $routeProvider.
            when('/', {
                redirectTo: '/items'
            }).
            when('/items', {
                templateUrl:  'routes/items/items.template.html',
                controller:   'ItemsController',
                controllerAs: 'vm',
                resolve:      {factory: checkRouting}
            }).
            when('/about', {
                templateUrl:  'routes/about/about.template.html',
                controller:   'AboutController',
                controllerAs: 'vm'
            //}).
            //when('/config', {
            //    templateUrl:  'routes/config/config.template.html',
            //    controller:   'ConfigController',
            //    controllerAs: 'vm',
            //    resolve:      {factory: checkRouting}
            });
    });

    function checkRouting($location, d3Config) {
        if (localStorage.getItem('aboutSeen') != d3Config.aboutVersion) {
            $location.path('/about');
        }
    }
})();