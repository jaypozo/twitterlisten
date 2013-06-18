twitterlisten
=============

Listen to Twitter for keywords.

Install
=======

```
npm install twitterlisten
```

Configure
=========

Create ```auth_data.json``` and add your data from Twitter. https://dev.twitter.com/apps

Here's a sample:

```
{
  "consumer_key":"your_consumer_key_goes_here",
  "consumer_secret":"your_consumer_secret_goes_here",
  "access_token":"your_access_token_goes_here",
  "access_token_secret":"your_access_token_secret_goes_here"
}
```

Usage
=====

```
var twitter_listen = new TwitterListen(['#awesome','@someguy','#yoloyolo']);
twitter_listen.on('event', function(err,event_data){
  doSomething();
});
```
