define(function (require) {
        
    return React.createClass({
        
        displayName: "inputHours",
        
        //properties
        propTypes: {
            max: React.PropTypes.number,
            min: React.PropTypes.number,
            step: React.PropTypes.number,
            dayID: React.PropTypes.string.isRequired,
            hours: React.PropTypes.number.isRequired,
            name: React.PropTypes.string
        },
        
        // lifecycle
        componentDidMount: function() {
            this.refs.change.focus();
            this.refs.change.select();
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
                    step: this.props.step,
                    type: "number",
                    id: "select-" + this.props.dayID,
                    name: "select-" + this.props.dayID,
                    defaultValue: this.props.hours,
                    ref: "change"
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