/** @jsx React.DOM */
var React = require('react');

var Modal =
    React.createClass({
        getDefaultProps: function() {
            return {
                isModal: true
            };
        },
        render: function () {
            var saveBtn = '';
            if (this.props.onSave) {
                saveBtn = <button type="button" className={this.props.validation ? "btn  disabled" : "btn  btn-primary"}  onClick={this.props.onSave}>{this.props.saveCaption}</button>
            }
            var cancelBtn = '';
            var headerCloseBtn = '';
            if (this.props.onCancel) {
                cancelBtn = <button type="button" className="btn btn-default"  onClick={this.props.onCancel}>{this.props.closeCaption}</button>
                headerCloseBtn =    <button type="button" className="close" onClick={this.props.onCancel} aria-label="Close">x</button>
            }
            return (
                <div className={'fade ' + (this.props.isModal ? ' mymodal ' : '') + (this.props.show ? "  in" : " out")}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="myLargeModalLabel"
                aria-hidden="true"
                onKeyPress={this.props.onKeyPress}>
                    <div className={"modal-backdrop fade " + (this.props.show ? "  in" : "out")}></div>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                {headerCloseBtn}
                                <h4 className="modal-title">{this.props.title}</h4>
                            </div>
                            <div className="modal-body">
                                {this.props.children}
                            </div>
                            <div className="modal-footer">
                                    {cancelBtn}
                                    {saveBtn}
                            </div>
                        </div>
                    </div>
                </div>
                )
        }
    });

module.exports = Modal;