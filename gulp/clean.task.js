'use strict';

var config = require('./config.json');
var rimraf = require('rimraf');

var task = function () {
    rimraf.sync(config.buildTarget);
};

module.exports = task;