var Reflux = require('reflux');
var Actions = Reflux.createActions([
    "addDispenser",
    "editDispenser",
    "cancelEditDispenser",
    "showDispenserModal",
    "hideDispenserModal",
    "removeDispenser"

]);

module.exports = Actions;