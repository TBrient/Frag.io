//Constants
var GRAVITY = 9.8;
var PLAYER_ACCEL_X = 2;
var PLAYER_MAX_SPEED = 5;

//Setup
var stage;
var keys = {};

// Graphics
var player;


function Main() {
    stage = new createjs.Stage("Stage");

    player = new createjs.Shape();
    player.graphics.beginFill("red").drawCircle(0, 0, 50);
    player.x = 100;
    player.y = 100;
    stage.addChild(player);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", update);

    this.document.onkeydown = keydown;
    this.document.onkeyup = keyup;
}

function update(){
    if (keys[37]) player.x -= 10;
    if (keys[38]) player.y -= 10;
    if (keys[39]) player.x += 10;
    if (keys[40]) player.y += 10;
    stage.update();
}

function keydown(event) {
    keys[event.keyCode] = true;
}

function keyup(event) {
    delete keys[event.keyCode];
}