/**
 * Creates a World object
 * @constructor
 */
let LEFT = -1;
let RIGHT = 1;
let TOP = 2;
let BOTTOM = -2;


function World(){
    this.constants = {
        gravity: 0.4,
        maxHorizontalSpeed: 5,
        muS: 0.2,
        muK: 0.6,
        muKAir: 0.95
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
    this.jumpTime = 0.0;

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

    if (this.isOnGround) {
        if (keys[KEY_A]) {
            this.accelX = -3;
        } else if (keys[KEY_D]) {
            this.accelX = 3;
        } else {
            this.accelX = 0;
        }
    } else {
        if (keys[KEY_A]) {
            if (keys[KEY_W]) {
                this.accelX = -0.2;
            } else {
                this.accelX = -0.3;
            }
        } else if (keys[KEY_D]) {
            if (keys[KEY_W]) {
                this.accelX = 0.2;
            } else {
                this.accelX = 0.3;
            }
        } else {
            this.accelX = 0;
        }
    }

    if (keys[KEY_W]) {
        if (this.isOnGround && !this.isJumping) {
            this.jumpTime = 0.23;
            this.isOnGround = false;
            this.isJumping = true;
            this.velY = -this.jumpTime * 40;
        } else if (!this.isOnGround && this.jumpTime > 0){
            this.jumpTime -= 1/180;
            this.velY = -this.jumpTime*30;
        } else if (!this.isOnGround && this.jumpTime <= 0) {
            this.accelY = .4;
            jumpTime = 0;
        }
    }
    else {
        this.jumpTime = 0;
        this.accelY = .4;
    }


    // if (keys[KEY_S]) this.y += 10;
};

/**    // if (keys[KEY_W] || this.jumpTime < 0 && !this.isOnGround) {
    //     if (jumpTime < 0) {
    //         this.accelX = this.xJumpSpeed;
    //         this.accelY = -this.jumpTime * this.yJumpSpeed;
    //         this.jumpTime++;
    //     } else if (this.isOnGround && keys[KEY_W]) {
    //         this.xJumpSpeed = 0;
    //         this.yJumpSpeed = -1.9;
    //         this.jumpTime = 7;
    //         this.accelY = this.jumpTime * this.yJumpSpeed;
    //         this.isOnGround = false;
    //     } else if (this.jumpTime > 0) {
    //         this.accelX += this.xJumpSpeed;
    //         this.accelY = this.jumpTime * this.yJumpSpeed;
    //         this.jumpTime--;
    //     }
    //
    // }
 * Update the player's position (with physics)
 * @param constants
 */
Player.prototype.physicsUpdate = function (platforms, constants) {
    this.collisionUpdate(platforms, constants);

    if (this.isOnGround ) {
        if (this.velX > 0) {
            this.velX *= constants.muK;
        } else if (this.velX < 0) {
            this.velX *= constants.muK;
        }
    } else {
        // if (this.velX > 0) {
        //     this.velX *= constants.muKAir;
        // } else if (this.velX < 0) {
        //     this.velX *= constants.muKAir;
        // }
    }

    this.velX += this.accelX;
    if (this.velX > constants.maxHorizontalSpeed) {
        this.velX = constants.maxHorizontalSpeed;
    } else if (this.velX < -constants.maxHorizontalSpeed) {
        this.velX = -constants.maxHorizontalSpeed;

    }
    this.x += this.velX;

    this.velY += this.accelY;
    this.y += this.velY;


    this.node.x = this.x;
    this.node.y = this.y;
};

Player.prototype.collided = function (side) {
    if (Math.abs(side) === 1) {
        this.velX = this.velX*(-0.1);
    } else {
        this.velY = 0;
    }
};

Player.prototype.collisionUpdate = function (platforms, constants) {
    if (this.isJumping) {
        this.isJumping = false;
        this.isOnGround = false;
    } else {
        if (this.isCollidingNextFrame(platforms)) {

        } else {
            this.isOnGround = false;
            // this.accelY = constants.gravity;
        }
    }
};

Player.prototype.isCollidingNextFrame = function (platforms) {
    var that = this;
    var returnValue = false;
    platforms.forEach(
        function (platform) {
            if (!returnValue) {
                returnValue = that.isIntersectingNextFrame(platform);
            }
        }
    );
    return returnValue;
};

Player.prototype.isIntersectingNextFrame = function (target) { //TODO: If they are gonna collide next frame, find delta and move by that much
    var nextFrameX = this.velX + this.x;
    var nextFrameY = this.velY + this.accelY + this.y;
    var xIntersectMain = false, xIntersectRight = false, xIntersectLeft = false, yIntersectTop = false, yIntersectBottom = false; //Directions refer to player side
    if (nextFrameX >= target.x && nextFrameX <= target.x + target.physicalFeatures.width) {
        if (nextFrameX + this.physicalFeatures.width >= target.x && nextFrameX + this.physicalFeatures.width <= target.x + target.physicalFeatures.width) {
            xIntersectMain = true;
        } else {
            //Intersecting of the right side of player
            xIntersectRight = true;
        }
    } else if (nextFrameX + this.physicalFeatures.width >= target.x && nextFrameX + this.physicalFeatures.width <= target.x + target.physicalFeatures.width) {
        xIntersectLeft = true;
    }
    if (nextFrameY >= target.y && nextFrameY <= target.y + target.physicalFeatures.height) {
        // console.log("next Frame y: " + nextFrameY);
        // console.log("target y: " + target.y);
        // console.log("target y2: " + target.y + target.physicalFeatures.height);
        // console.log("Top Hit");
        yIntersectTop = true;
    }
    if (nextFrameY + this.physicalFeatures.height >= target.y && nextFrameY + this.physicalFeatures.height <= target.y + target.physicalFeatures.height) {
        yIntersectBottom = true;
        // console.log("Bottom Hit");
    }

    // this.y += 5;

    if ((xIntersectRight || xIntersectLeft) && (yIntersectBottom || yIntersectTop)) {
        var one = this.y + this.physicalFeatures.height, two = target.y, three = this.y, four = target.y + target.physicalFeatures.height;
        console.log("this.y + this.physicalFeatures.height: " + one);
        console.log("target.y + 2: " + two);
        console.log("this.y: " + three);
        console.log("target.y + target.physicalFeatures.height - 2: " + four);
         if ((this.y + this.physicalFeatures.height < target.y || this.y + this.physicalFeatures.height > target.y+2) && ((this.y) > (target.y + target.physicalFeatures.height) || (this.y) < (target.y + target.physicalFeatures.height -2))) {
            if (this.velX <= 0) {
                // this.x = target.x - this.physicalFeatures.width;
                this.accelX = -this.accelX;
                this.velX = -this.velX;
            } else {
                // this.x = target.x + target.physicalFeatures.width;
                this.accelX = -this.accelX;
                this.velX = -this.velX;
            }
        }

    } else if (xIntersectMain && (yIntersectBottom || yIntersectTop)) {
        // console.log("This Y: " + this.y + " This AccelY: " + this.accelY + " This VelY: " + this.velY);
        // console.log("Target Top Y: " + target.y + " Target Bottom Y: " + (target.y + target.physicalFeatures.height));
        // console.log(this.y);
        // console.log(target.y);
        if (yIntersectBottom) {
            this.y += (target.y - this.y - this.physicalFeatures.height); //Only works if intersecting with the bottom of player (top of platform)
            this.isOnGround = true;
        }
        if (yIntersectTop) {
            this.y = (target.y + target.physicalFeatures.height); //Works for top of player (bottom of platform)
            if (((this.x <= (target.x + 2) && this.x >= (target.x - 2)) || (this.x >= (target.x + target.physicalFeatures.width - 10) && this.x <= (target.x + target.physicalFeatures.width - 6))) && this.velX != 0) {
                this.isOnGround = true;
            } else {
                this.isOnGround = false;
            }

        }
        this.accelY = 0;
        this.velY = 0;
    }



    return xIntersectMain && (yIntersectBottom || yIntersectTop);
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