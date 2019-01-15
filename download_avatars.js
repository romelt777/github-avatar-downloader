

//importing request package
var request = require('request');

// console.log('Welcome to the GitHub Avatar Downloader!');

//importing github token
var gToken = require('./secret.js');


function getRepoContributors(repoOwner, repoName, cb) {

  var options {
    //url we are using to download
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",

    //adding headers : allows more info to be passed between client and server
    headers: {
      'User-Agent': 'request'
      'Authorization: token': gToken.GITHUB_TOKEN;

    }

  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}


//hard coding the call of function getRepoContributors
getRepoContributors("jquery", "jquery", function(err, result){
  console.log("Errors:", err);
  console.log("Result:", result);
});