(function() {
  'use strict';

  angular.module('d3-item-manager').factory('config', config);

  var localStorageKey = 'config';
  var _config = JSON.parse(localStorage.getItem(localStorageKey)) || {};

  function config(configUpdate) {
    var service = {
      getItem,
      setItem,
      isSet,
      getCompleteConfig,
      setCompleteConfigReloadRequired
    };
    configUpdate(service);
    return service;

    function getItem(itemKey, defaultValue) {
      return _config[itemKey] || defaultValue;
    }

    function setItem(itemKey, value){
      _config[itemKey] = value;
      save();
    }

    function isSet(itemKey){
      return !_.isUndefined(_config[itemKey]);
    }

    function get() {
      return _config;
    }

    function save() {
      localStorage.setItem(localStorageKey, JSON.stringify(_config));
    }
    function getCompleteConfig(){
      return _config;
    }
    function setCompleteConfigReloadRequired(c){
      _config = c;
      save();
    }
  }

})();

// TODO: page to manually edit/delete all config values
