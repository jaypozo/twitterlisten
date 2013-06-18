var TwitterListen = require('../index.js');


var twitter_listen = new TwitterListen(["polo","yolo"]);

twitter_listen.on('tweet_error', function(err){
  console.log('error');
  console.log(err);
})

twitter_listen.on('tweet', function(tweet){
  console.log('==========');
  console.log(tweet.text);
})

