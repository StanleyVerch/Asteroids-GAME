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