var Reflux = require('reflux');
var Actions = Reflux.createActions([
    "login",
    "showLoginModal",
    "hideLoginModal",
    "verifyUser"
]);

module.exports = Actions;