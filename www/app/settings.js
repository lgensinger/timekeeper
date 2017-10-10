define(function () { 

    var ticks = [];
    
    // iterate over number of values
    for (i = 0; i < maxValue; i++) {
        
        // create data for each tick in entire value set
        var tick = {
            idx: i,
            degree: 360 / maxValue
        };
        
        // push into array
        ticks.push(tick);
        
    };
    
});