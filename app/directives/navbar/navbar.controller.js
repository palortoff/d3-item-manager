(function() {
    'use strict';

    angular.module('d3-item-manager').controller('NavBarController', NavBarController);

    function NavBarController(classes, gameModes, seasons) {
        var vm = this;

        vm.gameModes = gameModes;
        vm.seasons = seasons;
        vm.classes = classes;

        vm.showDisclaimer = function() {
            localStorage.setItem('disclaimerRead', 0);
        };
        vm.showOptions = function() {
            localStorage.setItem('showOptions', "true");
        };
    }
})();
