var bodyParser = require("body-parser");
var express = require("express");
const requester = require('request');

var app = express();
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.raw());
app.set('port', process.env.PORT);

app.post("/",function (req, res) {
var head=req.headers;
console.log(head)
console.log(req.body)
 console.log("ffff")
 var headerss=JSON.stringify(head).replace("'{","").replace("}'","").replace("host","hello").replace("content-length","content2")
 requester.post({
    headers:JSON.parse(headerss),
    url:     'http://127.0.0.1',
    body:   req.body,
    json: true
  }, function(error, response, body){
      console.log("ffff")
      console.log(body)
      res.set(response.headers);
      console.log(response.statusCode)
      res.statusCode = response.statusCode;
      res.send(body);
  });


});


app.get("/",function (req, res) {
var head=req.headers;
console.log(head)
console.log(req.body)
 console.log("ffff")
 var headerss=JSON.stringify(head).replace("'{","").replace("}'","").replace("host","hello").replace("content-length","content2")
 requester.post({
    headers:JSON.parse(headerss),
    url:     'http://127.0.0.1',
    body:   req.body,
    json: true
  }, function(error, response, body){
      console.log("ffff")
      console.log(body)
      res.set(response.headers);
      console.log(response.statusCode)
      res.statusCode = response.statusCode;
      res.send(body);
  });


});

app.listen(process.env.PORT, "0.0.0.0", function() {
    console.log(app.get('port'))
    console.log("Starting listen...");
});
