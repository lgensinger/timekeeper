define(function (require) {
        
    // data
    var hours = require("../settings");
    var displayHours = require("../displayHours");
    var inputHours = require("../inputHours");
    var chart = require("./radial-bar-chart");
       
    // create input number component
    return React.createClass({
        
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
    
});