var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "mruttan";
var GITHUB_TOKEN = "a33de2e8c4885a80071d2ea24c7efea3e94337ba";


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
}

getRepoContributors("jquery", "jquery", function(err,result){
	console.log("Errors:", err);
	console.log("Result:", result);
});