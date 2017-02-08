define(function (require) {
            
    // sub components
    var displayHours = require("../displayHours");
    var inputHours = require("../inputHours");
       
    // create input number component
    var addTime = React.createClass({
        
        displayName: "addTime",
        
        // properties
        propTypes: {
            payPeriod: React.PropTypes.arrayOf(
                React.PropTypes.object
            ),
            updateHours: React.PropTypes.func,
            settings: React.PropTypes.object
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
            
            // set state
            this.setState({
                edit: {
                    week: parseInt(event.target.dataset.week),
                    day: parseInt(event.target.dataset.day)
                }
            });
            
        },
        
        // listen for editing finish
        _save: function(event) {
            
            // stop default
            event.preventDefault();
            
            // get bound data
            var week = this.state.edit.week;
            var day = this.state.edit.day;
            
            // get input
            var input = event.target;
            
            // clone data
            var data = this.state.data.slice();
            
            // get edited row
            var editDay = data[week].dates[day];
            
            // update data based on input
            editDay.end = editDay.start + parseFloat(input.value);
            
            // expose to parent
            this.props.updateHours(data);
        },
        
        // render
        render: function() {
                        
            // week wrap
            return React.DOM.div(
                
                // attributes
                {
                    onDoubleClick: this._showEditor,
                    onBlur: this._save,
                    onChange: this._save
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
                                    hours: content.end - content.start,
                                    day: idxD,
                                    week: idxW
                                });
                    
                                // check if edit is set and
                                // if the active edit is this day
                                if (edit && edit.week === idxW && edit.day === idxD) {
                                     
                                    // make a form to input the day hours
                                    hoursInput = React.createElement(inputHours, {
                                        max: this.props.settings.max,
                                        min: this.props.settings.min,
                                        step: this.props.settings.step,
                                        dayID: day.id,
                                        hours: day.end - day.start,
                                        name: day.name,
                                        onDoubleClick: this.focus
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
    return addTime;
    
});