/**
 * Creates a World object
 * @constructor
 */
function World(){
    this.constants = {
        gravity: 9.8,
        maxHorizontalSpeed: 5,
        muS: 0.8,
        muK: 0.9
    };
    this.players = [];
}

/**
 * Adds a player to the world's player list
 * @param player
 */
World.prototype.addPlayer = function (player) {
    this.players.push(player);
};

/**
 * Updates every object in the world
 * @param keys
 */
World.prototype.update = function (keys) {
    var that = this; //Used for scoping

    //Update each player in the players list
    this.players.forEach(function (player, index) {
        player.update(keys, that.constants);
    });
};

/**
 * Creates a player object
 * @param startingPos
 * @param physicalFeatures
 * @param startingWeapon
 * @constructor
 */
function Player(startingPos, physicalFeatures, startingWeapon) {

    //Physics stuff
    this.inputForce = {magnitude: 0,direction: 0};
    this.velX = 0;
    this.velY = 0;
    this.accelX = 0;
    this.accelY = 0;

    //Physical features
    if (physicalFeatures != undefined) {
        this.physicalFeatures = {
            color: physicalFeatures.color || "red",
            mass: physicalFeatures.mass || 65
        };
    } else {
        this.physicalFeatures = {
            color: "red",
            mass: 65
        };
    }

    //Set initial positions
    this.x = startingPos.x;
    this.y = startingPos.y;

    //Set initial weapon
    this.weapon = startingWeapon;

    //Create the circle/node
    this.node = new createjs.Shape();
    this.node.graphics.beginFill(this.physicalFeatures.color).drawCircle(0, 0, 50);
    this.node.x = this.x;
    this.node.y = this.y;
}

/**
 * Update the player with corrisponding input
 * @param keys
 */
Player.prototype.inputUpdate = function (keys) {
    if (keys[KEY_A]) this.velX -= 3;
    if (keys[KEY_W]) this.y -= 10;
    if (keys[KEY_D]) this.velX += 3;
    if (keys[KEY_S]) this.y += 10;
};

/**
 * Update the player's position (with physics)
 * @param constants
 */
Player.prototype.physicsUpdate = function (constants) {
    this.velX *= constants.muK;
    this.x += this.velX;
    this.node.x = this.x;
    this.node.y = this.y;
};

/**
 * Master update function
 * @param keys
 * @param constants
 */
Player.prototype.update = function (keys, constants) {
    this.inputUpdate(keys);
    this.physicsUpdate(constants);
};