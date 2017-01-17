define(function (require) {
        
    // data
    var hours = require("./settings");
    var payPeriod = require("./payPeriod");
    
    // lifecycle
    var logMixin = {
        _log: function(methodName, args) {
            console.log(methodName, args);
        },
        componentWillUpdte: function() {
            this._log("componentWillUpdate", arguments);
        },
        componentDidUpdate: function() {
            this._log("componentDidUpdate", arguments);
        },
        componentWillMount: function() {
            this._log("componentWillMount", arguments);
        },
        componentDidMount: function() {
            this._log("componentDidMount", arguments);
        },
        componentWillUnmount: function() {
            this._log("componentWillUnmount", arguments);
        }
    };
    
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
                                        name: day.name,
                                        logs: [logMixin]
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