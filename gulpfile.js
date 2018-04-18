// generated on 2017-05-17 using generator-webapp 2.4.1
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const inline = require('gulp-inline')
const inlineCss = require('gulp-inline-css')

var dev = true;

gulp.task('views', () => {
  return gulp.src('app/*.njk')
    .pipe($.nunjucksRender({
      path: 'app'
    }))
    .pipe(gulp.dest('.tmp'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('views:reload', ['views'], () => {
  reload();
});

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
    }))
    .pipe($.if(dev, $.sourcemaps.write()))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('html', ['views', 'styles'], () => {
  return gulp.src(['app/*.html', '.tmp/*.html'])
    .pipe($.useref({
      searchPath: ['.tmp', 'app', '.']
    }))
    .pipe($.if(/\.css$/, $.cssnano({
      safe: true,
      autoprefixer: false
    })))
    .pipe(inline({
      disabledTypes: ['img'], // Only inline css files 
    }))
    .pipe(inlineCss({
      applyStyleTags: true,
      removeStyleTags: false,
      applyLinkTags: true,
      preserveMediaQueries: true // Keep media queries in file
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*',
    '!app/*.html',
    '!app/*.njk'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', () => {
  runSequence(['clean'], ['views', 'styles'], () => {
    browserSync.init({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['.tmp', 'app'],
        routes: {
          '/node_modules': 'node_modules'
        }
      }
    });

    gulp.watch([
      'app/images/**/*'
    ]).on('change', reload);

    gulp.watch('app/**/*.{html,njk}', ['views:reload']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
  });
});

gulp.task('build', ['html', 'images', 'extras'], () => {
  return gulp.src('dist/**/*');
});

gulp.task('default', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence(['clean'], 'build', resolve);
  });
});
