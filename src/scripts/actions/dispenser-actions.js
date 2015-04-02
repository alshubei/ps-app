var Reflux = require('reflux');
var Actions = Reflux.createActions([
    "addDispenser",
    "editDispenser",
    "cancelEditDispenser",
    "showDispenserModal",
    "hideDispenserModal",
    "removeDispenser" //based on the timestamp of the dispenser entry

]);

module.exports = Actions;