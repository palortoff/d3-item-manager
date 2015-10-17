(function() {
  'use strict';

  angular.module('d3-item-manager').factory('about', about);

  function about(constants) {
    return {
      hasBeenSeen
    };

    function hasBeenSeen() {
      return localStorage.getItem('aboutSeen') === constants.aboutVersion;
    }
  }
})();