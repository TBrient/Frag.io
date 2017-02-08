function World(){
    this.gravity = 9.8;
    this.maxHorizontalSpeed = 5;
    this.muK = 0.7;
    this.muS = 0.8;
    this.players = {};
}

World.prototype.addPlayer = function (player) {
    this.players.add(player);
};

World.prototype.update = function () {
    for(player in this.players){
        player.update();
    }
};

//Constructor of the Player object
function Player(startingPos, startingWeapon, mass){

    //Physics stuff
    this.inputForce = {magnitude: 0,direction: 0};
    this.mass = mass;
    this.velX = 0;
    this.velY = 0;
    this.accelX = 0;
    this.accelY = 0;

    this.x = startingPos.x;
    this.y = startingPos.y;

    this.weapon = startingWeapon;


    //Create the red circle
    this.node = new createjs.Shape();
    this.node.graphics.beginFill("red").drawCircle(0, 0, 50);
    this.node.x = this.x;
    this.node.y = this.y;

    return this.node;
}

Player.prototype.update = function () {

};

// function Player() {
//
//     var inputForce = {magnitude: 0,direction: 0};
//     var mass = 65;
//
//     var x = 100, y = 100;
//     var velX = 0, velY = 0;
//     var accelX = 0, accelY = 0;
//
//     this.createShape = function() {
//         player = new createjs.Shape();
//         player.graphics.beginFill("red").drawCircle(0, 0, 50);
//         player.x = 100;
//         player.y = 100;
//         return player;
//     };
//
//     // this.receiveInput = function(keys){
//     //     if(keys[KEY_D] == true){
//     //         inputForce.magnitude = 60;
//     //         inputForce.direction = 0;
//     //     }else{
//     //         inputForce.magnitude = 0;
//     //     }
//     // };
//
//     this.updatePosition = function(){
//         accelX = inputForce.magnitude/mass;
//         velX += accelX;
//         x += velX;
//     };
// }