  /* This is the main application folder that displays the canvas 
  * in the browser
  *
  * code based on the work on the youtube channel Mt. Ford Studios -- Asteroids in JavaScript (1979 Atari game) - tutorial
  * Revised by: Stanley Verch  - tutorial */

/** @type {HTMLCanvasElement} */
let canv = document.getElementById("gameCanvas");
let ctx = canv.getContext("2d");


// set up the game parameters
var aShip, asteroids, aGame;
newGame();

// set up the neural network
var aNeuralNetwork, aiShootTime = 0;
if (AUTOMATION_ON) {
    
    aNeuralNetwork = new NeuralNetwork(NUM_INPUTS,NUM_HIDDEN, NUM_OUTPUTS);
    
    // train the network
    let ax, ay, sa, sx, sy;

    for (let i = 0; i < NUM_SAMPLES; i++) {
        // random asteroid location (include off-screen data)
        ax = Math.random() * (canv.width + ASTEROID_SIZE) - ASTEROID_SIZE / 2;
        ay = Math.random() * (canv.height + ASTEROID_SIZE) - ASTEROID_SIZE / 2;
        
        // ship's angle and position
        sa = Math.random() * Math.PI * 2;
        sx = aShip.xPos;
        sy = aShip.yPos;
        
        // calculate the angle to the asteroid
        let angle = angleToPoint(sx, sy, sa, ax, ay);
        

        // determine the direction to turn
        let direction = angle > Math.PI ? OUTPUT_LEFT : OUTPUT_RIGHT;

        // train the network
        aNeuralNetwork.train(normaliseInput(ax, ay, angle, sa), [direction]);
        }
    }



// set up event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// setup the game loop here...
setInterval(drawScreen, 1000/ FPS);

function angleToPoint(x, y, bearing, targetX, targetY) {
    let angleToTarget = Math.atan2(-targetY + y, targetX - x);
    let diff = bearing - angleToTarget;
    return (diff + Math.PI * 2) % (Math.PI * 2);
}

function normaliseInput(asteroid_xPos, asteroid_yPos, asteroid_angle, shipA) {
    // normalise the values to between 0 and 1
    let input = [];
    input[0] = (asteroid_xPos + ASTEROID_SIZE / 2) / (canv.width + ASTEROID_SIZE);
    input[1] = (asteroid_yPos + ASTEROID_SIZE / 2) / (canv.height + ASTEROID_SIZE);
    input[2] = asteroid_angle / (Math.PI * 2);
    input[3] = shipA / (Math.PI * 2);
    return input;
}

 function keyDown(ev){
    if (aShip.ShipDead || AUTOMATION_ON) {
        return;
    }
   switch(ev.keyCode) {
    case 32: // space bar (shoot laser)
        aShip.shootLaser();
		break;
   case 37: // left arrow (rotate ship left)
        aShip.rotation=(SHIP_TURN_SPD / 180 * Math.PI / FPS);
       break;
   case 38: // up arrow (thrust the ship forward)
        aShip.thrusting = true;
       break;
   case 39: // right arrow (rotate ship right)
        aShip.rotation = (-SHIP_TURN_SPD / 180 * Math.PI / FPS);
       break;
   }
}

