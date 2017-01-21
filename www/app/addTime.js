define(function (require) {
        
    var hours = require("./settings");
    var payPeriod = require("./payPeriod");
    var mixins = require("./logMixins");
    
    // hours
    var displayHours = require("./displayHours");
    var inputHours = require("./inputHours");
       
    // create input number component
    var addTime = React.createClass({
        
        displayName: "addTime",
        
        // properties
        propTypes: {
            payPeriod: React.PropTypes.arrayOf(
                React.PropTypes.object
            )
        },
        
        // set state
        getInitialState: function() {
            return {
                data: this.props.payPeriod,
                edit: null
            };
        },
        
        // listen for click on day
        _showEditor: function(event) {
            this.setState({
                edit: {
                    week: parseInt(event.target.dataset.week),
                    day: parseInt(event.target.dataset.day)
                }
            });
        },
        
        // render
        render: function() {
                        
            // week wrap
            return React.DOM.section(
                
                // attributes
                {
                    onClick: this._showEditor
                },
                
                // each week
                this.state.data.map(function(week, idxW) {
                    
                    // each week
                    return React.DOM.div(
                        
                        // attributes
                        {
                            key: idxW
                        },
                        
                        // week header
                        React.DOM.hgroup(
                            
                            // attributes
                            null,
                            
                            // content
                            React.DOM.h1(
                                
                                // attributes
                                null,
                                
                                // content
                                week.name
                                
                            ),
                            
                            React.DOM.h2(
                            
                                // attributes
                                null,

                                // content
                                week.start + " \u2015 " + week.end

                            )
                            
                        ),
                        
                        // each day
                        React.DOM.div(
                        
                            // attributes
                            null,
                            
                            // content
                            week.dates.map(function(day, idxD) {
                                
                                var content = day;
                                var edit = this.state.edit;
                                var hoursInput = React.createElement(displayHours, {
                                    hours: content.hours,
                                    day: idxD,
                                    week: idxW
                                });
                    
                                // check if edit is set and
                                // if the active edit is this day
                                if (edit && edit.week === idxW && edit.day === idxD) {
                                    
                                    // make a form to input the day hours
                                    hoursInput = React.createElement(inputHours, {
                                        dayID: day.id,
                                        hours: day.hours,
                                        name: day.name
                                    });

                                };
                                
                                return React.DOM.div(
                                    
                                    // attributes
                                    {
                                        key: idxD
                                    },
                                    
                                    // content
                                    React.DOM.span(
                                        
                                        // attributes
                                        null,
                                        
                                        // content
                                        content.dateNumber
                                        
                                    ),
                                    
                                    React.DOM.p(
                                        
                                        // attributes
                                        null,
                                        
                                        // content
                                        content.name
                                        
                                    ),
                                    
                                    // hours
                                    hoursInput
                                    
                                )
                                
                            }, this)
                            
                        )
                        
                    )
                    
                }, this)
                                                 
            )
            
        }
        
    });
    
    // day component
    ReactDOM.render(
        React.createElement(addTime ,{
            payPeriod: payPeriod
        }),
        document.getElementById("app")
    );
    
});