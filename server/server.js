const express = require('express');
const Twitter = require('twit');
const app = express();

const api_client = new Twitter({
    consumer_key: 'pVOe0zizzcxK5weY91JAozxQc',
    consumer_secret: 'zUoAgPCPHSf3mCSJHqwUTEmezdy66Da6ex5Q3GpuGmtjrSIVys',
    access_token: '1381630232260661250-VDBoyO3SRtThbciS9Ttsi6yfvRGTAC',
    access_token_secret: 'yBI90L8ZMpLZiHvj3JYxZjiAtUH85Z7BD4aVNji1jh2J7'
  });
 

  app.get('/home_timeline', (req, res) => {
    const params = { tweet_mode: 'extended', count: 10 };
   
    api_client
      .get(`statuses/home_timeline`, params)
      .then(timeline => {
         
        res.send(timeline);
      })
      .catch(error => {
      res.send(error);
    });
      
});
app.listen(3000, () => console.log('Server running'));

