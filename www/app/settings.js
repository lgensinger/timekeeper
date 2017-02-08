define(function () { 
    
    var minValue = 0.00;
    var maxValue = 24.00;
    var dayValue = 8.00;
    var hoursIncrement = 0.25;
    var hoursTotal = 80.00;
    var ticks = [];
    
    // iterate over number of values
    for (i = 0; i < maxValue; i++) {
        
        // create data for each tick in entire value set
        var tick = {
            idx: i
        };
        
        // push into array
        ticks.push(tick);
        
    };
    
    return {
        day: hoursIncrement,
        min: minValue,
        max: maxValue,
        step: hoursIncrement,
        total: hoursTotal,
        start: [0,7,8,7,7,6,10],
        end: [8,16,15,16,16,15,18],
        ticks: ticks
    }
    
});