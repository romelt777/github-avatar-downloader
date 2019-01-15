

//importing request package
var request = require('request');


//importing file system package
var fs = require('fs');

// //command line arguments
if(process.argv[3] === undefined || process.argv[2] === undefined){
    console.log("Error: Please provide another argument.")
    process.exit(-1);
  }
var owner = process.argv[2].split(" ");
// console.log(owner);
var repo = process.argv[3];
// console.log(repo);

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
    var result = JSON.parse(body);
    cb(err, result);
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



getRepoContributors(owner, repo, function(err, result){
  console.log("Errors:", err);
  for (let i = 0; i < result.length ; i++) {
    downloadImageByURL(result[i]['avatar_url'], "./avatars/" + result[i]['login']+ ".jpg");
    console.log("downloaded " + i + " avatar");
  };
});

