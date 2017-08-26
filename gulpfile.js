"use string";

// TODO: Consider using npm instead of GULP, it will be simpler.

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
        js: './src/**/*.js',
        jsx: './src/**/*.jsx',
        css: ['node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'],
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
    gulp.src(__filename)
        .pipe(open({uri: 'http://localhost:' + config.port}));
});

gulp.task('bundle', function() {
    var resources = [];
    resources.push(config.paths.html);
    resources.push(config.paths.js);
    resources.push(config.paths.jsx);
    resources = resources.concat(config.paths.css);

    gulp.src(resources)
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('watch', function(){
    gulp.watch([config.paths.html, config.paths.js, config.paths.jsx], ['bundle']);
});

gulp.task('default', ['bundle', 'open', 'watch']);