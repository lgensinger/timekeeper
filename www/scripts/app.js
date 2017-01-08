// render app
window.onload = function() {
    
    // data
    var today = moment();
    var hours = {
        day: 8,
        max: 24
    };
    var weekArray = [
        {
            name: today.format("dddd"), 
            id: today.format("YYYY-MM-DD"), 
            hours: today.day() > 0 && today.day() < 6 ? hours.day : 0
        }
    ];
    
    // create an array of day names
    for (var i=0; i < 6; i++) {
        
        // get day added
        var lastDate = weekArray[i];
        var newDate = moment(lastDate.id);
        var dateObj = {
            name: newDate.add(1, "day").format("dddd"),
            id: newDate.format("YYYY-MM-DD"),
            hours: newDate.day() > 0 && newDate.day() < 6 ? hours.day : 0
        };
        
        // add to array
        weekArray.push(dateObj);
        
    };
       
    // create input number component
    var addTime = React.createClass({
        
        displayName: "addTime",
        
        // properties
        propTypes: {
            weekArray: React.PropTypes.arrayOf(
                React.PropTypes.object
            )
        },
        
        // set default properties
        getDefaultProps: function() {
            return {
                
            };
        },
        
        // set state
        getInitialState: function() {
            return {
                data: this.props.weekArray,
                edit: null
            };
        },
        
        // listen for input change
        _numberChange: function(event) {
            this.setState({
                hours: event.target.value
            });
        },
        
        // render
        render: function() {
            
            // week wrap
            return React.DOM.div(
                
                // attributes
                null,
                
                // each day
                this.state.data.map(function(row, idx) {
                    return React.DOM.div(
                        
                        // attributes
                        {
                            key: idx
                        },
                                                
                        // input
                        /*React.DOM.input({
                            min: 0,
                            max: hours.max,
                            type: "number",
                            name: "select" + row.name,
                            value: row.hours,
                            onChange: this._numberChange
                        }),*/

                        // label
                        React.DOM.label(

                            // attributes
                            {
                                htmlFor: "select" + name
                            }, 

                            // content
                            row.name

                        ),

                        // calculation
                        React.DOM.p(

                            // attributes
                            null, 

                            // content
                            (row.hours * 60) + " minutes")
                        
                    );
                    
                })
                                                 
            );
            
        }
        
    });
    
    // day component
    var dayComponent = ReactDOM.render(
        React.createElement(addTime ,{
            weekArray: weekArray
        }),
        document.getElementById("my-app")
    );
    
};