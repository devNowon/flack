var del = require('del');

del.sync(['./build/*', '!./build/.git']);
console.log('deleted')