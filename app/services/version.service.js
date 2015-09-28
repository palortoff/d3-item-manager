(function() {
    'use strict';

    angular.module('d3-item-manager').factory('version', version);

    function version($http) {
        return {
            get:        getVersion
        };

        function getVersion(){
            return $http.get('version.json?' + Date.now()).
                then(function(result) {
                    return result.data;
                });

        }
    }

})();