
var argv = require('optimist').argv;

if(argv.process == 'before'){
     require('simple-git')(require("path").resolve("./build"))
     //.init()
     //.addRemote('origin', 'https://git.heroku.com/murmuring-ridge-75162.git')
     .pull('origin','master');
     console.log('pulled master')
} else {
     require('simple-git')(require("path").resolve("./build"))
     .add('./*')
     .commit("c")
     .push('origin', 'master')
     .then(function(err){
      if(err)
        console.log(err)
      console.log('deployed')
     });  
}
