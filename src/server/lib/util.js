'use strict';

var cfg = require('../../../config.json');

/* Check if the user's name is valid */
exports.validNick = function(nickname) {
    var regex = /^\w*$/;
    return regex.exec(nickname) !== null;
};

exports.randomPosition = function () {
    //TODO: Should return one of 4 possible spaces in the map?
    return {
        x: 0, //Placeholder, will be func
        y: 0  //Ditto
    };
};

exports.findIndex = function(arr, id) {
    var len = arr.length;

    while (len--) {
        if (arr[len].id === id) {
            return len;
        }
    }

    return -1;
};