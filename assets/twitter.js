require('dotenv').config();

const fs = require("fs");
const keys = require("./keys.js");
const Twitter = require('twitter');
const client = new Twitter(keys.twitter);

let tweetGet = function() {
    return client.get('statuses/user_timeline', {screen_name: 'KVUE', count: 20}, function(error, tweets) {
      if (!error) {
        let resultArr = ["fail!"];
        for (var i = 0; i < tweets.length; i++) {
          resultArr.push(`${tweets[i].user.screen_name} - (${tweets[i].created_at}):  ${tweets[i].text}`)
        }
        fs.appendFileSync('./log.txt', JSON.stringify([process.argv[2],resultArr], null, 2), 'utf8');
        return console.log(JSON.stringify(resultArr, null, 2));
      }
    })
  };
  
  exports.tweetGet = tweetGet;




