(function() {
    'use strict';

    angular.module('d3-item-manager').factory('loadItems', loadItems);

    function loadItems($http){
        return  function (section)
        {
            return $http.get('items/'+section+'.json').
                then(function(result) {
                    return result.data;
                });
        }
    }


})();