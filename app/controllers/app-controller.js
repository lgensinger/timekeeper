//var config = require("../app-frontend-config");
//var content = require("../app-content");
var app = window.app;
var React = require("react");
var ReactDOM = require("react-dom");
//var createReactClass = require("create-react-class");

app.appController = (function() {
    
    ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById("app")
);
    
})();