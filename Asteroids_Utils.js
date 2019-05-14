class Utils {
    constructor(gameName="Asteroids") {
        this._gameName = gameName ;
   }
   distanceXY( x0, y0, x1, y1) {
        let dx = x1 - x0,
            dy = y1 - y0;
    return Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
    }

    angleToTarget( shipX, shipy, asteroidx, asteroidy) {
        let dx = asteroidx - shipX,
            dy = 0 - (asteroidy - shipy );  //  minus direction is up positive direction is down on screen
    return Math.atan2(dy, dx);
    }

    angleToPoint(shipX, shipy, bearing, asteroidx, asteroidy) {
        let angleToTarget = this.angleToTarget( shipX, shipy, asteroidx, asteroidy);
        let diff = bearing - angleToTarget;
        return (diff + Math.PI * 2) % (Math.PI * 2);
    }

    degreesToRads(degrees) {
		return degrees / (180 * Math.PI);
	}

	radsToDegrees(radians) {
		return radians * 180 / Math.PI;
	}
}