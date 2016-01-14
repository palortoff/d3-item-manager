'use strict';

var packageJson = require('../package.json');
var gulp = require("gulp");
var config = require('./config.json');
var gutil = require('gulp-util');

module.exports = task;

function task(){
    return stringSrc("version.json", JSON.stringify({version: packageJson.version},null, 2))
        .pipe(gulp.dest(config.buildTarget));
}

function stringSrc(filename, string) {
    var src = require('stream').Readable({ objectMode: true }); //eslint-disable-line new-cap
    src._read = function () {
        this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }));
        this.push(null);
    };
    return src;
}