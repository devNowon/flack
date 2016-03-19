var fs = require('fs-extra');

fs.copy('./src/server', './build/server', function() {
  console.log('copied server');
});

fs.copy('./package.json', './build/package.json', function() {
  console.log('copied package');
});

fs.copy('./src/app', './build/app', function() {
  console.log('copied app folder');
});
/*
fs.copy('./src/app/dist', './build/app/dist', function() {
	console.log('copied build folder');
})*/