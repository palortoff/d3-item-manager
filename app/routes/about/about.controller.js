(function() {
    'use strict';

    angular.module('d3-item-manager').controller('AboutController', AboutController);

    var key = 'aboutSeen';
    function AboutController($location, d3Config, version){
        var vm = this;
        vm.d3Config = d3Config;
        vm.dismiss = dismiss;
        vm.version = '';

        version.get().then(function(version){
            vm.version = version.version;
        });

        function dismiss(){
            localStorage.setItem(key, d3Config.aboutVersion);
            $location.path('/');
        }
    }
})();