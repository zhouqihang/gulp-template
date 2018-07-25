// gulp
const gulp = require('gulp');
// browser-sync
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
// config
const CONFIG = require('./gulp.config');

function dev() {
    gulp.task('dev:js', ['default'], function () {
        browserSync.init({
            server: {
                baseDir: CONFIG.dist,
                // proxy: '',
            }
        });
        gulp.watch(CONFIG.html.entry, ['html']).on('change', reload);
        gulp.watch(CONFIG.js.entry, ['js']).on('change', reload);
        gulp.watch(CONFIG.lib.entry, ['lib']).on('change', reload);
        gulp.watch(CONFIG.image.entry, ['image']).on('change', reload);
        gulp.watch(CONFIG.less.entry, ['less']).on('change', reload);
    });
    gulp.task('dev:ts', ['build:ts'], function () {
        browserSync.init({
            server: {
                baseDir: CONFIG.dist,
                // proxy: '',
            }
        });
        gulp.watch(CONFIG.html.entry, ['html']).on('change', reload);
        gulp.watch(CONFIG.js.entry, ['ts']).on('change', reload);
        gulp.watch(CONFIG.lib.entry, ['lib']).on('change', reload);
        gulp.watch(CONFIG.image.entry, ['image']).on('change', reload);
        gulp.watch(CONFIG.less.entry, ['less']).on('change', reload);
    });
}

module.exports = dev;