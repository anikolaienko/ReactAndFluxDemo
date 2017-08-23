"use string";

var gulp = require('gulp');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var connect = require('gulp-connect');
var open = require('gulp-open');

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/*.js',
        dist: 'dist'
    }
}

gulp.task('connect', function(){
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function(){
    gulp.src('dist/index.html')
        .pipe(open({ url: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('bundle', function() {
    gulp.src([config.paths.html, config.paths.js])
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('watch', function(){
    gulp.watch(config.paths.html, ['bundle']);
});

gulp.task('default', ['open', 'bundle', 'watch']);