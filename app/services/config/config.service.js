(function() {
    'use strict';

    angular.module('d3-item-manager').factory('config', config);

    var key = 'config';
    var _config = JSON.parse(localStorage.getItem(key)) || {};

    function config(){
        return {
            get,
            save
        };

        function get(){
            return _config;
        }

        function save(){
            localStorage.setItem(key, JSON.stringify(_config));
        }
    }

})();