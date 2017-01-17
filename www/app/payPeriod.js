define(function (require) {
    
    var hours = require("./settings");
    
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
    
    return payPeriod;
    
});