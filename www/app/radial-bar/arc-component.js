define(function () {
       
    // create radial viz
    var arc = React.createClass({
        
        displayName: "arc",
        
        // properties
        propTypes: {
            ring: React.PropTypes.object.isRequired,
            radius: React.PropTypes.number.isRequired,
            idx: React.PropTypes.number.isRequired,
            updateRing: React.PropTypes.func
        },
        
        // set state
        getInitialState: function() {
            return {
                ring: this.props.ring
            }
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
        
        componentDidUpdate: function() {

            //console.log(this.state.ring.end);
            //console.log(this.props.ring.end);
        },

        // drag even starts
        _dragStart: function(event) {
            
            console.log("start drag");
                            
            // set selected arc handle
            var handle = event.target;
            var mouseX = event.clientX;
            var mouseY = event.clientY;
            var handleD = handle.getAttribute("d");
            
            // bind mouse move to handle
            handle.addEventListener("mousemove", this._drag, false);
            
        },
        
        // drag handle
        _drag: function(event) {
            
            console.log("dragging");
            
            // clone data
            var ring = Object.assign({}, this.state.ring);
            
            // update data based on interaction
            ring.end = ring.end + 1;
            
            // set up ring with key to pass up to parent
            var data = {
                key: this.props.idx,
                ring: ring
            };
            
            // expose to parent
            this.props.updateRing(data);
            
            // update state so it looks correct
            // TODO figure out why these children don't update from the parent
            this.setState({
                ring: ring
            });
            
        },
        
        // arc render function
        _createArc: function(_self) {
            
            var arcD = _self.arc(this.state.ring);
            
            // good old fashioned SVG path manipulation
            var coords = arcD.split(" ");
            var midSegmentCoords = coords[3].split(",");
            var arcLineConnector = arcD.split("L")[1].split("A")[0];
            var alc_x1 = parseFloat(midSegmentCoords[0]);
            var alc_y1 = parseFloat(midSegmentCoords[1].split("L")[0]);
            var alc_x2 = parseFloat(arcLineConnector.split(",")[0]);
            var alc_y2 = parseFloat(arcLineConnector.split(",")[1]);
            var alcMidpoint = [(alc_x1 + alc_x2) / 2, (alc_y1 + alc_y2 )/ 2];
            var arcEndLine = "M" + alc_x1 + "," + alc_y1 + " L" + arcLineConnector + "Z";
                            
            return React.DOM.g(

                // attributes
                null,

                // arc
                React.DOM.path(

                    // attributes
                    {
                        d: arcD
                    },

                    // content
                    null

                ),
                React.DOM.circle({cx: alcMidpoint[0], cy: alcMidpoint[1], r: 10, cursor: "move", onMouseDown: this._dragStart}, null)
                // handle
                /*React.DOM.path(
                    
                    // attributes
                    {
                        onMouseDown: this._dragStart,
                        strokeWidth: "20px", 
                        d: arcEndLine, 
                        stroke: "currentColor", 
                        fill: "transparent",
                        cursor: "grab", 
                        cursor: "-webkit-grab"
                    }, 
                    
                    // content
                    null
                
                )*/

            )
                                        
        },
        
        // render
        render: function() {
            
            var arc = this._createArc(this);
            
            // svg arc
            return arc
            
        }
        
    });
    
    return arc
    
});