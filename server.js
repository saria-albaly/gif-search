const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

app.use(express.static('public'));
app.get('/gifs', (req, response) => {
    let term = req.query.term;
    let limit = req.query.limit;
    let offset = req.query.offset;
    term = encodeURIComponent(term);
    limit = encodeURIComponent(limit);
    offset = encodeURIComponent(offset);

  let output = '';

     var options = {
  host: 'api.giphy.com',
  port: 80,
  path: '/v1/gifs/search?q=' + term + '&api_key=FuOjuVG80BWjfDCfgLB4cJG2OxCBM0Mu&limit='+limit+'&offset='+offset,
};

  const request = http.request(options, (res) => {
    console.log(`${options.host} : ${res.statusCode}`);
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      output += chunk;
    });

    res.on('end', () => {
      let obj = JSON.parse(output);
      return response.json(obj);

    });
  });

  request.on('error', (err) => {
     res.send('error: ' + err.message);
  });

  request.end();

 });

app.listen(port, () => {
  console.log('Giphy Search API listening on port: ', port);
});