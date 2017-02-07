'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/* Config file */
var c = require('../../config.json');

/* Utilities */
var util = require('./lib/util');

/* Array of users; different from sockets! */
var users = [];

/* Object of initialized sockets */
var sockets = {};

app.use(express.static(__dirname + '/../client'));

function movePlayer(player) {
    //TODO: movement logic
}

io.on('connection', function (socket) {
    console.log('New user connected!', socket.handshake.query.type)

    var type = socket.handshake.query.type;
    var position = util.randomPosition();

    var cells = [];
    if(type === 'player'){
        cells = [{
            kills: 0,
            x: position.x,
            y: position.y
        }];
    }

    var currentPlayer = {
        id: socket.id,
        x: position.x,
        y: position.y,
        cells: cells,
        hue: Math.round(Math.random() * 360),
        type: type,
        lastHeartbeat: new Date().getTime(),
        target: {
            x: 0,
            y: 0
        }
    };

    socket.on('gotit', function (player) {
        //TODO: What do we do when a player connects?
    })
});