'use strict';

var gulp = require('gulp');
var config = require('./config.json');
var concat = require('gulp-concat');
var less = require('gulp-less');
var sourceMaps = require('gulp-sourcemaps');


function task(){
    return gulp.src(config.thirdParty.less)
        .pipe(sourceMaps.init())
        .pipe(less({paths: config.app.lessInclude}))
        .pipe(concat('thirdParty.css'))
        .pipe(sourceMaps.write('./'))
        .pipe(gulp.dest(config.buildTarget + '/css'));
}

module.exports =   task;