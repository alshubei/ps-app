'use strict';

var React = require('react');

var header = React.createClass({
  render: function() {
    return (
        <div className="page-header">
            <h1>PS-App <small>prototype | Dispenser Pumps Journal</small></h1>
        </div>
    );
  }
});


module.exports = header;
