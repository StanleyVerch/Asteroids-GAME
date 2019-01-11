/* Created an constants script that set properties of how the game will run
  *		
  * code based on the work on the youtube channel Mt. Ford Studios -- Asteroids in JavaScript (1979 Atari game) - tutorial
  * Revised by: Stanley Verch  - tutorial */

const FPS = 60;                     // 30 frames per second
const GAME_LIVES = 3                // starting number of lives
const FRICTION = 0.7;               // friction coefficient of space (0 = no friction, 1 = lots of friction)
const SHIP_SIZE = 30;	            // ship height in pixels
const SHIP_TURN_SPD = 360;          // turn speed in degrees per second
const SHIP_THRUST = 5;              // acceleration of the ship in pixels per second per second
const SHIP_EXPLODE_DUR = 0.3;       // duration of the ship's explosion in seconds
const SHIP_BLINK_DUR = 0.1;         // duration in seconds of a single blink during ship's invisibility
const SHIP_INV_DUR = 3;             // duration of the ship's invisibility in seconds
const ASTEROID_JAG = 0.4;           // jaggedness of the asteroids (0 = none, 1 = lots)
const ASTEROID_NUMBER = 1;          // starting number of asteroids
const ASTEROID_SIZE = 100;          // starting size of asteroids in pixels
const ASTEROID_SPD = 50;            // max starting speed of asteroids in pixels per second
const ASTEROID_VERT = 10;           // average number of vertices on each asteroid
const ASTEROID_PTS_LGE = 20;        // points scored for a large asteroid
const ASTEROID_PTS_MED = 50;        // points scored for a medium asteroid
const ASTEROID_PTS_SML = 100;       // points scored for a small asteroid
const BULLETS_MAX = 10;             // maximum number of laser bullets on screen at once
const BULLET_SPD = 500;             // speed of laser bullets in pixels per second
const BULLET_DIST = 0.6;            // max distance laser can travel as fraction of screen width
const BULLET_EXPLODE_DUR = 0.1;     // duration of the lasers' explosion in seconds
const TEXT_FADE_TIME = 2.5;         //  in seconds
const TEXT_SIZE = 40;               //  text font size in pixels
const SAVE_KEY_SCORE = "highscore"; // save key for local storage of high score

 // neural network parameters
const NUM_INPUTS = 4;
const NUM_HIDDEN = 20;
const NUM_OUTPUTS = 1;
const NUM_SAMPLES = 500000;        // number of training samples
const OUTPUT_LEFT = 0;             // expected neural output for turning left
const OUTPUT_RIGHT = 1;            // expected neural output for turning right
const OUTPUT_THRESHOLD = 0.05;     // how close the prediction must be to commit to a turn
const RATE_OF_FIRE = 15;           // shots per second

// developer flags
// const AUTOMATION_ON = false;
const RESET_HIGHSCORE = false;
const SHOW_CENTRE_DOT = false;      // show or hide ship's centre dot
const SHOW_BOUNDING = false;        // show or hide collision bounding