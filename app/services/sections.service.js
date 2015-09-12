(function() {
    'use strict';

    angular.module('d3-item-manager').factory('sections', sections);

    var all = ['armor', 'weapons', 'jewelry'];
    var current = all[0];

    function sections(){
        current = localStorage.getItem('section') || all[0];

        return {
            all: all,
            current: function(){return current;},
            set: set
        };

        function set(s){
            current = s;
            localStorage.setItem('section', s)
        }
    }

})();