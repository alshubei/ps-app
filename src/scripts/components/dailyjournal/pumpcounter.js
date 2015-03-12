
var React = require('react');

var pumpcounter = React.createClass({
    render: function () {

        return (
            <input  type="text"  placeholder={this.props.placeHolder} value={this.props.value} onChange={this.props.onChange}></input>
            )
    }
});


module.exports = pumpcounter;
