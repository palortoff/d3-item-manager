(function() {
    'use strict';

    angular.module('d3-item-manager').config(function($routeProvider) {

        $routeProvider.
            when('/', {
                redirectTo: '/cube'
            }).
            when('/cube', {
                templateUrl: 'routes/cube/cube.template.html',
                controller:'CubeController',
                controllerAs: 'vm'
            }).
            when('/editor', {
                templateUrl: 'routes/editor/editor.template.html',
                controller: 'EditorController',
                controllerAs: 'vm'
            });
    });
})();