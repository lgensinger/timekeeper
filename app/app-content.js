var loremIpsum = require("lorem-ipsum");

function config() {
    
    return {
        
        // content
        frames: [
            {
                url: loremIpsum({ count: 1, units: "words" }).toLowerCase(),
                headline: loremIpsum({ count: 10, units: "words" }),
                subhead: loremIpsum({ count: 4, units: "words" }),
                x: -50,
                y: 0,
                z: 0
            },
            {
                url: loremIpsum({ count: 1, units: "words" }).toLowerCase(),
                headline: loremIpsum({ count: 10, units: "words" }),
                subhead: loremIpsum({ count: 4, units: "words" }),
                x: 0,
                y: 0,
                z: -500
            },
            {
                url: loremIpsum({ count: 1, units: "words" }).toLowerCase(),
                headline: loremIpsum({ count: 10, units: "words" }),
                subhead: loremIpsum({ count: 4, units: "words" }),
                x: 500,
                y: 0,
                z: -1000
            },
            {
                url: loremIpsum({ count: 1, units: "words" }).toLowerCase(),
                headline: loremIpsum({ count: 10, units: "words" }),
                subhead: loremIpsum({ count: 4, units: "words" }),
                x: 500,
                y: -500,
                z: 0
            }
        ]
        
    };
    
}

module.exports = config;