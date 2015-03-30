/** @jsx React.DOM */

var React = require('react');
var Utils = require('../../components/common/utils.js');
var DatePickerStore = require('../../stores/datepicker-store.js');
var DatePickerActions = require('../../actions/datepicker-actions.js');
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
                <div className={'component component-datepicker input-lg-2 '}>
                        <label>{Dict.tr('date')}:</label>
                        <input className= 'input-lg-3' ref="date" type="date" value={this.state.date} onChange={this.handleChangeDate}/>
                </div>
                )
        },
        handleTodayClick: function () {
            var date = Utils.formatDate(Date.now());
            this.setState({date: date});
            DatePickerActions.changeDate(date);
        },
        handleChangeDate: function () {
            var date = React.findDOMNode(this.refs.date).value;
            this.setState({date: date});
            DatePickerActions.changeDate(date);

        },
        handleCalendarChangeDate: function () {
            this.setState({date: React.findDOMNode(this.refs.date).value});
            DatePickerActions.changeDate(this.state.date);
        },
        _onChange: function () {
            this.setState(DatePickerStore.getState());
        }
    });

module.exports = Datepicker;