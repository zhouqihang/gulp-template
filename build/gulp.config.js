const dist = 'dist';
const src = 'src';

module.exports = {
    dist,
    src,
    html: {
        entry: `${src}/html/*.html`,
        output: dist,
    },
    js: {
        entry: `${src}/js/index.js`,
        output: `${dist}/js`,
        filename: 'main.js',
        suffix: '.min',
    },
    ts: {
        entry: `${src}/ts/*.ts`,
        output: `${dist}/js`,
        filename: 'main.js',
        suffix: '.min',
    },
    image: {
        entry: `${src}/images/*`,
        output: `${dist}/images`,
    },
    less: {
        entry: `${src}/less/index.less`,
        output: `${dist}/css`,
        filename: 'main.css',
        suffix: '.min',
    },
};