//Keycodes
var KEY_SPACE = 32, KEY_A = 65, KEY_W = 87, KEY_D = 68, KEY_S = 83, KEY_LEFT = 37, KEY_RIGHT = 39, KEY_UP = 38, KEY_DOWN = 40;

//Setup
var stage; //The object we draw/animate on (Canvas)
var keys = {}; //Stores all keyevents
var mouseLoc;

//World
var world;

//Timer
var timer = 0;

/**
 * Main function that initializes everything
 * @constructor
 */
function Main() {
    stage = new createjs.Stage("Canvas"); //Point and set the stage to correspond to the "Canvas" in the HTML

    //Set up the world
    world = new World();
    world.addPlayer(new Player({x: 50, y: 500}, {color: "blue", mass: 65, width: 10, height: 15})); //Add a player

    //floor
    world.addPlatform(new Platform({x: 0, y: 783}, {width: 580, height: 20}, "green"));
    world.addPlatform(new Platform({x: 860, y: 783}, {width: 580, height: 20}, "green"));

    world.addPlatform(new Platform({x: 560, y: 683}, {width: 20, height: 100}, "gray"));

    world.addPlatform(new Platform({x: 400, y: 610}, {width: 100, height: 20}, "brown"));
    world.addPlatform(new Platform({x: 275, y: 675}, {width: 100, height: 20}, "brown"));
    world.addPlatform(new Platform({x: 100, y: 675}, {width: 100, height: 20}, "brown"));


    world.addPlatform(new Platform({x: 275, y: 575}, {width: 20, height: 100}, "pink"));
    world.addPlatform(new Platform({x: 560, y: 683}, {width: 150, height: 20}, "gray"));

    world.addPlatform(new Platform({x: 600, y: 600}, {width: 100, height: 20}, "darkcyan"));
    world.addPlatform(new Platform({x: 700, y: 580}, {width: 100, height: 20}, "darkcyan"));
    world.addPlatform(new Platform({x: 800, y: 560}, {width: 100, height: 20}, "darkcyan"));




    world.addPlatform(new Platform({x: 500, y: 500}, {width: 100, height: 20}, "green"));
    world.addPlatform(new Platform({x: 700, y: 400}, {width: 100, height: 20}, "purple"));
    world.addPlatform(new Platform({x: 900, y: 200}, {width: 101, height: 101}, "orange"));

    //New Map
    //world.addPlatform(new Platform({x: 0, y: 700}, {width: 800, height: 20}, "red"));

    addWorldToStage(world);

    //Set framerate and update method
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", update);

    //Keyevents
    this.document.onkeydown = keydown;
    this.document.onkeyup = keyup;
    this.document.onmousedown = mousedown;
    this.document.onmouseup = mouseup;
    this.document.onmousemove = mousemoved;
}

function addDebugVisuals(){

}

/**
 * Called each frame to update everything
 */
function update(){
    world.update(keys, mouseLoc);
    mouseLoc = null;
    stage.update(); //Repaint
    if (timer % 20 != 0) {
        timer++;
    }
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

function mousedown(event) {
    if (timer % 20 == 0){
        mouseLoc = {x: event.x, y: event.y};
        timer++;
    }
    // while (mouseLoc != null) {
        if (timer % 20 == 0){
            mouseLoc = {x: event.x, y: event.y};
            timer++;
        }
    // }
}

function mouseup(event) {
    mouseLoc = null;
}

function mousemoved(event) {
    if (mouseLoc != null){
        mousedown(event);
    }
}