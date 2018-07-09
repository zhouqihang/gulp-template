// gulp
const gulp = require('gulp');
// sequeuece
const gulpSequence = require('gulp-sequence');

function prod() {
    // build
    gulp.task('default', gulpSequence('clean', 'image', 'js', 'less', 'html'));
    gulp.task('build:js', gulpSequence('clean', 'image', 'js', 'less', 'html'));
    gulp.task('build:ts', gulpSequence('clean', 'image', 'ts', 'less', 'html'));
}

module.exports = prod;
