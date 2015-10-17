(function() {
  'use strict';

  angular.module('d3-item-manager').directive('newFeatures', newFeatures);

  function newFeatures() {
    return {
      restrict:     'E',
      templateUrl:  'directives/newFeatures/newFeatures.template.html',
      scope:        {},
                    controller,
      controllerAs: 'vm'
    };

    function controller($location, config) {
      var vm = this;

      vm.itemLanguageNotConfigured = itemLanguageNotConfigured;
      vm.showConfig = showConfig;
      vm.setDefaultItemLanguage = setDefaultItemLanguage;

      function itemLanguageNotConfigured() {
        return !config.isSet('itemLanguage');
      }

      function showConfig() {
        $location.path('/config');
      }

      function setDefaultItemLanguage() {
        config.setItem('itemLanguage', 'en_GB');
      }
    }
  }
})();