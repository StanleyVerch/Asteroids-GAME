/* Created an AsteroidBelt class
  *  This class contains an array of asteroids 
  *  It also class handles the movement of the asteroids
  *	 It draws the asteroids
  *  it handles collision detection with ship and the weapons bullets
  *  it also handles the destruction of the asteroid when hit.
  *		
  * code based on the work on the youtube channel Mt. Ford Studios -- Asteroids in JavaScript (1979 Atari game) - tutorial
  * Revised by: Stanley Verch  - tutorial */


class AsteroidBelt {

    constructor(aShip) {
        this._asteroids =[];  
        let x,y, asteroid; 
        let gameLevel = aGame.level;
        for (var i = 0; i < ASTEROID_NUMBER + gameLevel - 1; i++) {
            do {
                x = Math.floor(Math.random() * canv.width);
                y = Math.floor(Math.random() * canv.height);
                asteroid = new Asteroid(x,y, Math.ceil(ASTEROID_SIZE / 2) );
            } while (distBetweenPoints(aShip.xPos, aShip.yPos, x, y) < ASTEROID_SIZE * 2 + aShip.radius );
            this._asteroids.push(asteroid);
        }
    }
    get asteroids() {
        return this._asteroids;
    }

    drawAsteroids(){
        let xPos, yPos, radius, angle, vertices,  asteroid_offset;
        
        for (var i = 0; i < this._asteroids.length; i++ ){
            ctx.strokeStyle = "slategrey";
            ctx.lineWidth = SHIP_SIZE / 20;
     
            // get asteroid properties
            xPos = this._asteroids[i].xPos;
            yPos = this._asteroids[i].yPos; 
            radius = this._asteroids[i].radius;
            angle = this._asteroids[i].angle;
            vertices = this._asteroids[i].vertices;
            asteroid_offset = this._asteroids[i].offs;
        
            // draw path
            ctx.beginPath();
            ctx.moveTo(
                xPos + radius * asteroid_offset[0] *  Math.cos(angle),
                yPos + radius * asteroid_offset[0] *   Math.sin(angle)
                );
    
            // draw shape of asteroid -- polygon
            for(var j=1; j< vertices; j++) {
                ctx.lineTo(     
                    xPos + radius * asteroid_offset[j] * Math.cos(angle + j * Math.PI * 2 / vertices),
                    yPos + radius * asteroid_offset[j] * Math.sin(angle + j * Math.PI * 2 / vertices)
                );
            }
            ctx.closePath();
            ctx.stroke();

            		// show asteroid's collision circle
		if (SHOW_BOUNDING) {
			ctx.strokeStyle = "lime";
			ctx.beginPath();
			ctx.arc(xPos, yPos, radius, 0, Math.PI * 2, false);
			ctx.stroke();
		}
        }
    }
    moveAsteroids(){
        for (var i = 0; i < this._asteroids.length; i++) {
            this._asteroids[i].xPos += this._asteroids[i].xVelocity;
            this._asteroids[i].yPos += this._asteroids[i].yVelocity;
    
            // handle asteroid edge of screen
            if (this._asteroids[i].xPos < 0 - this._asteroids[i].radius) {
                this._asteroids[i].xPos = canv.width + this._asteroids[i].radius;
            } else if (this._asteroids[i].xPos > canv.width + this._asteroids[i].radius) {
                this._asteroids[i].xPos = 0 - this._asteroids[i].radius;
            }
    		if (this._asteroids[i].yPos < 0 - this._asteroids[i].radius) {
                this._asteroids[i].yPos = canv.height + this._asteroids[i].radius;
            } else if (this._asteroids[i].yPos > canv.height + this._asteroids[i].radius) {
                this._asteroids[i].yPos = 0 - this._asteroids[i].radius;
            }
        }
    }
    collisionDetect(aShip) {
        let ax, ay, ar;
        for (var i = this._asteroids.length - 1; i >=0; i--) {
            ax = this._asteroids[i].xPos;
            ay = this._asteroids[i].yPos;
            ar = this._asteroids[i].radius; 
            if (distBetweenPoints(aShip.xPos, aShip.yPos,ax,ay) < aShip.radius + ar) {
                aShip.explodeShip();
                this.destroyAsteroid(i);
                break;
            }
        }
    }
    detectLaserBulletHits(aShip){
        let a_xPos, a_yPos, a_radius, lb_xPos, lb_yPos;
                
        for (var i = this._asteroids.length -1; i >= 0; i--) {
            // get asteroid properties
            a_xPos    = this._asteroids[i].xPos;
            a_yPos    = this._asteroids[i].yPos; 
            a_radius  = this._asteroids[i].radius;

            // loop thru the lasers bullets
            for (var j = aShip.laserBullets.length - 1; j >= 0; j--)  {
                lb_xPos = aShip.laserBullets[j].xPos;
                lb_yPos = aShip.laserBullets[j].yPos;

                // detect hits
                if (aShip.laserBullets[j].explodeTime == 0 && 
                    distBetweenPoints(a_xPos, a_yPos, lb_xPos, lb_yPos) < a_radius) {
                    
                     // destroy the asteroid and activate the laser explosion
                    this.destroyAsteroid(i);
                    // this._asteroids.splice(i,1);
                    aShip.laserBullets[j].explodeTime = Math.ceil(BULLET_EXPLODE_DUR * FPS);
                    break;
                }
            }
        }
    }
    destroyAsteroid(index) {
        let a_xPos    = this._asteroids[index].xPos;
        let a_yPos    = this._asteroids[index].yPos; 
        let a_radius  = this._asteroids[index].radius;

        // split the asteroid in two if necessary
        if (a_radius == Math.ceil(ASTEROID_SIZE / 2)) { // large asteroid
            this._asteroids.push(new Asteroid(a_xPos, a_yPos, Math.ceil(ASTEROID_SIZE / 4) ));
            this._asteroids.push(new Asteroid(a_xPos, a_yPos, Math.ceil(ASTEROID_SIZE / 4) ));
            aGame.score += ASTEROID_PTS_LGE ;
        } else if (a_radius == Math.ceil(ASTEROID_SIZE / 4)) { // medium asteroid
            this._asteroids.push(new Asteroid(a_xPos, a_yPos, Math.ceil(ASTEROID_SIZE / 8) ));
            this._asteroids.push(new Asteroid(a_xPos, a_yPos, Math.ceil(ASTEROID_SIZE / 8) ));
            aGame.score += ASTEROID_PTS_MED ;
        } else {
             aGame.score += ASTEROID_PTS_SML ;
        }

        // check high score
        if (aGame.score > aGame.highScore) {
              aGame.highScore = aGame.score;
        }

        // destroy the asteroid
        this._asteroids.splice(index, 1);

        // new level when asteroids array is empty 
        if (this._asteroids.length == 0) {
            newLevel();
        }
    }
}