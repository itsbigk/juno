var gulp         = require('gulp'),
less             = require('gulp-less'),
minifyCSS        = require('gulp-minify-css'),
rename           = require('gulp-rename'),
concat           = require('gulp-concat'),
uglify           = require('gulp-uglify'),
mocha            = require('gulp-mocha'),
jshint           = require('gulp-jshint'),
ngAnnotate       = require('gulp-ng-annotate'),
nodemon          = require('gulp-nodemon');

gulp.task('css', function() {
  // processing the less file and outputting it to the same folder as css
  return gulp.src('public/css/style.less')
  .pipe(less())
  .pipe(minifyCSS())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('public/dist'));
})

// minifying all js files and using jshint
gulp.task('js', function() {
  return gulp.src(['public/js/init.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(concat('application.js'))
  .pipe(rename('application.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/dist'));
})

// minification of all angular files
gulp.task('angular', function() {
  return gulp.src(['public/js/ng-app/**/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(ngAnnotate())
  .pipe(concat('ngApp.js'))
  .pipe(rename('ngApp.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/dist'));
})

// watching files to see if changes are being made to automatically update the files being minified
// every function that lives in this task is made to watch a specific file and if the file is modified in any way then a specific gulp task will run to update the file
gulp.task('watch', function() {
  // watching the style.css file for changes and it will run the css task if changes are detected
  gulp.watch(['public/css/style.less'], ['css']);

  // watching all of the javascript files specified in the task above and running the task for them if they are modified
  // when other js files are potentially added in the future then the same watch method can watch for multiple locations as well as run multiple tasks
  gulp.watch(['public/js/**/*.js', 'public/vendor/materialize/dist/js/materialize.js'], ['js', 'angular']);
})

// have gulp run the tests using mocha
gulp.task('test', function() {
  // adding the test files
  return gulp.src('spec/*', { read : false })
    .pipe(mocha({ reporter : 'spec' }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
})

// having gulp run nodemon
// everything is basically chaining off of each other starting with the nodemon task
// when this task runs nodemon it also starts the watch service which then will trigger any of the tasks that are triggered inside of the watch function
gulp.task('nodemon', function() {
  nodemon({
    script : 'server.js',
    // below is specifying the types of files to watch
    ext    : 'js less html'
  })
  .on('start', ['js', 'angular', 'css', 'test'])
  .on('change', ['watch', 'test'])
  .on('restart', function() {
    console.log('Restarted!');
  });
})

// setting the default task to run the nodemon task
gulp.task('default', ['nodemon']);
