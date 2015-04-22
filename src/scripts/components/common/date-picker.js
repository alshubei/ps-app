/** @jsx React.DOM */

var React = require('react');
var Utils = require('../../components/common/utils.js');
var DatePickerStore = require('../../stores/datepicker-store.js');
var DatePickerActions = require('../../actions/datepicker-actions.js');
var DailyJournalActions = require('../../actions/dailyjournal-actions.js');
var Dict = require('../../components/common/dict.js');

var Datepicker =
    React.createClass({
        getInitialState: function () {
            return DatePickerStore.getState();
        },
        componentDidMount: function () {
            this.unsubscribe = DatePickerStore.listen(this._onChange);
        },
        componentWillUnmount: function () {
            this.unsubscribe();
        },
        render: function () {
            return (
                <div className={'component component-datepicker  '}>
                        <label>{Dict.tr('date')}:</label>
                        <input autoFocus className= '' ref="date" type="date" value={this.state.date} onChange={this.handleChangeDate}/>
                </div>
                )
        },
        handleChangeDate: function () {
            var date = React.findDOMNode(this.refs.date).value;
            //this.setState({date: date});
            DatePickerActions.changeDate(date);

        },
        _onChange: function () {
            this.setState(DatePickerStore.getState());
        }
    });

module.exports = Datepicker;