//Constructor of the World object
function World(){
    this.constants = {
        gravity: 9.8,
        maxHorizontalSpeed: 5,
        muS: 0.8,
        muK: 0.9
    };
    this.players = [];
}

World.prototype.addPlayer = function (player) {
    this.players.push(player);
};

World.prototype.update = function (keys) {
    var that = this;
    this.players.forEach(function (player, index) {
        player.update(keys, that.constants)
    });
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
};

Player.prototype.addVelocity = function(v) {
    this.velX += v;
};

Player.prototype.updatePhysics = function (constants) {
    this.velX *= constants.muK;
    this.x += this.velX;
    this.node.x = this.x;
    this.node.y = this.y;
};

Player.prototype.update = function (keys, constants) {
    this.keystrokeUpdate(keys);
    this.updatePhysics(constants);
};