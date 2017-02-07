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
var circle;

// Graphics
var player; //The player

player.x = 0;
player.y = 0;

function Main() {
    canvas = document.getElementById('Stage');
    stage = new createjs.Stage("Stage");
    circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    stage.update();
    stage.onkeydown = movePlayer;
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
    ticker.tick = update;
}

function movePlayer(){
    circle.x += 10;

}

function update(){
    alert("Test");
}