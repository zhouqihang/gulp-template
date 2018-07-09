const tasks = require('./build/gulp.tasks');
const dev = require('./build/gulp.dev');
const prod = require('./build/gulp.prod');

tasks();
dev();
prod();

// ********** tasks ********** //

// gulp build:js => default
// gulp build:ts
// gulp dev:js
// gulp dev:ts