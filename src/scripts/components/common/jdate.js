/** @jsx React.DOM */

var React = require('react');

var JDate =
    React.createClass({
        getDefaultProps: function () {
            return {
                date: new Date(),
                label: 'Date'
            };
        },
        render: function () {
            return (
                <span className='lead bg-info'>
                {this.props.label}: {this.formatDate(this.props.date)}
                </span>
                )
        }, formatDate: function (dateInMs) {
            var date = new Date(dateInMs);
            return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
        }
    });

module.exports = JDate;