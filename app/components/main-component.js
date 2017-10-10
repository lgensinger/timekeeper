//var config = require("../app-frontend-config");
var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");

var loremIpsum = require("lorem-ipsum");

(function() {
    
    var names = ["John", "Sarah", "Kevin", "Alice"];
    
    var timekeeper = createReactClass({
        
        displayName: "timekeeper",
        
        render: function() {
            
            return (
                React.createElement(
                  "ul",
                  null,
                  names.map(function (name) {
                    return React.createElement(
                      "li",
                      null,
                      name
                    );
                  })
                )
            );
            
        }
        
    });
    
    ReactDOM.render(
        React.createElement(timekeeper, {}),
        document.getElementById("app")
    );
    
})();