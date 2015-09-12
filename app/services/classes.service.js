(function() {
    'use strict';

    angular.module('d3-item-manager').factory('classes', classes);

    var all = [
        {id:   1,name: 'monk'},
        {id:   2,name: 'demon-hunter'},
        {id:   3,name: 'crusader'},
        {id:   4,name: 'witch-doctor'},
        {id:   5,name: 'wizard'},
        {id:   6,name: 'barbarian'}
    ];
    var current = all[0];

    function classes() {
        current = localStorage.getItem('class') || all[0].id;

        return {
            all:     all,
            current: function() {return current;},
            currentName: currentName,
            set:     set
        };

        function set(c) {
            current = c.id;
            localStorage.setItem('class', c.id)
        }

        function currentName(){
            var c = _.find(all, function(c){return c.id == current;});
            return c.name;
        }
    }

})();