

//importing request package
var request = require('request');


//importing file system package
var fs = require('fs');

// console.log('Welcome to the GitHub Avatar Downloader!');

//importing github token
var gToken = require('./secret.js');


function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    //url we are using to download
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",

    //adding headers : allows more info to be passed between client and server
    headers: {
      'User-Agent': gToken

    }

  };

  request(options, function(err, res, body) {
    var picurl = JSON.parse(body);
  //  console.log("TEST" , result.length);
    cb(err, picurl);
  });
};


function downloadImageByURL(url, filePath) {

  request.get(url)
    .on('error', function (err) {
    console.log("Something is wrong !")
    throw err;
    })
    .on('response', function (response) {
      console.log('Response Status Code: ', response.statusCode);
    })
    .pipe(fs.createWriteStream(filePath));
};


//hard coding the call of function getRepoContributors
getRepoContributors("jquery", "jquery", function(err, result){
  console.log("Errors:", err);
  for (let i = 0; i < result.length; i++) {
    console.log(result[i]['avatar_url']);
  };
});



//hard code test
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./avatars/kvirani.jpg");
