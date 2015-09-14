(function() {
    'use strict';

    angular.module('d3-item-manager').directive('options', options);

    var disclaimerVersion = 1;
    var key = 'showOptions';

    function options(){
        return {
            restrict:'E',
            scope: {},
            templateUrl: 'directives/options/options.template.html',
            controller: OptionsController,
            controllerAs: 'vm'
        };

        function OptionsController(gameModes){
            var vm = this;
            vm.showOptions= showOptions;
            vm.dismiss = dismiss;
            vm.gameModes = gameModes;
            vm.addNewGameMode = addNewGameMode;

            function addNewGameMode(){
                gameModes.add(vm.newGameMode);
                vm.newGameMode='';
            }

            function showOptions(){
                return localStorage.getItem(key) === "true";
            }

            function dismiss(){
                localStorage.setItem(key, "false");
            }
        }
    }

})();