var app = window.app;
require("../factories/time-factory");

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");

var loremIpsum = require("lorem-ipsum");

(function() {
    
    var timeFactory = app.timeFactory;

    // get pay period data
    var payPeriod = timeFactory.generatePayPeriod();
    console.log(payPeriod);
    
    var timekeeper = createReactClass({
        
        displayName: "timekeeper",
        
        render: function() {
            
            return (
                React.createElement(
                  "ul",
                  null,
                  payPeriod.map(function (week) {
                    return React.createElement(
                      "li",
                      null,
                      week.name
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