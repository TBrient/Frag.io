/**
 * Creates a World object
 * @constructor
 */
function World(){
    this.constants = {
        gravity: 0.1,
        maxHorizontalSpeed: 5,
        muS: 0.8,
        muK: 0.9
    };
    this.players = [];
    this.platforms = [];
}

/**
 * Adds a player to the world's player list
 * @param player
 */
World.prototype.addPlayer = function (player) {
    this.players.push(player);
};

/**
 * Adds a platform to the world's platform list
 * @param platform
 */
World.prototype.addPlatform = function (platform) {
    this.platforms.push(platform);
};

/**
 * Updates every object in the world
 * @param keys
 */
World.prototype.update = function (keys) {
    var that = this; //Used for scoping

    //Update each player in the players list
    this.players.forEach(function (player, index) {
        player.update(keys, that.constants, that.platforms);
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
            mass: physicalFeatures.mass || 65,
            width: physicalFeatures.width || 100,
            height: physicalFeatures.height || 100
        };
    } else {
        this.physicalFeatures = {
            color: "red",
            mass: 65,
            width: 100,
            height: 100
        };
    }

    this.isJumping = false;
    this.isOnGround = false;

    //Set initial positions
    this.x = startingPos.x;
    this.y = startingPos.y;

    //Set initial weapon
    this.weapon = startingWeapon;

    //Create the circle/node
    this.node = new createjs.Shape();
    this.node.graphics.beginFill(this.physicalFeatures.color).drawRect(0, 0, this.physicalFeatures.width, this.physicalFeatures.height);
    this.node.x = this.x;
    this.node.y = this.y;
}

/**
 * Update the player with corrisponding input
 * @param keys
 */
Player.prototype.inputUpdate = function (keys) {
    if (keys[KEY_A]) this.velX -= 3;
    if (keys[KEY_W]) {
        if (this.isOnGround) {
            this.isJumping = true;
        }
    }
    if (keys[KEY_D]) this.velX += 3;
    if (keys[KEY_S]) this.y += 10;
};

/**
 * Update the player's position (with physics)
 * @param constants
 */
Player.prototype.physicsUpdate = function (platforms, constants) {
    this.collisionUpdate(platforms, constants);

    this.velX *= constants.muK;
    this.x += this.velX;

    this.velY += this.accelY;
    this.y += this.velY;

    this.node.x = this.x;
    this.node.y = this.y;
};

Player.prototype.collisionUpdate = function (platforms, constants) {
    if (this.isJumping) {
        this.accelY = -5;
        this.isJumping = false;
        this.isOnGround = false;
    } else {
        if (this.isColliding(platforms)) {
            this.accelY = 0;
            this.velY = 0;
            this.isOnGround = true;
        } else {
            this.accelY = constants.gravity;
        }
    }
};

Player.prototype.isColliding = function (platforms) {
    var that = this;
    var returnValue = false;
    platforms.forEach(
        function (platform) {
            if (!returnValue) {
                returnValue = that.isIntersecting(platform);
            }
        }
    );
    return returnValue;
};

Player.prototype.isIntersecting = function (target) {
    var xIntersect = false, yIntersect = false;
    if (this.x >= target.x && this.x <= target.x + target.physicalFeatures.width) {
        xIntersect = true;
    }
    if (this.x + this.physicalFeatures.width >= target.x && this.x + this.physicalFeatures.width <= target.x + target.physicalFeatures.width) {
        xIntersect = true;
    }
    if (this.y >= target.y && this.y <= target.y + target.physicalFeatures.height) {
        yIntersect = true;
    }
    if (this.y + this.physicalFeatures.height >= target.y && this.y + this.physicalFeatures.height <= target.y + target.physicalFeatures.height) {
        yIntersect = true;
    }
    console.log(xIntersect, yIntersect);
    return xIntersect && yIntersect;
};

/**
 * Master update function
 * @param keys
 * @param constants
 */
Player.prototype.update = function (keys, constants, platforms) {
    this.physicsUpdate(platforms, constants);
    this.inputUpdate(keys);
};

function Platform(position, physicalFeatures, color) {
    this.x = position.x;
    this.y = position.y;
    this.physicalFeatures = {
        width: physicalFeatures.width,
        height: physicalFeatures.height
    };

    this.color = color;

    //Create the node
    this.node = new createjs.Shape();
    this.node.graphics.beginFill(this.color).drawRect(0, 0, this.physicalFeatures.width, this.physicalFeatures.height);
    this.node.x = this.x;
    this.node.y = this.y;
}