/* Created an Ship class
  *  this sets the properties of the Game  
  * 	this._xPos       	x position of the ship (center of canvas)
  *	 	this._yPos       	y position of the ship (center of canvas)
  *	    this._radius		size of the ship based on constant
  *		this._angle			angle this ship is pointed in radians (must be between 0 and 2 Pi)
  *	    this._rotation		rotation of the ship
  *	    this._thrusting 	flag to determine if ship is moving 
  *	    this._thrust_xPos   speed of thrust in x direction
  *	    this._thrust_yPos   speed of thrust in y direction
  *	    this._blinkNum  	when ship is destroyed give ship invincible status make the ship blink on screen
  *	    this._blinkTime    	how long the ship is invincible after it is destroyed.
  *	    this._explodeTime 	time the ship takes to  be destroyed.
  *	    this._canShoot 		has the ship= true; 
  *	    this._laserBullets  contains the bullets of the laser
  *	    this._shipDead 		is the ship destroyed
  *		
  * code based on the work on the youtube channel Mt. Ford Studios -- Asteroids in JavaScript (1979 Atari game) - tutorial
  * Revised by: Stanley Verch  - tutorial */

class Ship {
     constructor() {
        this._xPos = canvas_width / 2;
        this._yPos = canvas_height / 2;
        this._radius = SHIP_SIZE / 2;
        this._angle = 90 / 180 *  Math.PI ;   // convert to radians.
        this._rotation = 0;   // convert to radians.
        this._thrusting = false; 
        this._thrust_xPos = 0; 
        this._thrust_yPos = 0;

        this._blinkNum  =  Math.ceil(SHIP_INV_DUR / SHIP_BLINK_DUR);
        this._blinkTime =  Math.ceil(SHIP_BLINK_DUR * FPS);
        this._explodeTime =  0;
        this._canShoot = true; 
        this._laserBullets = [];
        this._shipDead = false;
    }

    get xPos() {
        return this._xPos;
    }
    set xPos(aValue) {
        this._xPos = aValue;
    }

    get yPos() {
        return this._yPos;
    }
    set yPos(aValue) {
        this._yPos = aValue;
    }

    get radius() {
        return this._radius;
    }
    set radius(aValue) {
        this._radius = aValue;
    }

    get angle() {
        return this._angle;
    }
    set angle(aValue) {
        this._angle = aValue;
    }

    get rotation() {
        return this._rotation;
    }
    set rotation(aValue) {
        this._rotation = aValue;
    }

    get thrusting() {
        return this._thrusting;
    }
    set thrusting(aValue) {
        this._thrusting = aValue;
    }

    get thrust_xPos() {
        return this._thrust_xPos;
    }
    set thrust_xPos(aValue) {
        this._thrust_xPos = aValue;
    }

    get thrust_yPos() {
        return this._thrust_yPos;
    }
    set thrust_yPos(aValue) {
        this._thrust_yPos = aValue;
    }

    get blinkNum() {
        return this._blinkNum;
    }
    set blinkNum(aValue) {
        this._blinkNum = aValue;
    }

    get blinkTime() {
        return this._blinkTime;
    }
    set blinkTime(aValue) {
        this._blinkTime = aValue;
    }

    get explodeTime() {
        return this._explodeTime;
    }
    set explodeTime(aValue) {
        this._explodeTime = aValue;
    }

    get canShoot() {
        return this._canShoot;
    }
    set canShoot( aBoolean ) {
        this._canShoot = aBoolean;
    }

    get shipDead() {
        return this._shipDead;
    }
    set shipDead( aBoolean ) {
        this._shipDead = aBoolean;
    }

    get laserBullets(){
        return this._laserBullets;
    }

    rotateShip() {
        this._angle  += this._rotation  ;

        if (this._angle < 0) {
            this._angle += (Math.PI * 2);
        } else if (this._angle >= (Math.PI * 2)) {
            this._angle -= (Math.PI * 2);
        }
    }

    moveShip() {
        this._xPos += this._thrust_xPos;
        this._yPos += this._thrust_yPos;
            // handle edge of screen
       if (this._xPos < 0 - this._radius) {
           this._xPos = canvas_width + this._radius;
       } else if (this._xPos > canvas_width + this._radius) {
           this._xPos = 0 - this._radius;
       }
       if (this._yPos < 0 - this._radius) {
           this._yPos = canvas_height + this._radius;
       } else if (this._yPos > canvas_height + this._radius) {
           this._yPos = 0 - this._radius;
       }
   }

    thrust_ship() {
        if (this._shipDead) {
            return;
        }                         
        if ( this._thrusting  ) {
            // thrust the ship
            this._thrust_xPos += SHIP_THRUST * Math.cos(this._angle ) / FPS;
            this._thrust_yPos -= SHIP_THRUST * Math.sin(this._angle) / FPS;
        } else {
            this._thrust_xPos -= FRICTION * this._thrust_xPos / FPS;
            this._thrust_yPos -= FRICTION * this._thrust_yPos / FPS;
        }
    }
    drawThruster() {
        if (this._thrusting ) {
            // draw the thruster
            ctx.fillStyle = "red";
	    	ctx.strokeStyle = "yellow";
	    	ctx.lineWidth = SHIP_SIZE / 10;
	    	ctx.beginPath();
	    	ctx.moveTo( // rear left
		    	this._xPos - this._radius * (2 / 3 * Math.cos(this._angle) + 0.5 * Math.sin(this._angle)),
		    	this._yPos + this._radius * (2 / 3 * Math.sin(this._angle) - 0.5 * Math.cos(this._angle))
		    	);
	    	ctx.lineTo( // rear centre (behind the ship)
                this._xPos - this._radius * 5 / 3 * Math.cos(this._angle),
		    	this._yPos + this._radius * 5 / 3 * Math.sin(this._angle)
		    	);
	    	ctx.lineTo( // rear right
	    		this._xPos - this._radius * (2 / 3 * Math.cos(this._angle) - 0.5 * Math.sin(this._angle)),
	    		this._yPos + this._radius * (2 / 3 * Math.sin(this._angle) + 0.5 * Math.cos(this._angle))
	    		);
	    	ctx.closePath();
	    	ctx.fill();
	    	ctx.stroke();
        } 
    }

