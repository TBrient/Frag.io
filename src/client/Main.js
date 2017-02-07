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

function Main() {
    var stage = new createjs.Stage("Stage");
    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    stage.update();
}

function movePlayer(){
    player.x ++;

}

function update(){

}