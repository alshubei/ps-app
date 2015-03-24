
var _ = require('underscore');

module.exports = {
    formatDate: function (dateInMs) {
        var date = new Date(dateInMs);
        return date.getFullYear() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getDate();
    }
};