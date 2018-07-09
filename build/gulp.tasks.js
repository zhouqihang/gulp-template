const gulp = require('gulp');
// 压缩HTML
const htmlmin = require('gulp-htmlmin');
// 删除文件夹
const clean = require('gulp-clean');
// 文件拼接
const concat = require('gulp-concat');
// 重命名
const rename = require('gulp-rename');
// 压缩js
const uglify = require('gulp-uglify');
// 消息
const notify = require('gulp-notify');
// less and css
const less = require('gulp-less');
const path = require('path');
const minifycss = require('gulp-minify-css');
// less autoprefix
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix(
    { browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'] }
);
// image
const imagemin = require('gulp-imagemin');
// babel
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
// eslint
const eslint = require('gulp-eslint');
// ts
const ts = require('gulp-typescript');

// config
const CONFIG = require('./gulp.config');

function tasks() {
    // 处理html文件
    gulp.task('html', function () {
        const options = {
            removeComments: true,               //清除HTML注释
            collapseWhitespace: true,           //压缩HTML
            collapseBooleanAttributes: true,    //省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,        //删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,   //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,                     //压缩页面JS
            minifyCSS: true                     //压缩页面CSS
        };
        return gulp.src(CONFIG.html.entry)
            .pipe(htmlmin(options))
            .pipe(gulp.dest(CONFIG.html.output))
            .pipe(notify({ message: 'HTML文件处理完成' }));
    });

    // 删除dist文件夹
    gulp.task('clean', function () {
        return gulp.src(CONFIG.dist, { read: false })
            .pipe(clean())
            .pipe(notify({ message: 'dist文件夹清除完成' }));
    });

    // JS处理任务
    gulp.task('js', function () {
        return gulp.src(CONFIG.js.entry)                // 引入所有需处理的JS
            .pipe(eslint())                             // eslint
            .pipe(eslint.format())                      // eslint
            .pipe(eslint.failAfterError())              // eslint
            .pipe(sourcemaps.init())                    // 使用scorcemap
            .pipe(babel())                              // 使用babel转义es6
            .pipe(concat(CONFIG.js.filename))           // 合并JS文件
            .pipe(sourcemaps.write())                   // 输出source信息
            .pipe(gulp.dest(CONFIG.js.output))          // 完整版输出
            .pipe(rename({ suffix: CONFIG.js.suffix })) // 重命名
            .pipe(uglify())                             // 压缩JS
            .pipe(gulp.dest(CONFIG.js.output))          // 压缩版输出
            .pipe(notify({ message: 'JS文件处理完成' }));
    });

    // ts处理
    gulp.task('ts', function () {
        const tsResult = gulp.src(CONFIG.ts.entry)
            .pipe(ts({
                noImplicitAny: true,
                out: CONFIG.ts.filename
            }));
        return tsResult.js.pipe(gulp.dest(CONFIG.ts.output));
    });

    // less处理任务
    gulp.task('less', function () {
        return gulp.src(CONFIG.less.entry)                          // 引入less文件
            .pipe(less({
                paths: [path.join(__dirname, 'less', 'includes')],
                plugins: [autoprefix]
            }))                                                     // 编译
            .pipe(rename(CONFIG.less.filename))                     // rename
            .pipe(gulp.dest(CONFIG.less.output))                    // output
            .pipe(rename({ suffix: CONFIG.less.suffix }))           // rename
            .pipe(minifycss())                                      // 压缩
            .pipe(gulp.dest(CONFIG.less.output))                    // output
            .pipe(notify({ message: 'LESS文件处理完成' }));
    });

    // 图片处理任务
    gulp.task('image', function () {
        return gulp.src(CONFIG.image.entry)        //引入所有需处理的图片
            .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))      //压缩图片
            // 如果想对变动过的文件进行压缩，则使用下面一句代码
            // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))) 
            .pipe(gulp.dest(CONFIG.image.output))
            .pipe(notify({ message: '图片处理完成' }));
    });
}

module.exports = tasks;