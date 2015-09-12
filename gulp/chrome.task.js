'use strict';

var config = require('./config.json');
var exec = require('child_process').exec;

function task(done) {
    exec('start chrome http://localhost:' + config.port);
    done();
}

module.exports = task;

