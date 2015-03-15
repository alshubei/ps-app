'use strict';

var React = require('react');

var footer = React.createClass({
  render: function() {
    return (
        <div className="page-footer">
            <h3>{this.props.title}<small>{this.props.subTitle}</small></h3>
        </div>
    );
  }
});


module.exports = footer;
