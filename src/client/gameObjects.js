function World(){
    this.gravity = 9.8;
    this.maxHorizontalSpeed = 5;
    this.muK = 0.7;
    this.muS = 0.8;
}

World.prototype.addPlayer = function (player) {
    this.player = player;
};

World.prototype.update = function (keys) {
    this.player.update(keys);
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
}

Player.prototype.keystrokeUpdate = function(keys){
    if (keys[KEY_A]) this.addVelocity(-3);
    if (keys[KEY_W]) this.y -= 10;
    if (keys[KEY_D]) this.addVelocity(3);
    if (keys[KEY_S]) this.y += 10;


    // if(keys[KEY_D] == true){
    //     inputForce.magnitude = 60;
    //     inputForce.direction = 0;
    // }else{
    //     inputForce.magnitude = 0;
    // }
};

Player.prototype.addVelocity = function(v) {
    this.velX += v;
};

Player.prototype.update = function (keys) {
    this.keystrokeUpdate(keys);
    this.velX *= FRICTION_COEFFICIENT;
    this.x += this.velX;
    this.node.x = this.x;
    this.node.y = this.y;
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