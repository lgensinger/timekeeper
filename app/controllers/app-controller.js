var config = require("../app-frontend-config");
var content = require("../app-content");
var app = window.app;

require("../factories/dom-factory");

app.appController = (function() {
    
    var domFactory = app.domFactory;
    
    // set page metadata
    document.title = config().metadata.name;
    
    // add impress wrap
    var wrap = domFactory.addElement("div", document.body, { id: "impress" });
    
    var frames = content().frames;
    
    // loop through content frames
    for (var i=0; i < frames.length; i++) {
        
        var frameData = frames[i];
        var attrs = {
            "id": frameData.url,
            "data-x": frameData.x,
            "data-y": frameData.y,
            "data-z": frameData.z,
            "class": "step"
        };
        
        // add element to dom
        var frame = domFactory.addElement("div", wrap, attrs);
        
        // add headline
        // TODO remove and bind unique templates for each frame as defined in data
        frame = domFactory.addElement("h1", frame, null, frameData.headline);
        
    }
    
    // initialize impress
    impress().init();
    
})();