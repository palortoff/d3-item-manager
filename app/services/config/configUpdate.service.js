(function() {
  'use strict';

  angular.module('d3-item-manager').factory('configUpdate', configUpdate);

  var config;

  function configUpdate() {
    return update;

    function update(c) {
      config = c;
      updateAboutSeen();
    }

    function updateAboutSeen(){
      var key = 'aboutSeen';
      if (localStorage.getItem(key)){
        var value = localStorage.getItem(key);
        config.setItem(key, value);
        localStorage.removeItem(key);
      }
    }
  }

})();

/* TODO: update from
 * aboutSeen
 * currentClass
 * currentGameMode
 * currentSeason
 * filterOverAll
 * hideCubed
 * onlyCubable
 * itemCategory
 */
