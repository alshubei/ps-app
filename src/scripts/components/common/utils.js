'use strict'
var _ = require('underscore');

module.exports = {
    formatDate: function (dateInMs) {
        var date = new Date(dateInMs);
        return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
    }
};