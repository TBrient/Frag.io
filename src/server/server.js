'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var weapons = require('./lib/weapons');

/* Config file */
var c = require('../../config.json');

/* Utilities */
var util = require('./lib/util');

/* Array of users; different from sockets! */
var users = [];

/* Object of initialized sockets */
var sockets = {};

/* Object of platforms */
var platforms = {};

app.use(express.static(__dirname + '/../client'));

function movePlayer(player) {
    //TODO: movement logic
}

io.on('connection', function (socket) {
    console.log('New user connected!', socket.handshake.query.type);

    var type = socket.handshake.query.type;
    var position = util.randomPosition();
    var weapon = WEAPON_FIST;

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
        },
        keyPresses: {
            forward: false,
            backward: false,
            jump: false,
            fire: false
        },
        currentWeapon: weapon
    };

    socket.on('gotit', function (player) {
        console.log('Connection from player name: '+player.name);

        if(util.findIndex(users, player.id) > -1) { /* Check if the socket ID is already open on our side */
            console.log('Player already connected, disconnecting ID '+player.id);
            socket.disconnect()
        } else if (!util.validNick(player.name)) { /* Player's selected name contains escape characters */
            socket.emit('kick', 'Username contains invalid characters');
            socket.disconnect()
        } else { /* Player has connected successfully */
            console.log('Player\'s connection was successful.');
            sockets[player.id] = socket;

            /* Set player's x and y to a random spawn position */
            var pos = util.randomPosition();
            player.x = pos.x;
            player.y = pos.y;

            currentPlayer = player;
            currentPlayer.lastHeartbeat = new Date().getTime(); /* If user doesn't interact, heartbeat doesn't update */

            /* Push the currentPlayer object to the users array */
            users.push(currentPlayer);

            /* Emit locally that a player with name 'name' has connected */
            io.emit('playerJoin', { name: currentPlayer.name} );

            socket.emit('platforms', platforms)
        }

    });

    /* Ping check; socket.io already has 'ping' and 'pong' so we use 'drip' and 'drop' */
    socket.on('drip', function () {
        socket.emit('drop');
    });

    socket.on('disconnect', function () {
        if (util.findIndex(users, currentPlayer.id) > -1)
            users.splice(util.findIndex(users, currentPlayer.id), 1);
        console.log('User ' + currentPlayer.name + ' disconnected.');

        socket.broadcast.emit('playerDisconnect', { name: currentPlayer.name }); // Use broadcast so we don't send data to a closing socket
    });

    /* Refresh info */
    socket.on('0', function(playerData) { /* playerData contains current pressed keys, an X and Y which will be updated every 20th frame, and the weapon the player has currently switched to. */
        currentPlayer.lastHeartbeat = new Date().getTime();
        currentPlayer.currentWeapon = playerData.weapon;
    });

    /* Fired a weapon */
    socket.on('1', function() {
        //TODO: use current weapon to 'fire' a bullet
    });

});

function Platform(position, physicalFeatures, color) {
    this.x = position.x;
    this.y = position.y;
    this.physicalFeatures = {
        width: physicalFeatures.width,
        height: physicalFeatures.height
    };

    this.color = color;
}