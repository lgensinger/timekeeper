// render app
window.onload = function() {
        
    // app
    var hours = {
        day: 8,
        max: 24,
        total: 80
    };
    
    // data
    var today = moment();
    
    // get current pay period
    // assumes a pay period begins on an even week number and contains 2 weeks
    var cWeekNumber = parseInt(moment(today).format("W"));
    
    // generate a week of date data
    function generateWeek(week) {
        
        // custom day names
        var dayNames = {
            sameDay: "[Today]",
            nextDay: "[Tomorrow]",
            nextWeek: "dddd",
            lastDay: "[Yesterday]",
            lastWeek: "[Last] dddd",
            sameElse: "[Last] dddd"
        };
        
        // get last day of week 1
        var day = moment().day("Saturday").week(week);
        
        var week = [
            {
                name: day.calendar(null, dayNames),
                nameStandard: day.format("D MMMM"),
                dateNumber: day.format("D"),
                id: day.format("YYYY-MM-DD"), 
                hours: day.day() > 0 && day.day() < 6 ? hours.day : 0
            }
        ];

        // create an array of day names
        for (var i=0; i < 6; i++) {

            // get day added
            var lastDate = week[i];
            var newDate = moment(lastDate.id);
            var dateObj = {
                name: newDate.subtract(1, "day").calendar(null, dayNames),
                nameStandard: newDate.format("D MMMM"),
                dateNumber: newDate.format("D"),
                id: newDate.format("YYYY-MM-DD"),
                hours: newDate.day() > 0 && newDate.day() < 6 ? hours.day : 0
            };

            // add to array
            week.push(dateObj);

        };
        
        return week;
        
    };
    
    // generate pay period
    function generatePayPeriod(week) {
        
        var weeks = [week - 1, week];
        var payPeriod = [];
        
        // loop through each pay period week of year
        for (var i = 0; i < weeks.length; i++) {
            
            // generate week
            var ppWeek = generateWeek(weeks[i]);

            // week
            var weekObj = {
                name: "week " + (i + 1),
                start: ppWeek[ppWeek.length - 1].nameStandard,
                end: ppWeek[0].nameStandard,
                dates: ppWeek
            };
            
            // add to pay period
            payPeriod.push(weekObj);
            
        };
        console.log(payPeriod);
        return payPeriod;
        
    };
    
    var ppWeekEnd = cWeekNumber % 2 == 0 ? cWeekNumber + 1 : cWeekNumber;
    var payPeriod = generatePayPeriod(ppWeekEnd);
    
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
    
    // hours display
    var displayHours = React.createClass({
        
        displayName: "displayHours",
        
        // lifecycle
        mixins: [logMixin],
        
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
    
    // hours input
    var inputHours = React.createClass({
        
        displayName: "inputHours",
        
        // lifecycle
        mixins: [logMixin],
        
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
    var dayComponent = ReactDOM.render(
        React.createElement(addTime ,{
            payPeriod: payPeriod
        }),
        document.getElementById("app")
    );
    
};