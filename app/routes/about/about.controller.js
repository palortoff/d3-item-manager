(function() {
    'use strict';

    angular.module('d3-item-manager').controller('AboutController', AboutController);

    var key = 'aboutSeen';
    function AboutController($location, constants, version, config){
        var vm = this;
        vm.constants = constants;
        vm.dismiss = dismiss;
        vm.version = '';

        version.get().then(function(version){
            vm.version = version.version;
        });

        function dismiss(){
            config.setItem(key, constants.aboutVersion);
            $location.path('/');
        }
    }
})();