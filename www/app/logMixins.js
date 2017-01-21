define(function () {
    
    return {
        _log: function(methodName, args) {
            console.log(methodName, args);
        },
        componentWillUpdte: function() {
            this._log("componentWillUpdate", arguments);
        },
        componentDidUpdate: function() {
            this._log("componentDidUpdate", arguments);
        },
        componentWillMount: function() {
            this._log("componentWillMount", arguments);
        },
        componentDidMount: function() {
            this._log("componentDidMount", arguments);
        },
        componentWillUnmount: function() {
            this._log("componentWillUnmount", arguments);
        }
    }
    
});