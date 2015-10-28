'use strict';

var config = require('./config.json');
var rimraf = require('rimraf');

var task = function (done) {
    rimraf.sync(config.buildTarget);
    done();
};

module.exports = task;