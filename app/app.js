/*************************** STYLE ***************************/

// app stylesheets
var styleBase = "./style/app/";
var systemBase = styleBase + "system/";
var platformBase = styleBase + "platforms/";
var themeBase = styleBase + "themes/";

// design system
require(systemBase + "reset.scss");
require(systemBase + "typography.scss");
require(systemBase + "shapes.scss");
require(systemBase + "tables.scss");
require(systemBase + "forms.scss");

// platforms
require(platformBase + "desktop.scss");

// themes
require(systemBase + "palettes.scss");
require(themeBase + "dark.scss");
require(themeBase + "light.scss");

/*************************** CONFIGS ***************************/

// app configuration
require("./app-frontend-config");

/*************************** MODULES ***************************/

// main module vendor dependencies
//require("impress.js");

// app initialized
var app = window.app = (function(app) {
    app.init = function() {
        //impress().init();
    };
    return app;
}(app || {}));

// initialize app
app.init();

// vanilla JS modules
require("./controllers");
require("./factories");
require("./components");