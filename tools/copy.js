var fs = require('fs-extra');

fs.copy('./src/server', './build/server', function() {
  console.log('copied server');
});

fs.copy('./package.json', './build/package.json', function() {
  console.log('copied package');
});

fs.copy('./src/app/index.html', './build/app/index.html', function() {
  console.log('copied index.html');
});

fs.copy('./src/app/dist', './build/app/dist', function() {
	console.log('copied build folder');
})