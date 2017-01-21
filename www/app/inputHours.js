define(function (require) {
    
    var hours = require("./settings");
    var mixins = require("./logMixins");
    
    return React.createClass({
        
        displayName: "inputHours",
        
        // lifecycle
        mixins: mixins,
        
        //properties
        propTypes: {
            max: React.PropTypes.number,
            min: React.PropTypes.number,
            dayID: React.PropTypes.string.isRequired,
            hours: React.PropTypes.number.isRequired,
            name: React.PropTypes.string
        },
        
        // set default properties
        getDefaultProps: function() {
            return {
                max: hours.max,
                min: 0
            };
        },
        
        // render
        render: function() {
            
            return React.DOM.form(

                // attributes
                null,

                // input
                React.DOM.input({
                    min: this.props.min,
                    max: this.props.max,
                    type: "number",
                    id: "select-" + this.props.dayID,
                    name: "select-" + this.props.dayID,
                    defaultValue: this.props.hours
                }),

                // label
                React.DOM.label(

                    // attributes
                    {
                        htmlFor: "select-" + this.props.dayID
                    }, 

                    // content
                    this.props.name

                )

            )
            
        }
        
    });
        
});