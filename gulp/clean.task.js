'use strict';

var config = require('./config.json');
var rimraf = require('rimraf');

function task(done) {
    rimraf.sync(config.buildTarget);
    done();
}

module.exports = task;