/**
 * Created by geoffreywang on 2/7/17.
 */

//Constants
var GRAVITY = 9.8;
var PLAYER_ACCEL_X = 2;
var PLAYER_MAX_SPEED = 5;

//Setup
var canvas;
var stage;
var ticker = new Object;

// Graphics
var player; //The player

player.x = 0;
player.y = 0;

function startGame(e) {
    stage.onkeydown(movePlayer());

    Ticker.addListener(ticker, false);
    ticker.tick = update;
}

function Main() {
    canvas = document.getElementById('Stage');
    stage = new Stage(canvas);

    stage.mouseEventsEnabled = true;

    /* Ticker */
    Ticker.setFPS(30);
    Ticker.addListener(stage);
}

function movePlayer(){
    player.x ++;
}

function update(){
    
}