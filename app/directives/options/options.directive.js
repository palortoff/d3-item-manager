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

        function OptionsController(gameModes, seasons, columns){
            var vm = this;
            vm.gameModes = gameModes;
            vm.addNewGameMode = addNewGameMode;

            vm.seasons = seasons;
            vm.addNewSeason = addNewSeason;

            vm.columns = columns;
            vm.addNewColumn = addNewColumn;

            vm.showOptions= showOptions;
            vm.dismiss = dismiss;

            function addNewSeason(){
                seasons.add(vm.newSeason);
                vm.newSeason='';
            }
            function addNewGameMode(){
                gameModes.add(vm.newGameMode);
                vm.newGameMode='';
            }
            function addNewColumn(){
                columns.add(vm.newColumn);
                vm.newColumn='';
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