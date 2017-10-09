define(function(require) {
    
    function getRandomInt(min, max) {
        
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    
    };
    
    var hours = require("./settings");
  
    // data
    var today = moment();

    // get current pay period
    // assumes a pay period begins on an even week number and contains 2 weeks
    var cWeekNumber = parseInt(moment(today).format("w"));
    
    // generate a week of date data
    function generateWeek(week, payPeriodIdx) {

        // custom day names
        var dayNames = {
            sameDay: "[Today]",
            nextDay: "[Tomorrow]",
            nextWeek: function(now) {
                if (now.week() == this.week()) {
                    return "dddd"
                } else if (now.week() !== this.week() && (this.dayOfYear() - now.dayOfYear()) <= 2) {
                    return "dddd"
                } else {
                    return "[Next] dddd"
                };
            },
            lastDay: "[Yesterday]",
            lastWeek: function(now) {
                if (now.week() == this.week() && (now.dayOfYear() - this.dayOfYear()) < 5) {
                    return "dddd"
                } else if (this.week() % 2 !== 0) {
                    return "dddd"
                } else {
                    return "[Last] dddd"
                };
            },
            sameElse: function(now) {
                if (this.dayOfYear() - now.dayOfYear() >= 6) {
                    return "[Next] dddd"
                } else if (now.dayOfYear() - this.dayOfYear() >= 6) {
                    return "[Last] dddd"
                } else {
                    return "dddd"
                }
            }
        };
        var a = getRandomInt(0, hours.max);
        // get last day of week 1
        var day = moment().day("Saturday").week(week);
        var w = week;
        var week = [
            {
                name: day.calendar(today, dayNames),
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

        // create an array of day names
        for (var i=0; i < 6; i++) {
            var b = getRandomInt(0, hours.max);
            // get day added
            var lastDate = week[i];
            var newDate = moment(lastDate.id);
            var dateObj = {
                name: newDate.subtract(1, "day").calendar(today, dayNames),
                nameStandard: newDate.format("D MMMM"),
                dateNumber: newDate.format("D"),
                id: newDate.format("YYYY-MM-DD"),
                hours: newDate.day() > 0 && newDate.day() < 6 ? hours.day : 0,
                startForecast: hours.start[newDate.day()],
                endForecast: hours.end[newDate.day()],
                weekIdx: payPeriodIdx,
                //start: b,
                start: 0,
                end: 8
                //end: getRandomInt(b, b + hours.day)
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
            var ppWeek = generateWeek(weeks[i], i);

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
        
        return payPeriod;
        
    };
    
    var ppWeekEnd = cWeekNumber % 2 == 0 ? cWeekNumber + 1 : cWeekNumber;
    var payPeriod = generatePayPeriod(ppWeekEnd);
    
    return payPeriod;
    
});