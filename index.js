var OAuth = require('OAuth')
,   auth_data = require('./auth_data.json')
,   consumer_key = auth_data.consumer_key
,   consumer_secret = auth_data.consumer_secret
,   access_token = auth_data.access_token
,   access_token_secret = auth_data.access_token_secret
,   https = require('https');

var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token'
  , 'https://api.twitter.com/oauth/access_token'
  , consumer_key
  , consumer_secret
  , '1.0A'
  , null
  , 'HMAC-SHA1'
);

var request = oauth.get(
  'https://stream.twitter.com/1.1/statuses/filter.json?delimited=length&track=yolo'
  , access_token
  , access_token_secret
)


request.addListener('response', function (response) {
  response.setEncoding('utf8');
  response.addListener('data', function (chunk) {
    try{
      var tweet_length = chunk.substr(0,chunk.indexOf("\r"));
      var tweet_data_string = chunk.substr(chunk.indexOf("\r")+2, tweet_length-2);
      console.log(JSON.parse(tweet_data_string).text);
      console.log('===================================');
    } catch(err) { 
      console.log('invalid tweet')
      console.log(chunk);
    };
  });
  response.addListener('end', function () {
    console.log('====END====');
  });
});
request.end();
