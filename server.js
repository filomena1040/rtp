var bodyParser = require("body-parser");
var express = require("express");
const requester = require('request');
var fs = require("fs");

var app = express();
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.raw());
app.set('port',process.env.PORT);

app.post("*", function (req, res) {
  console.log("post")
  var head = req.headers;
  var headerss = JSON.stringify(head).replace("'{", "").replace("}'", "").replace("127.0.0.1:4444", "144.217.129.175")
  var urrrl = "http://144.217.129.175" + req.url
  console.log(head)
  requester.post({
    headers: head,
    url: urrrl,
    form: req.body,
    json: false
  }, function (error, response, body) {
    response.setEncoding('utf8');
    res.set(response.headers);
    console.log(response.statusCode)
    res.statusCode = response.statusCode;
    res.send(body);
  });

});

app.get("*", function (req, res) {
  console.log("Get")
  var head = req.headers;
  var headerss = JSON.stringify(head).replace("'{", "").replace("}'", "").replace("127.0.0.1:4444", "localhost:2057")
  var querystring=req.url
  var urrrl = "http://144.217.129.175" + querystring
  console.log(urrrl)
  console.log(req.body)
  if (!querystring.includes("assets") || !querystring.includes(".")) {
     console.log("1")
    requester.post({
      headers: head,
      url: urrrl,
      body: req.body,
      json: true
    }, function (error, response, body) {
      response.setEncoding('utf8');
      res.set(response.headers);
      console.log(body)
      console.log(response.statusCode)
      res.statusCode = response.statusCode;
      res.send(body);
    });


  } else {
    console.log("2")
    requester({
    headers: head,
    url: "http://146.59.49.68",
    method: 'get'
  }, function (error, response, body) {
    response.setEncoding('utf8');
     console.log(body)
    res.set(response.headers);
    console.log(response.statusCode)
    res.statusCode = response.statusCode;
    res.send(body);
  });
  }


});

app.listen(process.env.PORT, "0.0.0.0", function () {
  console.log(app.get('port'))
  console.log("Starting listen...");
});
