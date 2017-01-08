// dependencies
var gulp = require("gulp");
var sass = require("gulp-sass");

// mkdocs server
var server = null;

// file paths
var srcPath = "www/assets/stylesheets/*.scss";
var destPath = "www/css/";

/******************************* !SASS *******************************/

// compile css
gulp.task("styles", function() {
    
    gulp.src(srcPath)
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(destPath));
    
});

// watch css compile task
gulp.task("watch", function() {
    
    gulp.watch(srcPath, ["styles"]);
    
});