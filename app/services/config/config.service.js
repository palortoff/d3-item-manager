(function() {
  'use strict';

  angular.module('d3-item-manager').factory('config', config);

  var localStorageKey = 'config';
  var _config = JSON.parse(localStorage.getItem(localStorageKey)) || {};

  function config(configUpdate) {
    var service = {
      getItem,
      setItem,
      isSet
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
  }

})();

// TODO: page to manually edit/delete all config values
