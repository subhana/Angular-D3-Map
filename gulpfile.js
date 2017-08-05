var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var del = require('del');
var flatten = require('gulp-flatten');
var gulp = require('gulp');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var ngAnnotate = require('gulp-ng-annotate');
var replace = require('gulp-replace');
var rev = require('gulp-rev');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

const zip = require('gulp-zip');

var paths = {
    scripts: ['app/app.js','app/**/*.module.js', 'app/**/*.js'],
    css: ['app/**/*.css'],
    index: './app/index.html',
    templates: ['app/**/*.html', '!app/index.html'],
    //images: 'app/assets/images/*',
    map_data: 'app/assets/map-data/*'
};

var prodPaths = {
    scripts: ['dist/**/*.js'],
    templates: ['dist/templates/*.html', 'dist/index.html']
}

gulp.task('clean', function() {
    return del(['zip','dist']);
});

gulp.task('scripts', function() {
    return gulp.src(mainBowerFiles('**/*.js').concat(paths.scripts))
        .pipe(ngAnnotate())
        .pipe(uglify().on('error', gutil.log))
        .pipe(concat('sfmap.js'))
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

// Prepare revisioned, single js file
gulp.task('scripts-debug', ['clean-js', 'libs', 'src'] , function() {
    return gulp.src(['dist/js/libs/libs.js','dist/js/src/src.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('sfmap.js'))
        .pipe(sourcemaps.write())
        .pipe(rev())
        .pipe(gulp.dest('dist/js'));
});

// Inject css and js files into index.html when js changes
gulp.task('inject-js-debug', ['scripts-debug'], function () {
    return gulp.src(paths.index)
        .pipe(inject(gulp.src(['dist/js/*.js', 'dist/css/*.css'], {read: false}), {ignorePath: 'dist'}))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

// Inject css and js files into index.html when js changes
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

// Prepare revisioned, single js file
gulp.task('css', ['clean-css'], function() {
    return gulp.src(mainBowerFiles('**/*.css').concat(paths.css))
        .pipe(concat('sfmap.css'))
        .pipe(cleanCSS())
        .pipe(rev())
        .pipe(gulp.dest('dist/css'));
});

// Inject css and js files into index.html when css changes
gulp.task('inject-css', ['css'], function () {
    return gulp.src(paths.index)
        .pipe(inject(gulp.src(['dist/js/*.js', 'dist/css/*.css'], {read: false}), {ignorePath: 'dist'}))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

// Inject css and js files when index.html file changes
gulp.task('index', function() {
    return gulp.src(paths.index)
        .pipe(inject(gulp.src(['dist/js/*.js', 'dist/css/*.css'], {read: false}), {ignorePath: 'dist'}))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

// Flatten and copy all html files
gulp.task('templates',function() {
    return gulp.src(paths.templates)
        .pipe(flatten())
        .pipe(gulp.dest('dist/templates'))
        .pipe(connect.reload());
});

// Copy all .json file for drawing the map of San Francisco
gulp.task('map-data',function() {
    return gulp.src(paths.map_data)
        .pipe(gulp.dest('dist/map_data'));
});

// Copy all static images
/*gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('dist/img'));
});*/

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['inject-js-debug']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.templates, ['templates']);
    gulp.watch(paths.index, ['index']);
    gulp.watch(paths.css, ['inject-css']);
});

// Start local server at port 8004
gulp.task('server', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 8004
    });
});

gulp.task('zip', ['index', 'templates', 'inject-js', 'inject-css', 'images'], () =>
    gulp.src('dist/**')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('zip'))
);

gulp.task('default', ['watch', 'index', 'templates', 'images', 'map-data', 'inject-css', 'inject-js-debug', 'server']);
gulp.task('deploy', ['index', 'templates', 'map-data', 'inject-js', 'inject-css', 'images', 'zip']);
