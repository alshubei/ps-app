var Reflux = require('reflux');
var Actions = Reflux.createActions([
    "saveDispenser",
    "editDispenser",
    "cancelEditDispenser",
    "removeDispenser" //based on the timestamp of the dispenser entry

]);

module.exports = Actions;