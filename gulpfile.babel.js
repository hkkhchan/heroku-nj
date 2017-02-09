var gulp = require('gulp'); 

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var nodemon = require('nodemon');
var babel = require('gulp-babel');

gulp.task('lint', function() {
    gulp.src('./public/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
    gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});

gulp.task('scripts', function() {
    gulp.src('./js/**/*.js')
        .pipe(babel({presets:['es2015']}))
        //.pipe(concat('all.js'))
        //.pipe(rename('all.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(livereload());
});

gulp.task('default',['lint', 'sass', 'scripts']);

gulp.task('watch', function() {  
    livereload.listen();
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('js/**/*.js', ['scripts']);
});

gulp.task('server',function(){
  nodemon({
    'script': 'index.js'
  });
});

gulp.task('serve', ['server','watch']);

