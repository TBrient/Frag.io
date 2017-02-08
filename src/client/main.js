//Keycodes
var KEY_SPACE = 32, KEY_A = 65, KEY_W = 87, KEY_D = 68, KEY_S = 83, KEY_LEFT = 37, KEY_RIGHT = 39, KEY_UP = 38, KEY_DOWN = 40;

//Constants
var GRAVITY = 9.81;
var PLAYER_ACCEL_X = 2;
var PLAYER_MAX_SPEED = 5;
var FRICTION_COEFFICIENT = .7;

//Setup
var stage;
var keys = {};

// Graphics
var player;

var velocity = 0;

function Main() {
    stage = new createjs.Stage("Stage");

    player = new Player({x:100,y:100},0);
    stage.addChild(player.node);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", update);

    this.document.onkeydown = keydown;
    this.document.onkeyup = keyup;
}

function update(){
    player.update(keys);
    stage.update();
}

function keydown(event) {
    keys[event.keyCode] = true;
}

function keyup(event) {
    delete keys[event.keyCode];
}