'use strict';

var gulp = require("gulp");
var config = require('./config.json');

module.exports = task;

function task(){
    return gulp.src(config.app.images)
        .pipe(gulp.dest(config.buildTarget+'/images'))
}