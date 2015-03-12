/** @jsx React.DOM */
var React = require('react');


//note that jquery is brought in a tricky way in index.html as script tag and in grunt copy task: TODO: integrate jquery as a
// pre dependency for bootstrap using commonjs require..
require('../../bootstrap.js');

var Modal =
    React.createClass({
        render: function () {
            return (
                <div>
                    <button className="btn btn-primary"  data-toggle="modal" data-target=".bs-example-modal-lg">
                    +
                    </button>

                    <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h4 className="modal-title">Modal title</h4>
                                </div>
                                <div className="modal-body">
                                {this.props.children}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.onSave}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                )
        }
    });

module.exports = Modal;