function keyUp(/** @type {KeyboardEvent} */ ev) {
    if (aShip.ShipDead || AUTOMATION_ON) {
        return;
    }   
   switch(ev.keyCode) {
    case 32: // space bar (shoot laser)
         aShip.canShoot = true;
        break;
   case 37: // left arrow (stop rotating left)
        aShip.rotation =(0);
       break;
   case 38: // up arrow (stop thrusting)
       aShip.thrusting = false;
       break;
   case 39: // right arrow (stop rotating right)
        aShip.rotation =(0);
       break;
       }
}
function  drawScreen()  {
    var blinkOn = aShip.blinkNum % 2 == 0;
    var explodingShip = aShip.explodeTime > 0;

    // use the neural network
    if (AUTOMATION_ON && !aShip.shipDead ) {
        // compute the closest asteroid

        let numOfAsteroids = asteroids.asteroids.length;
        let c = 0; // closest index
        let shipX   = aShip.xPos;
        let shipY   = aShip.yPos;
        let ax      = asteroids.asteroids[0].xPos;
        let ay      = asteroids.asteroids[0].yPos;
        let dist0 = distBetweenPoints(shipX, shipY, ax, ay);
        
        for (let i = 1; i < numOfAsteroids; i++) {
            let ax = asteroids.asteroids[i].xPos;
            let ay = asteroids.asteroids[i].yPos;
            let dist1 = distBetweenPoints(shipX, shipY, ax, ay);
            if (dist1 < dist0) {
                dist0 = dist1;
                c = i;
            }
        }

        // make a prediction based on current data
        ax = asteroids.asteroids[c].xPos;
        ay = asteroids.asteroids[c].yPos;
        shipA = aShip.angle;
        shipX = aShip.xPos;
        shipY = aShip.yPos;
        let angle = angleToPoint(shipX, shipY, shipA, ax, ay);
        let predict = aNeuralNetwork.feedForward(normaliseInput(ax, ay, angle, shipA)).data[0][0];
       

        // make a turn
        let dLeft = Math.abs(predict - OUTPUT_LEFT);
        let dRight = Math.abs(predict - OUTPUT_RIGHT);
        if (dLeft < OUTPUT_THRESHOLD) {
            aShip.rotation=(SHIP_TURN_SPD / 180 * Math.PI / FPS);
        } else if (dRight < OUTPUT_THRESHOLD) {
            aShip.rotation=(-SHIP_TURN_SPD / 180 * Math.PI / FPS);
        } else {
            aShip.rotation=  0; // stop rotating
        }

        // shoot the laser
        if (aiShootTime == 0) {
            aiShootTime = Math.ceil(FPS / RATE_OF_FIRE);
            aShip.canShoot = true;
            aShip.shootLaser();
        } else {
            aiShootTime--;
        }
    }



    //draw background  in canvas Space
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canv.width, canv.height );

    // draw asteroids
    asteroids.drawAsteroids();

    // thrust the ship
    aShip.thrust_ship( );
    
    if (!explodingShip && blinkOn) {
        // draw thrusters
        aShip.drawThruster( );
    }

     // draw ship
     if (!explodingShip) {
        if (blinkOn ) {
            aShip.drawShip();
        }
        if (aShip.blinkNum > 0) {
            aShip.blinkTime--;

            if ( aShip.blinkTime == 0 ) {
                 aShip.blinkTime = Math.ceil(SHIP_BLINK_DUR * FPS);
                 aShip.blinkNum--;
            }
        }
    } else {
        aShip.drawExplodingShip();
    }
    

    // check for asteroid collisions
    if (!explodingShip) {    
        if ( aShip.blinkNum == 0 && !aShip.shipDead  ) {
            // check for asteroid collisions
            asteroids.collisionDetect(aShip);     
        }

        // rotate the ship
        aShip.rotateShip() ;
        // move ship
        aShip.moveShip() ;

     } else {
        aShip.explodeTime--;
        if (aShip.explodeTime == 0) {
            aGame.lives--;
            if (aGame.lives == 0) {
                gameOver();
                
            } else {
                aShip = new Ship(); 
            }
         }   
    }

    // draw the game text
    if (aGame.gameTextFade >= 0) {
        aGame.drawGameText();
    } else if ( aShip.shipDead){
        newGame(); 
    }

    // draw the game lives ship s
    let lifeColour;
    for (let i = 0; i < aGame.lives; i++) {
        lifeColour = explodingShip && i == aGame.lives -1 ? "red" : "white";
        aShip.drawShipParms(SHIP_SIZE + i * SHIP_SIZE * 1.2, 
                       SHIP_SIZE,
                       SHIP_SIZE / 2,
                       Math.PI / 2,
                       lifeColour );
    }

    // draw the scores
    aGame.drawScores();


    // draw laser bullet
    aShip.drawLaserBullets();
    aShip.moveLaserBullets();

    // detect hits on asteroids
    asteroids.detectLaserBulletHits(aShip);
     
     // move asteroids
     asteroids.moveAsteroids();

}
function distBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
function newGame() {
    aGame = new Game;
    aShip  = new Ship;
    newLevel();
}
function newLevel(){
    aGame.levelUp();

    aGame.gameText = "Level " + aGame.level;
    aGame.gameTextFade = 1.0;
    asteroids = new AsteroidBelt(aShip);
}
function gameOver() {
    aShip.shipDead = true; 
    aGame.gameText = "Game Over";
	aGame.gameTextFade = 1.0;
}