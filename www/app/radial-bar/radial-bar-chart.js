define(function (require) {
    
    var payPeriod = require("../payPeriod");
    var settings = require("../settings");
    var arc = require("./arc-component");
    var label = require("./label-component");
    
    // create radial viz
    var chart = React.createClass({
        
        displayName: "chart",
        
        // properties
        propTypes: {
            height: React.PropTypes.number.isRequired,
            width: React.PropTypes.number.isRequired,
            padAngle: React.PropTypes.number.isRequired,
            rings: React.PropTypes.arrayOf(
                React.PropTypes.object
            ),
            ticks: React.PropTypes.arrayOf(
                React.PropTypes.object
            )
        },
        
        // set state
        getInitialState: function () {
            return {
                rings: this.props.rings,
                slices: this.props.ticks,
                width: this.props.width,
                height: this.props.height,
                padAngle: this.props.PadAngle,
                radius: Math.min(this.props.width, this.props.height) / 2
            }
        },
        
        // render
        render: function() {
                        
            // chart wrap
            return React.DOM.div(
                
                // attributes
                null,

                // content
                React.DOM.svg(
                    
                    // attributes
                    {
                        viewBox: "0 0 " + this.props.width + " " + this.props.height
                    },

                    // slice wrap
                    React.DOM.g(
                        
                        {
                            transform: "translate(" + (this.props.width / 2) + "," + (this.props.height / 2) + ")"
                        },
                        
                        // each slice
                        this.state.slices.map(function(slice, idx) {
                            
                            return React.DOM.g(
                                
                                // attributes
                                {
                                    key: idx
                                },
                                
                                // content
                                // label
                                React.createElement(label, {
                                    arc: slice,
                                    radius: this.state.radius,
                                    rings: this.state.rings.length
                                })
                            
                            )
                            
                        },this)
                    ),
                    
                    // ring wrap
                    React.DOM.g(
                        
                        // attributes
                        {
                            transform: "translate(" + (this.props.width / 2) + "," + (this.props.height / 2) + ")"
                        },
                        
                        // each ring
                        this.state.rings.map(function(ring, idx) {
                            
                            return React.DOM.g(

                                // attributes
                                {
                                    key: idx
                                },

                                // arc
                                React.createElement(arc, {
                                    ring: ring,
                                    radius: this.state.radius,
                                    idx: idx
                                })

                            )

                        }, this)

                    )
                    
                )
                
            )
            
        }
        
    });
    
    return React.createElement(chart, {
        height: 500,
        width: 500,
        padAngle: 0,
        rings: payPeriod[0].dates,
        ticks: settings.ticks
    });
    
});