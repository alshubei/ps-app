'use strict';

var React = require('react');

var PumpsStore = require('../../stores/pumps-store.js');
var Dict = require('../common/dict.js');


var Pumpselect = React.createClass({
    getInitialState: function () {
        return PumpsStore.getState();
    },
    componentDidMount: function () {
        //his.props.source could be some url/file.php that runs in mysql and returns js object you want
        /*if (this.isMounted()) {
            $.get("php/pumps.php", function (result) {
                this.setState({pumps: PumpsStore.getState()});

                console.log(result);
                console.log("pumps ", JSON.parse(result));
            });

        }*/
    },
    render: function () {
        var pumps = this.state.pumps.map(function (item, i) {
            return <option key={i} value={item.pid}>{item.pname}-{item.fname}</option>
        }.bind(this));
        return (
            <div>
                <div>{this.props.title}</div>
                <div>
                    <select   value={this.props.value} onChange={this.props.onChange}>
                        {pumps}
                    </select>
                </div>
                <div className="label label-default">{this.props.pump.fuel},  {this.props.pump.literprice}/{Dict.liter} </div>
            </div>
            )
    }
});


module.exports = Pumpselect;
