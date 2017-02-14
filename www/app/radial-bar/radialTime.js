define(function (require) {
        
    // data
    var chart = require("./radial-bar-chart");
       
    // create input number component
    return React.createClass({
        
        displayName: "radialTime",
        
        // properties
        propTypes: {
            payPeriod: React.PropTypes.arrayOf(
                React.PropTypes.object
            ),
            updateHours: React.PropTypes.func,
            settings: React.PropTypes.object
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
                    
                    var self = this;
                        
                    // save data from components
                    function updateRings(arg) {
                        
                        // clone data
                        var data = self.state.data.slice();
                        var week = data[arg.key];
                        
                        // update individual week's data in the pay period
                        week.dates = arg.rings;
                        
                        // expose to parent
                        self.props.updateHours(data);
                        // set the state to reflect interaction
                        /*self.setState({
                            rings: data
                        });*/

                    };
                    
                    // each week
                    return React.DOM.div(
                        
                        // attributes
                        {
                            key: idx,
                        },
                        
                        // content
                         React.createElement(chart, {
                            height: 500,
                            width: 500,
                            padAngle: 0,
                            rings: week.dates,
                            ticks: this.props.settings.ticks,
                            updateRings: updateRings
                        })
                    
                    )
                    
                }, this)
                
            )
            
        }
        
    });
    
});