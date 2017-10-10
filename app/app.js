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

// React JS modules
require("./factories");
require("./components");