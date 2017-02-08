define(function () {
       
    // create radial viz
    var arc = React.createClass({
        
        displayName: "arc",
        
        // properties
        propTypes: {
            ring: React.PropTypes.object.isRequired,
            radius: React.PropTypes.number.isRequired,
            idx: React.PropTypes.number.isRequired
        },
        
        // build arc using d3 math
        componentWillMount: function() {
            
            var radius = this.props.radius;
            var spacing = 0.09;
            
            // arc function
            // rotated -90 degrees
            this.arc = d3.svg.arc()
                .startAngle(function(d) { return ((d.start / 24)* 2 * Math.PI) - (90 * (Math.PI/180)); })
                .endAngle(function(d) { return ((d.end / 24)* 2 * Math.PI) - (90 * (Math.PI/180)); })
                .innerRadius(function(d) { return ((this.props.idx + 1) * 0.1) * radius; })
                .outerRadius(function(d) { return (((this.props.idx + 1) * 0.1) + spacing) * radius; });
            
        },
        
        // arc function
        createArc: function(_self) {
            
            var arcD = _self.arc(this.props.ring);
            var startPoint = arcD.split(" ")[0].split("A")[0].split("M")[1].split(",");
                            
            return React.DOM.g(

                // attributes
                null,

                // arc
                React.DOM.path(

                    // attributes
                    {
                        d: _self.arc(this.props.ring)
                    },

                    // content
                    null

                ),
                
                // drag handle
                React.DOM.circle(
                    
                    // attributes
                    {
                        r: 10,
                        cx: startPoint[0],
                        cy: startPoint[1]
                    },
                    
                    // content
                    null
                    
                )

            )
                                        
        },
        
        // render
        render: function() {
            
            var arc = this.createArc(this);
            
            // svg arc
            return arc
            
        }
        
    });
    
    return arc
    
});