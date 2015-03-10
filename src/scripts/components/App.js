'use strict';

var React = require('react');



var App = React.createClass({
  render: function() {
    return (
      <div className='app'>
        <h1>this is a h1 tag</h1>
      </div>
    );
  }
});
React.render(<App />, document.getElementById('content')); // jshint ignore:line

module.exports = App;
