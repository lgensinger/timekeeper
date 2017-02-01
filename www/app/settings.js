define(function () { 
    
    var maxValue = 24;
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
        day: 8,
        max: maxValue,
        total: 80,
        start: [0,7,8,7,7,6,10],
        end: [8,16,15,16,16,15,18],
        ticks: ticks
    }
    
});