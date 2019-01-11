/* Created an LaserBullet class
  *  this sets the properties of the Game  
  * 	this._xPos       	x position of the lasers bullet
  *	 	this._yPos       	y position of the lasers bullet
  *	    this._xVelocity		x speed of the lasers bullet
  *		this._yVelocity		y speed of the lasers bullet		 
  *		this._distance      tracks the maximum distance a bullet can travel (when distanced exceeded bullet removed from game)
  *		this._explodeTime	how long the laser bullet takes to explode.
  *		
  * code based on the work on the youtube channel Mt. Ford Studios -- Asteroids in JavaScript (1979 Atari game) - tutorial
  * Revised by: Stanley Verch  - tutorial */

class LaserBullet {
    constructor(xPos, yPos, radius, angle) {
        this._xPos = xPos + (4 / 3 * radius * Math.cos(angle));
        this._yPos = yPos - (4 / 3 * radius * Math.sin(angle));;
        this._xVelocity =  BULLET_SPD * Math.cos(angle) / FPS;
        this._yVelocity =  -BULLET_SPD * Math.sin(angle) / FPS;
        this._distance = 0;
        this._explodeTime = 0;
    }
    get xPos() {
        return this._xPos;
    }
    set xPos(x_value) {
        this._xPos = x_value;
    }
    get yPos() {
        return this._yPos;
    }
    set yPos(y_value) {
        this._yPos = y_value;
    }
    get xVelocity() {
        return this._xVelocity;
    }
    get yVelocity() {
        return this._yVelocity;
    }
    get distance() {
        return this._distance;
    }
    set distance(aDistance) {
        this._distance = aDistance ;
    }
    get explodeTime() {
        return this._explodeTime;
    }
    set explodeTime(aTime) {
        this._explodeTime = aTime;
    }
}