var Reflux = require('reflux');
var Actions = Reflux.createActions([
    "saveDispenser",
    "editDispenser",
    "removeDispenser" //based on the timestamp of the dispenser entry

]);

module.exports = Actions;