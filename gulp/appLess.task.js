'use strict';

var gulp = require('gulp');
var config = require('./config.json');
var concat = require('gulp-concat');
var less = require('gulp-less');
var sourceMaps = require('gulp-sourcemaps');


function task(){
    return gulp.src(config.app.less)
        .pipe(sourceMaps.init())
        .pipe(less({paths: ['bower_components']}))
        .pipe(concat('app.css'))
        .pipe(sourceMaps.write('./'))
        .pipe(gulp.dest(config.buildTarget + '/css'));
}

module.exports =   task;