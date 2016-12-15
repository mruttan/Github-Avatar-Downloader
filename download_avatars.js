var request = require('request');
var fs = require('fs');

var GITHUB_USER = "mruttan";
var GITHUB_TOKEN = "a33de2e8c4885a80071d2ea24c7efea3e94337ba";


function getRepoContributors(repoOwner, repoName, cb) {

  if (repoOwner == null || repoName == null) {
  	console.log("\nTry again.\t node download_avatar.js <owner> <repo>\n");
  	return null;
  }

  console.log('Welcome to the GitHub Avatar Downloader!');

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
				cb(key.avatar_url, './' + key.login + '.jpg');
			});
		})
}

getRepoContributors("jquery", "jquery", downloadImageByURL);

function downloadImageByURL(url, filePath) {
  request.get(url)
  		.on('error', function(err) {
  			throw err;
  		})
  		.on('response', function(response) {
  			console.log('Response Status Message: ', response.statusMessage);
  			console.log('Downloading image...');
  		})
  		.pipe(fs.createWriteStream(filePath))
  		.on('finish', function(response) {
  			console.log('Download complete');
  		})
}

getRepoContributors(process.argv[2], process.argv[3], downloadImageByURL);