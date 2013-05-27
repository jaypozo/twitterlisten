var OAuth = require('OAuth')
,   auth_data = require('./auth_data.json')
,   consumer_key = auth_data.consumer_key
,   consumer_secret = auth_data.consumer_secret
,   access_token = auth_data.access_token
,   access_token_secret = auth_data.access_token_secret;

var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token'
  , 'https://api.twitter.com/oauth/access_token'
  , consumer_key
  , consumer_secret
  , '1.0A'
  , null
  , 'HMAC-SHA1'
);

oauth.get(
  'https://stream.twitter.com/1.1/statuses/filter.json?track=kelowna'
  , access_token
  , access_token_secret,
  function(err,data,res){
    if (err) throw err;
    console.log(require('util').inspect(data));
  }
)
