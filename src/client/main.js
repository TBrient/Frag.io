//Keycodes
var KEY_SPACE = 32, KEY_A = 65, KEY_W = 87, KEY_D = 68, KEY_S = 83, KEY_LEFT = 37, KEY_RIGHT = 39, KEY_UP = 38, KEY_DOWN = 40;

//Constants
var FRICTION_COEFFICIENT = .9;

//Setup
var stage;
var keys = {};

//World
var world;

var velocity = 0;

function Main() {
    stage = new createjs.Stage("Stage");

    world = new World();

    var player = new Player({x:100,y:100},0);

    world.addPlayer(player);

    addWorldToStage(world);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", update);

    this.document.onkeydown = keydown;
    this.document.onkeyup = keyup;
}

function update(){
    world.update(keys);
    stage.update();
}

function keydown(event) {
    keys[event.keyCode] = true;
}

function keyup(event) {
    delete keys[event.keyCode];
}

function addWorldToStage(world){
    world.players.forEach(function (player, index) {
        stage.addChild(player.node);
    });
}