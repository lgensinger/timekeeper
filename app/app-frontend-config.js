function config() {
    
    return {
        
        // metadata
        metadata: {
            name: "Identity",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque turpis leo, iaculis vitae hendrerit et, luctus in dolor."
        },
        
        // theme
        theme: {
            ui: {
                start: "dark",
                opposite: "light"
            }
        },
        
        // time
        time: {
            day: 8.00,
            min: 0.00,
            max: 24.00,
            step: 0.25,
            total: 80.00,
            start: [0,7,8,7,7,6,10],
            end: [8,16,15,16,16,15,18]
        }
        
    };
    
}

module.exports = config;