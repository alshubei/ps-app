/** @jsx React.DOM */
var React = require('react');


//note that jquery is brought in a tricky way in index.html as script tag and in grunt copy task: TODO: integrate jquery as a
// pre dependency for bootstrap using commonjs require..
//require('bootstrap');

var Modal =
    React.createClass({
        render: function () {
            var modalLink = 'modal fade ' + this.props.modalLink;
            return (
                <div  className={(this.props.editing == true ? 'editing' : '')}>
                    <div className={modalLink} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h4 className="modal-title">{this.props.title}</h4>
                                </div>
                                <div className="modal-body">
                                {this.props.children}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.onCancel}>{this.props.closeCaption}</button>
                                    <button type="button" className={this.props.validation ? "btn  disabled" : "btn  btn-primary"} data-dismiss="modal" onClick={this.props.onSave}>{this.props.saveCaption}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                )
        }
    });

module.exports = Modal;