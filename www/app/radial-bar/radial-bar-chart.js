define(function (require) {
    
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
            ),
            updateRings: React.PropTypes.func
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
        
        // save data from components
        _updateRing: function(arg) {
            
            var self = this;
            
            // clone data
            var rings = self.state.rings.slice();

            // update individual ring in a week's set of rings
            rings[arg.key] = arg.ring;

            // set up ring with key to pass up to parent
            var data = {
                key: arg.ring.weekIdx,
                rings: rings
            };

            // expose to parent
            self.props.updateRings(data);
            
            // set the state to reflect interaction
            // TODO figure out why these children don't update from the parent
            self.setState({
                rings: rings
            });

        },
        
        // render
        render: function() {

                // chart
            return React.DOM.svg(
                    
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
                                idx: idx,
                                updateRing: this._updateRing
                            })

                        )

                    }, this)

                )

            )
            
        }
        
    });
    
    return chart;
    
});