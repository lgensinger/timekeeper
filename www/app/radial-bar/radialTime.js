define(function (require) {
        
    var hours = require("../settings");
    var payPeriod = require("../payPeriod");
    
    // hours
    var displayHours = require("../displayHours");
    var inputHours = require("../inputHours");
    
    // charts
    var chart = require("./radial-bar-chart");
       
    // create input number component
    var radialTime = React.createClass({
        
        displayName: "radialTime",
        
        // properties
        propTypes: {
            payPeriod: React.PropTypes.arrayOf(
                React.PropTypes.object
            )
        },
        
        // set state
        getInitialState: function() {
            return {
                data: this.props.payPeriod
            };
        },
        
        // render
        render: function() {
                        
            // week wrap
            return React.DOM.div(
                
                // attributes
                null,
                
                // each week
                this.state.data.map(function(week, idx) {
                    
                    // each week
                    return React.DOM.div(
                        
                        // attributes
                        {
                            key: idx
                        },
                        
                        // content
                         React.createElement(chart, {
                            height: 500,
                            width: 500,
                            padAngle: 0,
                            rings: week.dates,
                            ticks: hours.ticks
                        })
                    
                    )
                    
                }, this)
                
            )
            
        }
        
    });
    
    // day component
    ReactDOM.render(
        React.createElement(radialTime ,{
            payPeriod: payPeriod
        }),
        document.getElementById("viz")
    );
    
});