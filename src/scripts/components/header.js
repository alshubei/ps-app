'use strict';

var React = require('react');

var header = React.createClass({
  render: function() {
    return (
        <div className="page-header">
            <h1>{this.props.title} <small>| {this.props.subTitle}</small></h1>
        </div>
    );
  }
});


module.exports = header;
