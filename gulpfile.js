var gulp = require('gulp')
var less = require('gulp-less')
var cleanCSS = require('gulp-clean-css');

gulp.task('makeLess', () => {
    gulp.src('src/styles/index.less')
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/styles'))
})

/**
 * 拷贝字体库
 * **/
gulp.task('fonts', function () {
    gulp.src('src/styles/common/iconfont/fonts/*.*')
        .pipe(gulp.dest('dist/styles/fonts'))
})

gulp.task('default', ['makeLess', 'fonts'])