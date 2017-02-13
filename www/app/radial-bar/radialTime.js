define(function (require) {
        
    // data
    var hours = require("../settings");
    var displayHours = require("../displayHours");
    var inputHours = require("../inputHours");
    var chart = require("./radial-bar-chart");
       
    // create input number component
    return React.createClass({
        
        displayName: "radialTime",
        
        // properties
        propTypes: {
            payPeriod: React.PropTypes.arrayOf(
                React.PropTypes.object
            ),
            updateHours: React.PropTypes.func
        },
        
        // set state
        getInitialState: function() {
            return {
                data: this.props.payPeriod
            };
        },
        
        // render
        render: function() {
                        
            // week wrap
            return React.DOM.div(
                
                // attributes
                null,
                
                // each week
                this.state.data.map(function(week, idx) {
                    
                    var self = this;
                        
                    // save data from components
                    function updateRings(arg) {
                        
                        // clone data
                        var data = self.state.data.slice();
                        var week = data[arg.key];
                        
                        // update individual week's data in the pay period
                        week.dates = arg.rings;
                        var test = [
  {
    "name": "week 1",
    "start": "5 February",
    "end": "11 February",
    "dates": [
      {
        "name": "Yesterday",
        "nameStandard": "11 February",
        "dateNumber": "11",
        "id": "2017-02-11",
        "hours": 0,
        "startForecast": 10,
        "endForecast": 18,
        "weekIdx": 0,
        "start": 7,
        "end": 15
      },
      {
        "name": "Last Friday",
        "nameStandard": "10 February",
        "dateNumber": "10",
        "id": "2017-02-10",
        "hours": 8,
        "startForecast": 6,
        "endForecast": 15,
        "weekIdx": 0,
        "start": 7,
        "end": 15
      },
      {
        "name": "Last Thursday",
        "nameStandard": "9 February",
        "dateNumber": "9",
        "id": "2017-02-09",
        "hours": 8,
        "startForecast": 7,
        "endForecast": 16,
        "weekIdx": 0,
        "start": 7,
        "end": 15
      },
      {
        "name": "Last Wednesday",
        "nameStandard": "8 February",
        "dateNumber": "8",
        "id": "2017-02-08",
        "hours": 8,
        "startForecast": 7,
        "endForecast": 16,
        "weekIdx": 0,
        "start": 7,
        "end": 15
      },
      {
        "name": "Last Tuesday",
        "nameStandard": "7 February",
        "dateNumber": "7",
        "id": "2017-02-07",
        "hours": 8,
        "startForecast": 8,
        "endForecast": 15,
        "weekIdx": 0,
        "start": 7,
        "end": 15
      },
      {
        "name": "Last Monday",
        "nameStandard": "6 February",
        "dateNumber": "6",
        "id": "2017-02-06",
        "hours": 8,
        "startForecast": 7,
        "endForecast": 16,
        "weekIdx": 0,
        "start": 7,
        "end": 15
      },
      {
        "name": "Last Sunday",
        "nameStandard": "5 February",
        "dateNumber": "5",
        "id": "2017-02-05",
        "hours": 0,
        "startForecast": 0,
        "endForecast": 8,
        "weekIdx": 0,
        "start": 7,
        "end": 15
      }
    ]
  },
  {
    "name": "week 2",
    "start": "12 February",
    "end": "18 February",
    "dates": [
      {
        "name": "Saturday",
        "nameStandard": "18 February",
        "dateNumber": "18",
        "id": "2017-02-18",
        "hours": 0,
        "startForecast": 10,
        "endForecast": 18,
        "weekIdx": 1,
        "start": 7,
        "end": 15
      },
      {
        "name": "Friday",
        "nameStandard": "17 February",
        "dateNumber": "17",
        "id": "2017-02-17",
        "hours": 8,
        "startForecast": 6,
        "endForecast": 15,
        "weekIdx": 1,
        "start": 7,
        "end": 15
      },
      {
        "name": "Thursday",
        "nameStandard": "16 February",
        "dateNumber": "16",
        "id": "2017-02-16",
        "hours": 8,
        "startForecast": 7,
        "endForecast": 16,
        "weekIdx": 1,
        "start": 7,
        "end": 15
      },
      {
        "name": "Wednesday",
        "nameStandard": "15 February",
        "dateNumber": "15",
        "id": "2017-02-15",
        "hours": 8,
        "startForecast": 7,
        "endForecast": 16,
        "weekIdx": 1,
        "start": 7,
        "end": 15
      },
      {
        "name": "Tuesday",
        "nameStandard": "14 February",
        "dateNumber": "14",
        "id": "2017-02-14",
        "hours": 8,
        "startForecast": 8,
        "endForecast": 15,
        "weekIdx": 1,
        "start": 7,
        "end": 15
      },
      {
        "name": "Tomorrow",
        "nameStandard": "13 February",
        "dateNumber": "13",
        "id": "2017-02-13",
        "hours": 8,
        "startForecast": 7,
        "endForecast": 16,
        "weekIdx": 1,
        "start": 7,
        "end": 15
      },
      {
        "name": "Today",
        "nameStandard": "12 February",
        "dateNumber": "12",
        "id": "2017-02-12",
        "hours": 0,
        "startForecast": 0,
        "endForecast": 8,
        "weekIdx": 1,
        "start": 7,
        "end": 16
      }
    ]
  }
];
                        // expose to parent
                        self.props.updateHours(test);
                        // set the state to reflect interaction
                        /*self.setState({
                            rings: data
                        });*/

                    };
                    
                    // each week
                    return React.DOM.div(
                        
                        // attributes
                        {
                            key: idx,
                        },
                        
                        // content
                         React.createElement(chart, {
                            height: 500,
                            width: 500,
                            padAngle: 0,
                            rings: week.dates,
                            ticks: hours.ticks,
                            updateRings: updateRings
                        })
                    
                    )
                    
                }, this)
                
            )
            
        }
        
    });
    
});