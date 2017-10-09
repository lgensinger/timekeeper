var config = require("../app-frontend-config");
var loremIpsum = require("lorem-ipsum");
var app = window.app;

app.frameComponent = (function() {
    
    return {
        
        // update title
        update: function() {
            document.title = loremIpsum({ count: 4, units: "words" }).replace(/\s+/g, "");
        }
        
    };
    
})();