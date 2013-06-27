var OAuth = require('OAuth')
,   fs = require('fs')
,   auth_data = fs.existsSync('../auth_data.json') ? require('../auth_data.json') : require('./auth_data.json')
,   consumer_key = auth_data.consumer_key
,   consumer_secret = auth_data.consumer_secret
,   access_token = auth_data.access_token
,   access_token_secret = auth_data.access_token_secret
,   https = require('https')
,   util = require('util')
,   events = require('events')
,   keyword_params = ''
,   request = {};

var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token'
  , 'https://api.twitter.com/oauth/access_token'
  , consumer_key
  , consumer_secret
  , '1.0A'
  , null
  , 'HMAC-SHA1'
);

var TwitterListen = function(keyword_array){
  var self = this;
  keyword_params = '&track='+encodeURIComponent(keyword_array.join());

  request = oauth.get(
    'https://stream.twitter.com/1.1/statuses/filter.json?delimited=length'+keyword_params
    , access_token
    , access_token_secret
  )

  request.addListener('response', function (response) {
    response.setEncoding('utf8');
    response.addListener('data', function (chunk) {
      try{
        var tweet_length = chunk.substr(0,chunk.indexOf("\r"));
        var tweet_data_string = chunk.substr(chunk.indexOf("\r")+2, tweet_length-2);
        var tweet_object = JSON.parse(tweet_data_string);
        self.emit('tweet',tweet_object);
      } catch(err) { 
        self.emit('tweet_error', {message:'invalid_tweet', data:chunk});
      };
    });
    response.addListener('end', function () {
      console.log('====END====');
    });
  });

  request.end();
}

util.inherits(TwitterListen,events.EventEmitter);
module.exports = TwitterListen;