    drawShip() { 
        this.drawShipParms(this._xPos, this._yPos, this._radius, this._angle);
       
        if (SHOW_BOUNDING){
            ctx.strokeStyle = "lime";
            ctx.beginPath();
            ctx.arc(this._xPos, this._yPos, this._radius, 0, 2 * Math.PI, false);
            ctx.stroke();
        }
        if (SHOW_CENTRE_DOT) {
           ctx.fillStyle = "red";
           ctx.fillRect(this._xPos - 1, this._yPos  - 1, 2, 2);
          }
    }

    drawShipParms(xCoord, yCoord, radius, angle, colour = "white") { 
        ctx.strokeStyle = colour;
        ctx.lineWidth = SHIP_SIZE / 20;
        ctx.beginPath();
       
        // nose of the ship
        ctx.moveTo( 
                    xCoord + 4 / 3 * radius * Math.cos( angle ),
                    yCoord - 4 / 3 * radius * Math.sin( angle )
                    );
         // rear left
        ctx.lineTo( 
                    xCoord - radius * (2 / 3 * Math.cos( angle ) + Math.sin( angle )),
                    yCoord + radius * (2 / 3 * Math.sin( angle ) - Math.cos( angle ))
                   );
        ctx.lineTo( // rear right
                    xCoord - radius * (2 / 3 * Math.cos( angle ) - Math.sin( angle )),
                    yCoord + radius * (2 / 3 * Math.sin( angle ) + Math.cos( angle ))
                    );
        ctx.closePath();
        ctx.stroke();
    }
    explodeShip() {
        this._explodeTime = Math.ceil(SHIP_EXPLODE_DUR * FPS);
    }

    drawExplodingShip() {
        // draw the explosion (concentric circles of different colours)
        ctx.fillStyle = "darkred";
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.radius * 1.7, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.radius * 1.4, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.radius * 1.1, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.radius * 0.8, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.radius * 0.5, 0, Math.PI * 2, false);
        ctx.fill();
    }
    shootLaser() {
        let laserBullet = new LaserBullet(this._xPos, this._yPos, this._radius, this._angle);
        if (this._canShoot && this._laserBullets.length < BULLETS_MAX ){
            this._laserBullets.push(laserBullet);
        }
        this._canShoot = false;
    }
    drawLaserBullets() {
        // draw the lasers
	    for (var i = 0; i < this._laserBullets.length; i++) {
            let xShipPos = this._laserBullets[i].xPos;
            let yShipPos = this._laserBullets[i].yPos;
	    	if (this._laserBullets[i].explodeTime == 0) {
	    		ctx.fillStyle = "salmon";
	    		ctx.beginPath();
	    		ctx.arc(xShipPos, yShipPos, SHIP_SIZE / 15, 0, Math.PI * 2, false);
	    		ctx.fill();
    		} else {
	    		// draw the eplosion
	    		ctx.fillStyle = "orangered";
	    		ctx.beginPath();
		    	ctx.arc(xShipPos, yShipPos, this._radius * 0.75, 0, Math.PI * 2, false);
		    	ctx.fill();
		    	ctx.fillStyle = "salmon";
		    	ctx.beginPath();
	    		ctx.arc(xShipPos, yShipPos, this._radius * 0.5, 0, Math.PI * 2, false);
	    		ctx.fill();
	    		ctx.fillStyle = "pink";
	    		ctx.beginPath();
	    		ctx.arc(xShipPos, yShipPos, this._radius * 0.25, 0, Math.PI * 2, false);
	    		ctx.fill();
	    	}
    	}
    }
    moveLaserBullets() {
        // draw the lasers
	    for (var i = this._laserBullets.length -1; i >= 0; i--) {
            let bulletDistance = this._laserBullets[i].distance;

            // check distance travelled
            if (bulletDistance > BULLET_DIST * canvas_width) {
                this._laserBullets.splice(i, 1);
                continue;
            }
            // handle the explosion
            if (this._laserBullets[i].explodeTime > 0) {
                this._laserBullets[i].explodeTime--;
                // destroy the laser after the duration is up
	        	if (this._laserBullets[i].explodeTime == 0) {
		    	    this._laserBullets.splice(i, 1);
                    continue;
                }
            } else {
                // move the laser
                let bullet_xVelocity = this._laserBullets[i].xVelocity;
                let bullet_yVelocity = this._laserBullets[i].yVelocity;
                this._laserBullets[i].xPos += bullet_xVelocity;
                this._laserBullets[i].yPos += bullet_yVelocity;
                // calculate the distance travelled   
                this._laserBullets[i].distance += Math.sqrt(Math.pow(bullet_xVelocity,2) + Math.pow(bullet_yVelocity,2));
                
                // handle edge of screen
	        	if (this._laserBullets[i].xPos < 0) {
	        		this._laserBullets[i].xPos = canvas_width;
	        	} else if (this._laserBullets[i].xPos > canvas_width) {
		        	this._laserBullets[i].xPos= 0;
	        	}
	        	if (this._laserBullets[i].yPos < 0) {
        			this._laserBullets[i].yPos = canvas_height;
	        	} else if (this._laserBullets[i].yPos > canvas_height) {
	        		this._laserBullets[i].yPos = 0;
	        	}
            }
    	}
    }
}