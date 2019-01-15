

//importing request package
var request = require('request');

// console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  //url we are using to download
  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";


  request(url, function(err, res, body) {
    cb(err, body);
  });
}


//hard coding the call of function getRepoContributors
getRepoContributors("jquery", "jquery", function(err, result){
  console.log("Errors:", err);
  console.log("Result:", result);
});