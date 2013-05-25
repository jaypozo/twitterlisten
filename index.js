var OAuth = require('OAuth')
,   stream_endpoint = 'https://stream.twitter.com/1.1/statuses/filter.json'
,   req_token_endpoint = 'https://api.twitter.com/oauth/request_token'
,   access_token_endpoint = 'https://api.twitter.com/oauth/access_token'
,   auth_data = require('./auth_data.json')
,   consumer_key = auth_data.consumer_key
,   appl_secret = auth_data.appl_secret
,   parameters = '?track='
,   watch_words = ['#yolo','kelowna'];


var req = https.request(https_options, function(res){
  console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);

  res.on('data',function(data){
    process.stdout.write(data);
  });
});
req.end();

req.on('error', function(err){
  console.error(err);
})
