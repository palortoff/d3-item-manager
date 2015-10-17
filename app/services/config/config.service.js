(function() {
  'use strict';

  angular.module('d3-item-manager').factory('config', config);

  var key = 'config';
  var _config = JSON.parse(localStorage.getItem(key)) || {};

  function config() {
    return {
      get,
      save,
      getItem,
      setItem,
      isSet
    };

    function getItem(key, defaultValue) {
      return _config[key] || defaultValue;
    }

    function setItem(key, value){
      _config[key] = value;
      save();
    }

    function isSet(key){
      return !_.isUndefined(_config[key]);
    }

    function get() {
      return _config;
    }

    function save() {
      localStorage.setItem(key, JSON.stringify(_config));
    }
  }

})();