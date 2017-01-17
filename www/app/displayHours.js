define(function () {
    
    return React.createClass({
        
        displayName: "displayHours",
        
        // lifecycle
        //mixins: [logMixin],
        
        // properties
        propTypes: {
            day: React.PropTypes.number.isRequired,
            week: React.PropTypes.number.isRequired,
            hours: React.PropTypes.number.isRequired
        },
        
        // render
        render: function() {
            
            return React.DOM.span(
                                        
                // attributes
                {
                    key: this.props.day,
                    "data-week": this.props.week,
                    "data-day": this.props.day
                },

                // content
                this.props.hours

            )

        }
        
    });
    
});