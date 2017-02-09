//Keycodes
var KEY_SPACE = 32, KEY_A = 65, KEY_W = 87, KEY_D = 68, KEY_S = 83, KEY_LEFT = 37, KEY_RIGHT = 39, KEY_UP = 38, KEY_DOWN = 40;

//Setup
var stage; //The object we draw/animate on (Canvas)
var keys = {}; //Stores all keyevents

//World
var world;

/**
 * Main function that initializes everything
 * @constructor
 */
function Main() {
    stage = new createjs.Stage("Canvas"); //Point and set the stage to correspond to the "Canvas" in the HTML

    //Set up the world
    world = new World();
    world.addPlayer(new Player({x: 100, y: 100}, {color: "red", mass: 65})); //Add a player
    world.addPlayer(new Player({x: 400, y: 200}, {color: "green", mass: 65})); //Add another player
    world.addPlatform(new Platform({x: 0, y: 400}, {width: 600, height: 20}, "pink"));
    addWorldToStage(world);

    //Set framerate and update method
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", update);

    //Keyevents
    this.document.onkeydown = keydown;
    this.document.onkeyup = keyup;
}

/**
 * Called each frame to update everything
 */
function update(){
    world.update(keys);
    stage.update(); //Repaint
}

/**
 * Add all the objects from a world to the stage
 * @param world
 */
function addWorldToStage(world) {
    world.players.forEach(function (player) {
        stage.addChild(player.node);
    });
    world.platforms.forEach(function (platform) {
        stage.addChild(platform.node);
    })
}

//-------------------- Utility Functions --------------------

/**
 * Sets keys accordingly when a key is pressed
 * @param event
 */
function keydown(event) {
    keys[event.keyCode] = true;
}


/**
 * Sets keys accordingly when a key is released
 * @param event
 */
function keyup(event) {
    delete keys[event.keyCode];
}