// gulp
const gulp = require('gulp');
// sequeuece
const gulpSequence = require('gulp-sequence');

function prod() {
    // build
    gulp.task('default', gulpSequence('clean', 'image', 'js', 'lib', 'less', 'html'));
    gulp.task('build:js', gulpSequence('clean', 'image', 'js', 'lib', 'less', 'html'));
    gulp.task('build:ts', gulpSequence('clean', 'image', 'ts', 'lib', 'less', 'html'));
}

module.exports = prod;
