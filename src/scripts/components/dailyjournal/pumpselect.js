'use strict';

var React = require('react');

var PumpsStore = require('../../stores/pumps-store.js');
var PumpsActions = require('../../actions/pumps-actions.js');
var Dict = require('../common/dict.js');


var Pumpselect = React.createClass({
    getInitialState: function () {
        return PumpsStore.getState();
    },
    componentDidMount: function () {
        this.unsubscribe = PumpsStore.listen(this._onChange);
        if (this.isMounted()) {
            this.getPumpsDataIfNeeded();
        }

    },
    componentWillUnmount: function () {
        this.unsubscribe();
    },
    getPumpsDataIfNeeded: function () {
        //PumpsActions.fetchPumpsFromServer();

    },
    render: function () {
        var pumps = this.state.pumps.map(function (item, i) {
            return <option key={i} value={item.pumpId}>{item.pName + '-' + Dict.tr(item.fName)}</option>
        }.bind(this));
        var selectedPumpId = this.props.selected;
        var pump = PumpsStore.getPump(selectedPumpId);
        return (
            <div className={this.props.className}>
                <div>{this.props.title}</div>
                <div>
                    <select value={selectedPumpId} onChange={this.props.onChange}>
                        {pumps}
                    </select>
                </div>
                <div className="label label-default">
                    ({Dict.tr(pump.fPrice) }/{Dict.tr('liter')})
                </div>
            </div>
            )
    },
    _onChange: function () {
        this.setState(PumpsStore.getState());
    }
});


module.exports = Pumpselect;
