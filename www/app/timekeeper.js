define(function(require) {
    
    // data
    var workspace = require("./layout");
    var payPeriod = require("./payPeriod");
    
    // create timekeeper app
    var timekeeper = React.createClass({
        
        displayName: "timekeeper",
        
        // properties
        propTypes: {
            sections: React.PropTypes.arrayOf(
                React.PropTypes.object
            ),
            payPeriod: React.PropTypes.arrayOf(
                React.PropTypes.object
            )
        },
        
        // set state
        getInitialState: function() {
            
            var sections = this.props.sections;
            
            // set up obj to return
            var obj = {
                data: sections,
                payPeriod: this.props.payPeriod
            };
            
            // loop through sections
            for (var i = 0; i < sections.length; i++) {
                
                var section = sections[i];
                
                // create component for each section
                obj[section.component.split("/")[1]] = require.defined("./" + section.component)
                
            }
            
            return obj;

        },
        
        // lifecycle
        componentDidMount: function() {
            
            var self = this;
            var sectionList = this.props.sections.map(function(d) {
                return "./" + d.component;
            });
                    
            // load components
            require(sectionList, function() {

                // capture values for all components
                var obj = {}
                
                // loop through sections
                for (var i = 0; i < sectionList.length; i++) {

                    // set component to true so we can check later in render
                    obj[sectionList[i].split("/")[2]] = true;

                };

                // set state
                self.setState(obj);

            });
  
        },
        
        // render
        render: function() {
            
            return React.DOM.main(

                // attributes
                null,

                // each workspace section
                this.state.data.map(function(section, idx) {
                    
                    var self = this;
                    
                    // save data from components
                    function updateHours(arg) {
                        
                        // set the state to reflect input
                        self.setState({
                            payPeriod: arg
                        });
                        
                    };

                    if (this.state[section.component.split("/")[1]]) {
                
                        var component = require("./" + section.component);

                        // section
                        return React.DOM.section(

                            // attributes
                            {
                                key: idx
                            },

                            // content
                            React.createElement(component, {
                                payPeriod: this.state.payPeriod,
                                updateHours: updateHours
                            })

                        )
                        
                    };

                }, this)

            )
            
        }
        
    });
    
    // timekeeper app
    ReactDOM.render(
        React.createElement(timekeeper, {
            sections: workspace.sections,
            payPeriod: payPeriod
        }),
        document.getElementById("app")
    );
    
});