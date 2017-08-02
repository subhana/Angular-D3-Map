var argv = require('yargs').argv;
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var del = require('del');
var flatten = require('gulp-flatten');
var gulp = require('gulp');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var mainBowerFiles = require('main-bower-files');
var ngAnnotate = require('gulp-ng-annotate');
var replace = require('gulp-replace');
var rev = require('gulp-rev');
var sourcemaps = require('gulp-sourcemaps');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');

const zip = require('gulp-zip');
const modRewrite = require('connect-modrewrite');

var paths = {
  scripts: ['app/app.js','app/**/*.module.js', 'app/**/*.js','!app/**/*spec.js','!app/**/*mock.js','!app/e2e/**/*'],
  css: ['app/**/*.css'],
  index: './app/index.html',
  templates: ['app/**/*.html', '!app/index.html'],
  images: 'app/assets/images/*',
};

var prodPaths = {
  scripts: ['dist/**/*.js'],
  templates: ['dist/templates/*.html', 'dist/index.html']
}

// used to retrieve gulp task names while inside a gulp task
var _runTask = gulp.Gulp.prototype._runTask;
gulp.Gulp.prototype._runTask = function (task) {
    this.currentRunTaskName = task.name;

    _runTask.apply(this, arguments);
};

function checkForFlag(flagName, taskName) {
  if (argv[flagName] == null) {
    throw new gutil.PluginError({
          plugin: taskName,
          message: flagName + ' flag is not set'
        });
  }
}

gulp.task('clean', function() {
  return del(['zip','dist']);
});

gulp.task('lint', function() {
  return gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('scripts', function() {
  return gulp.src(mainBowerFiles('**/*.js').concat(paths.scripts))
    .pipe(ngAnnotate())
    .pipe(uglify().on('error', gutil.log))
    .pipe(concat('nexport.js'))
    .pipe(rev())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('libs', function() {
  return gulp.src(mainBowerFiles('**/*.js'))
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('dist/js/libs'));
});

gulp.task('src', function() {
    return gulp.src(paths.scripts)
      .pipe(concat('src.js'))
      .pipe(gulp.dest('dist/js/src'));
})

gulp.task('clean-js', function () {
    cleanJsFiles = ['dist/js/*.js'];
    return del(cleanJsFiles);
});

gulp.task('scripts-debug', ['clean-js', 'libs', 'src'] , function() {
  return gulp.src(['dist/js/libs/libs.js','dist/js/src/src.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('nexport.js'))
    .pipe(sourcemaps.write())
    .pipe(rev())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('inject-js-debug', ['scripts-debug'], function () {
    return gulp.src(paths.index)
        .pipe(inject(gulp.src(['dist/js/*.js', 'dist/css/*.css'], {read: false}), {ignorePath: 'dist'}))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('inject-js', ['scripts'], function () {
    return gulp.src(paths.index)
        .pipe(inject(gulp.src(['dist/js/*.js', 'dist/css/*.css'], {read: false}), {ignorePath: 'dist'}))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('clean-css', function () {
    cleanCssFiles = ['dist/css/*.css'];
    return del(cleanCssFiles);
});

gulp.task('css', ['clean-css'], function() {
  return gulp.src(mainBowerFiles('**/*.css').concat(paths.css))
  .pipe(concat('nexport.css'))
  .pipe(cleanCSS())
  .pipe(rev())
  .pipe(gulp.dest('dist/css'));
});

gulp.task('inject-css', ['css'], function () {
    return gulp.src(paths.index)
        .pipe(inject(gulp.src(['dist/js/*.js', 'dist/css/*.css'], {read: false}), {ignorePath: 'dist'}))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('index', function() {
  return gulp.src(paths.index)
    .pipe(inject(gulp.src(['dist/js/*.js', 'dist/css/*.css'], {read: false}), {ignorePath: 'dist'}))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('templates',function() {
  return gulp.src(paths.templates)
  .pipe(flatten())
  .pipe(gulp.dest('dist/templates'))
  .pipe(connect.reload());
});

// Copy all static images
gulp.task('images', function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['inject-js-debug']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.templates, ['templates']);
    gulp.watch(paths.index, ['index']);
    gulp.watch(paths.css, ['inject-css']);
});

// modRewrite explanation
//  ^/gateway/(.*)$ : if a url starts /gateway/ grab everything after /gateway/
//  append it to the end of http://devqa2.corp.nexient.com/gateway/
//  [P] its a proxy request
gulp.task('server', function() {
  connect.server({
    root: 'dist',
    livereload: true,
    port:8004,
    middleware: function(){
      return [
        modRewrite([
          '^/gateway/(.*)$ http://devqa2.corp.nexient.com/gateway/$1 [P]',
          '^/images/(.*)$ http://devqa2.corp.nexient.com/images/$1 [P]'
        ]),
      ];
    }
  });
});

gulp.task('zip', ['index', 'templates', 'inject-js', 'inject-css', 'images'], () =>
    gulp.src('dist/**')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('zip'))
);

/*gulp.task('replace-urls', ['deploy'], function() {
  checkForFlag('production-url', this.currentRunTaskName);
  gulp.src(prodPaths.templates.concat(prodPaths.scripts))
    .pipe(replace('devqa2.corp.nexient.com', argv['production-url']))
    .pipe(gulp.dest('dist'));
});*/

gulp.task('default', ['watch', 'index', 'templates', 'images', 'inject-css', 'inject-js-debug', 'server']);
gulp.task('deploy', ['index', 'templates', 'inject-js', 'inject-css', 'images', 'zip']);
//gulp.task('prod-deploy', ['deploy', 'replace-urls']);
