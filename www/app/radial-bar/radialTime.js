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
                data: this.props.payPeriod,
                edit: null
            };
        },
        
        // listen for click on day
        _showEditor: function(event) {
            this.setState({
                edit: {
                    week: parseInt(event.target.dataset.week),
                    day: parseInt(event.target.dataset.day)
                }
            });
        },
        
        // render
        render: function() {
                        
            // week wrap
            return React.DOM.div(
                
                // attributes
                null,
                
                // content
                chart
                
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