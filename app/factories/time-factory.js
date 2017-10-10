var config = require("../app-frontend-config");
var app = window.app;
require("../factories/utils-factory");

var moment = require("moment");

app.timeFactory = (function() {
    
    var utilsFactory = app.utilsFactory;
    
    return {
        
        // generate a pay period week
        generatePayPeriod: function() {
            
            var _self = this;
            
            // get the last week of current pay period
            var endWeek = _self.getToday();
            
            // pay period indices from calendar year
            var payPeriodWeeks = [endWeek - 1, endWeek];
            
            // empty array to populate pay period objects
            var payPeriod = [];

            // loop through each pay period week of year
            for (var i = 0; i < payPeriodWeeks.length; i++) {

                // generate week
                var week = _self.generateWeek(payPeriodWeeks[i], i);

                // week
                var weekObj = _self.setWeek(i, week);

                // add to pay period
                payPeriod.push(weekObj);

            }

            return payPeriod;
            
        },
        
        // generate a week of date data
        generateWeek: function(weekIdx, payPeriodIdx, today) {
            
            var _self = this;
            
            // set custom naming on days of the week
            var dayNames = _self.setDayNaming();
            
            // get last day of week 1
            var day = moment().day("Saturday").week(weekIdx);
            
            // label this
            var week = _self.getWeek(day, dayNames, today, config().time);
            
            // names
            _self.getWeekNames(week, today, dayNames, config().time, payPeriodIdx);
            
            return week;
            
        },
        
        // get today's data
        getToday: function() {
            
            // get today's date data
            var today = moment();
            
            // get current pay period in the calendar year
            var payPeriodOfYear = parseInt(moment(today).format("w"), 10);
            
            // pay period index in array of pay period weeks
            // assumes a pay period begins on an even week number and contains 2 weeks
            var endWeek = payPeriodOfYear % 2 === 0 ? payPeriodOfYear + 1 : payPeriodOfYear;
            
            return {
                today: today,
                endWeek: endWeek
            };
            
        },
        
        // get week model
        getWeekModel: function(day, payPeriodIdx, today, daysOfWeek) {
            
            return {
                name: day.subtract(1, "day").calendar(today, daysOfWeek),
                nameStandard: day.format("D MMMM"),
                dateNumber: day.format("D"),
                id: day.format("YYYY-MM-DD"),
                hours: day.day() > 0 && day.day() < 6 ? config().time.day : 0,
                startForecast: config().time.start[day.day()],
                endForecast: config().time.end[day.day()],
                weekIdx: payPeriodIdx,
                start: 0,
                end: 8
            };
            
        },
        
        // get week names
        getWeekNames: function(week, today, daysOfWeek, hours, payPeriodIdx) {
            
            var _self = this;
            
            // create an array of day names
            for (var i=0; i < 6; i++) {
                
                // create day data
                var dayDate = _self.getWeekModel(moment(week[i].id), payPeriodIdx, today, daysOfWeek);

                // add to array
                week.push(dayDate);
                
            }
            
        },
        
        // get week to render
        getWeek: function(day, daysOfWeek, today, hours, payPeriodIdx) {
            
            return [
                {
                    name: day.calendar(today, daysOfWeek),
                    nameStandard: day.format("D MMMM"),
                    dateNumber: day.format("D"),
                    id: day.format("YYYY-MM-DD"), 
                    hours: day.day() > 0 && day.day() < 6 ? hours.day : 0,
                    startForecast: hours.start[day.day()],
                    endForecast: hours.end[day.day()],
                    weekIdx: payPeriodIdx,
                    //start: a,
                    start: 0,
                    end: 8
                    //end: getRandomInt(a, a + hours.day)
                }
            ];
            
        },
        
        // set day of the week naming relative to today
        setDayNaming: function() {
            
            // custom day names
            return {
                sameDay: "[Today]",
                nextDay: "[Tomorrow]",
                nextWeek: function(now) {
                    if (now.week() === this.week()) {
                        return "dddd";
                    } else if (now.week() !== this.week() && (this.dayOfYear() - now.dayOfYear()) <= 2) {
                        return "dddd";
                    } else {
                        return "[Next] dddd";
                    };
                },
                lastDay: "[Yesterday]",
                lastWeek: function(now) {
                    if (now.week() === this.week() && (now.dayOfYear() - this.dayOfYear()) < 5) {
                        return "dddd";
                    } else if (this.week() % 2 !== 0) {
                        return "dddd";
                    } else {
                        return "[Last] dddd";
                    };
                },
                sameElse: function(now) {
                    if (this.dayOfYear() - now.dayOfYear() >= 6) {
                        return "[Next] dddd";
                    } else if (now.dayOfYear() - this.dayOfYear() >= 6) {
                        return "[Last] dddd";
                    } else {
                        return "dddd";
                    }
                }
            };
                
        },
        
        // set week model
        setWeek: function(idx, week) {
            
            // data obj for a week
            return {
                name: "week " + (idx + 1),
                start: week[week.length - 1].nameStandard,
                end: week[0].nameStandard,
                dates: week
            };
            
        }
        
    };
    
})();