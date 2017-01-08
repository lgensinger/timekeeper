var express = require("express");
var bodyParser = require("body-parser");
var app = express();

// set up the request body parser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// backend API
//app.use(require("./routes/workspace-get-configs.route"));

// static front end
app.use("/", express.static(__dirname + "/www"));

var server = app.listen(8001, '0.0.0.0', function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
    
});

module.exports = app;