define(function () {
       
    // create label for radial bar
    var label = React.createClass({
        
        displayName: "label",
        
        // properties
        propTypes: {
            arc: React.PropTypes.object.isRequired,
            radius: React.PropTypes.number.isRequired,
            rings: React.PropTypes.number.isRequired
        },
        
        // build arc using d3 math
        componentWillMount: function() {
            
            var radius = this.props.radius;
            var spacing = 0.09;
            var rings = this.props.rings;
            
            // arc function
            // rotated -90 degrees
            this.arc = d3.svg.arc()
                .startAngle(function(d) { return ((d.idx / 24)* 2 * Math.PI) - (90 * (Math.PI/180)); })
                .endAngle(function(d) { return (((d.idx / 24)* 2) * Math.PI) - (90 * (Math.PI/180)); })
                .innerRadius(((rings + 1) * 0.1) * radius)
                .outerRadius((((rings + 1) * 0.1) + (spacing * 2)) * radius);
            
        },
        
        // arc label function
        createLabel: function(_self) {
                            
            return React.DOM.text(
                
                // attributes
                {
                    dy: "0.3em",
                    transform: "translate(" + _self.arc.centroid(this.props.arc) + ")"
                },
                
                // content
                this.props.arc.idx
            
            )
                                        
        },
        
        // render
        render: function() {
            
            var label = this.createLabel(this);

            // svg arc tick label
            return label;
            
        }
        
    });
    
    return label
    
});