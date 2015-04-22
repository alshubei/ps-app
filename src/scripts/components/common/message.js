'use strict';

var React = require('react');
var Dict = require('../../components/common/dict.js');

var Message = React.createClass({

    render: function () {

        return (
            <h4 className={"component component-message message"}>
                {this.props.message}
            </h4>
            )
    }
});


module.exports = Message;
