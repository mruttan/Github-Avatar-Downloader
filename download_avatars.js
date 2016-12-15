var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "mruttan";
var GITHUB_TOKEN = "a33de2e8c4885a80071d2ea24c7efea3e94337ba";


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);

  var option = {
  	headers: {'user-agent': 'GitHub Avatar Downloader'}
  };
  var body = '';
  
  request.get(requestURL, option)
  		.on('error', function (err) {
			throw err;
		})
		.on('response', function(response) {
			console.log('Response Status Code: ', response.statusCode);
			response.setEncoding('utf8')
					.on('data', function(data) {
						body += data;
					});
		})
		.on('end', function() {
			console.log("Avatar URLs");
			body = JSON.parse(body);
			body.forEach(function(key) {
				console.log(key.avatar_url);
			});
		})
}

getRepoContributors("jquery", "jquery", function(err,result){
	console.log("Errors:", err);
	console.log("Result:", result);
});