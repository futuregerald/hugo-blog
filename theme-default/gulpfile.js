'use strict'

var gulp = require('gulp')
// var del = require('del')
var postcss = require('gulp-postcss')

var less = require('gulp-less')
var partialImport = require('postcss-partial-import')
var cssReset = require('postcss-css-reset')
var bem = require('saladcss-bem')
var cssnext = require('postcss-cssnext')
var utils = require('postcss-utils')
var inlineSvg = require('postcss-inline-svg')
var px2rem = require('postcss-px2rem')

var fishCfg = require('./fish.config.json')
var bemCfg = {
  'shortcuts': {
    'component': 'b',
    'modifier': 'm',
    'descendent': 'e'
  },
  'separators': {
    'descendent': '__',
    'modifier': '--'
  }
}

var lessPath = './src/styles'
var lessResultTempPath = './src/styles/_less'

var cssPath = './src'
var assetsPath = './src/assets'

var distPath = fishCfg.mode === 'independent' ? './dist' : fishCfg.dependentDistPath

var plugins = [ partialImport, cssReset, bem(bemCfg), cssnext, utils, inlineSvg ]

if (fishCfg.px2rem.enabled) {
  plugins.push(px2rem(fishCfg.px2rem.options))
}

gulp.task('compile:less', function () {
  return gulp.src(lessPath + '/*.less')
    .pipe(less())
    .pipe(gulp.dest(lessResultTempPath))
})

gulp.task('compile:css', ['compile:less'], function () {
  return gulp.src(cssPath + '/*.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest(distPath))
})

gulp.task('copy:assets', function () {
  return gulp.src(assetsPath + '/**')
    .pipe(gulp.dest(distPath + '/assets'))
})

gulp.task('build', ['compile:css', 'copy:assets'], function () {
  // del([ lessResultTempPath ])
})

gulp.task('watch', ['build'], function () {
  gulp.watch('./src/**', ['build'])
})
gulp.task('default',['watch']);