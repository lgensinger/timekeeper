var app = window.app;

app.utilsFactory = (function() {
    
    return {
        
        // return a random integer in a specified range
        randint: function(min, max) {
            
            var minimum = Math.ceil(min);
            var maximum = Math.floor(max);

            return Math.floor(Math.random() * (maximum - minimum)) + minimum;
            
        }
        
    };
    
})();