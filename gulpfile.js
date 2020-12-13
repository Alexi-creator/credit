const { src, dest, watch, parallel, series } = require('gulp');

const scss          = require('gulp-sass');
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const uglify        = require('gulp-uglify-es').default;
const autoprefixer  = require('gulp-autoprefixer');
const imagemin      = require('gulp-imagemin');
const del           = require('del');
const rename        = require('gulp-rename');

function browsersync() {
  browserSync.init({
    server: {
        baseDir: 'app/'
    }
  });
}

function cleanDist() {
  return del('dist')
}

function images() {
  return src('app/img/**/*')
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
  ]))
  .pipe(dest('dist/img'))
}

function styles() {
  return src([
    'app/scss/common.scss',
    'app/scss/index.scss'
  ])
  .pipe(rename({
    suffix: ".min",
    prefix : ''
  }))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 10 version'],
    grid: true
  }))
  .pipe(scss({outputStyle: 'compressed'}))
  .pipe(dest('app/css'))
  .pipe(browserSync.stream())
}

function stylesPages() {
  return src([
    'app/page/**/**/*.scss'
  ])
  .pipe(rename({
    suffix: ".min",
    prefix : ''
  }))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 10 version'],
    grid: true
  }))
  .pipe(scss({outputStyle: 'compressed'}))
  .pipe(dest('app/css'))
  .pipe(browserSync.stream())
}

function scripts() {
  return src([
    'app/js/common.js'
  ])
  .pipe(concat('common.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js'))
  .pipe(browserSync.stream())
}

function scriptsPages() {
  return src([
    'app/page/**/**/*.js'
  ])
  .pipe(rename({
    suffix: ".min",
    prefix : ''
  }))
  .pipe(uglify())
  .pipe(dest('app/js'))
  .pipe(browserSync.stream())
}

function build() {
  return src([
    'app/css/**/*.min.css',
    'app/fonts/**/*',
    'app/js/**/*.min.js',
    'app/**/*.html'
  ], {base: 'app'})
  .pipe(dest('dist'))
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/page/**/*.scss'], stylesPages);
  watch(['app/js/**/*.js', '!app/js/**/*.min.js'], scripts);
  watch(['app/page/**/**/*.js'], scriptsPages);
  watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.stylesPages = stylesPages;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.scriptsPages = scriptsPages;
exports.build = build;
exports.images = images;
exports.cleanDist = cleanDist;
exports.stylesPages = stylesPages;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, stylesPages, scripts, scriptsPages, browsersync, watching);

