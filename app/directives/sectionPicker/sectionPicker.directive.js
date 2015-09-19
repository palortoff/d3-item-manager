(function() {
    'use strict';

    angular.module('d3-item-manager').directive('sectionPicker', sectionPicker);

    function sectionPicker(){
        return {
            restrict:'E',
            scope: {},
            templateUrl: 'directives/sectionPicker/sectionPicker.template.html',
            controller: SectionPickerController,
            controllerAs: 'vm'
        };

        function SectionPickerController(sections){
            var vm = this;
            vm.sections = sections;
        }
    }

})();