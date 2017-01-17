// dependencies
requirejs.config({
    baseUrl: "lib",
    paths: {
        app: "../app"
    }
});

// main app
requirejs(["app/main"]);