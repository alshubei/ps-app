var React = require('react');

var pumpcounter = React.createClass({
    render: function () {

        return (<div><div>{this.props.title}</div>
        <input  type="text"  placeholder={this.props.placeHolder} value={this.props.value} onChange={this.props._onChange}></input>
        </div>
            )
    }
});


module.exports = pumpcounter;
