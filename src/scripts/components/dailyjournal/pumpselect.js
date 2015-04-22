'use strict';

var React = require('react');

var PumpsStore = require('../../stores/pumps-store.js');
var PumpsActions = require('../../actions/pumps-actions.js');
var DailyJournalActions = require('../../actions/dailyjournal-actions.js');
var Dict = require('../common/dict.js');


var Pumpselect = React.createClass({
    getInitialState: function () {
        return PumpsStore.getState();
    },
    componentDidMount: function () {
        this.unsubscribe = PumpsStore.listen(this._onChange);
    },
    componentWillUnmount: function () {
        this.unsubscribe();
    },
    render: function () {
        if (this.state.pumps.length == 0) {
            DailyJournalActions.error("missing_pumps");
            return <div></div>
        }
        var pumps = this.state.pumps.map(function (item, i) {
            return <option key={i} value={item.pumpId}>{item.pName + '-' + Dict.tr(item.fName)}</option>
        }.bind(this));
        var selectedPumpId = this.props.selected;
        var pump = PumpsStore.getPump(selectedPumpId);
        return (
            <div className={'component component-pumpselect' + this.props.className}>
                <div>{this.props.title}</div>
                <div>
                    <select  value={selectedPumpId} onChange={this.props.onChange}>
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
