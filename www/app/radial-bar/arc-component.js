define(function () {
    
    var isSelected = false;
    var handleRadius = 10;
    var initialX;
    var initialY;
    var currentX;
    var currentY;
    var lastAngle;
    var nextAngle;
    var previousAngle;
    var currentAngle;
    var startAngle;
    var handle;
              
    // create radial viz
    var arc = React.createClass({
        
        displayName: "arc",
        
        // properties
        propTypes: {
            ring: React.PropTypes.object.isRequired,
            radius: React.PropTypes.number.isRequired,
            idx: React.PropTypes.number.isRequired,
            updateRing: React.PropTypes.func,
            settings: React.PropTypes.object
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

        // drag event starts
        _dragStart: function(event) {
            
            console.log("start drag");
            
            // set selection tracking
            isSelected = true;
                            
            // set selected arc handle
            handle = event.target;
            var canvas = document.getElementsByTagName("svg")[this.state.ring.weekIdx];
            
            // set initial x,y
            initialX = parseFloat(event.target.getAttributeNS(null, "cx"));
            initialY = parseFloat(event.target.getAttributeNS(null, "cy"));
            
            // set current x,y
            this._setCurrentXY(event);
            
            // find angle
            var angle = this._findAngle(currentX, currentY * -1, "degrees");
            
            // set angle starting point
            //startAngle = angle;
            
            // set angles on either side of current angle
            //previousAngle = angle - this.props.ticks[0].degree;
            //nextAngle = angle + this.props.ticks[0].degree;
            
            // bind mouse move to handle
            canvas.addEventListener("mousemove", this._drag, false);
            canvas.addEventListener("mouseup", this._dragEnd, false);

        },
        
        // drag happening
        _drag: function(event) {
                       
            // clone data
            var ring = Object.assign({}, this.state.ring);

            // set current x,y
            this._setCurrentXY(event);

            // find angle
            var angle = this._findAngle(currentX, currentY, "degrees");
            var angleRadians = this._findAngle(currentX, currentY, "radians");
            
            // determine if found angle is between current angle and next step angle or last step angle
            //var direction = angle < lastAngle && angle > previousAngle ? "add" : "remove";
            var xy = this._findCircleXY(angleRadians);
            handle.setAttribute("cx", xy.x); 
            handle.setAttribute("cy", xy.y);

            // update data based on interaction
            //ring.end = ring.end + 1;

            // set up ring with key to pass up to parent
            /*var data = {
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

            // set x,y for next drag
            currentX = event.clientX;
            currentY = event.clientY;*/
            
        },
        
        // drag event ends
        _dragEnd: function(event) {
            
            if (isSelected) {
            
                console.log("drag end");

                // set selected arc handle
                var canvas = document.getElementsByTagName("svg")[this.state.ring.weekIdx];

                // remove listener from handle
                canvas.removeEventListener("mousemove", this._drag, false);
                canvas.removeEventListener("mouseup", this._dragEnd, false);
                
                // set selection tracking
                isSelected = false;
                
            };
            
        },
        
        // get scaled svg cursor from mouse positon
        _svgCursor: function(event, coords, svg) {
                
            coords.x = event.clientX;
            coords.y = event.clientY;

            return coords.matrixTransform(svg.getScreenCTM().inverse());
            
        },
        
        // get angle from x,y
        _findAngle: function(x, y, format) {
        
            Math.degrees = function(radians) {
                return radians * 180 / Math.PI;
            };

            Math.radians = function(degrees) {
                return degrees * Math.PI / 180;
            };     

            // calculate radians and degrees
            var angleInRadians = Math.atan2(y, x);
            var angleInDegrees = Math.degrees(angleInRadians);
            var angles = { radians: angleInRadians, degrees: angleInDegrees };

            return angles[format];

        },
        
        // find x,y along a circle
        _findCircleXY: function(angle) {
            
            // get radius for ring
            var radius = Math.sqrt(Math.pow(initialX, 2) + Math.pow(initialY, 2));
            
            // calculate the x,y for the individual ring
            // based on the mouse poitin arc angle from center of circle
            var r = radius;
            var x = 0 + r * Math.cos(angle);
            var y = 0 + r * Math.sin(angle);
            
            return { x: x, y: y };
            
        },
        
        // set current scaled svg cursor
        _setCurrentXY: function(event) {
            
            // get local svg
            var svg = document.getElementsByTagName("svg")[this.state.ring.weekIdx];
            
            // create svg point object
            var point = svg.createSVGPoint();
            
            // get svg points from cursor location
            var svgCoords = this._svgCursor(event, point, svg);
            
            // set initial x,y
            currentX = svgCoords.x - this.props.radius;
            currentY = svgCoords.y - this.props.radius;
            
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
                React.DOM.circle({cx: alcMidpoint[0], cy: alcMidpoint[1], r: handleRadius, cursor: "grab", cursor: "-webkit-grab", onMouseDown: this._dragStart, fill: "orange"}, null)
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