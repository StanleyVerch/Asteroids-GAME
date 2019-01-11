/* Created an Game class
  *  this sets the properties of the Game  
  * 	this._score       	Score of the game
  *		this._level   		Level of the player has achieved
  *	    this._lives			How many ships left
  *		this._highScore		Tracks the high score a player achieved (stored in the browsers local.storage) 
  *		this._gameText      displays text to inform the player of his status in the game
  *		this._gameTextFade	how long game text remains on screen							
  *		
  * code based on the work on the youtube channel Mt. Ford Studios -- Asteroids in JavaScript (1979 Atari game) - tutorial
  * Revised by: Stanley Verch  - tutorial */
class Game {
    constructor() {
        let scoreStr1 = localStorage.getItem(SAVE_KEY_SCORE);
        let scoreStr2;
        if ( scoreStr1 == null) {
            scoreStr2 = 0;
        } else {
            if ( RESET_HIGHSCORE == true ) {
                scoreStr1 = 0;
            }
            scoreStr2 = parseInt(scoreStr1)
        }
        this._score = 0;
        this._level = 0;
        this._lives = GAME_LIVES;
        this._highScore = scoreStr2;
        this._gameText;
        this._gameTextFade;
    }
     get score() {
        return this._score;
    }
    set score(aValue) {
        this._score = aValue;
    }
    get level() {
        return this._level;
    }
    levelUp() {
        this._level++;
        this.gameText = "Level " + this._level;
        this.gameTextFade = 1.0;
    }
    get lives() {
        return this._lives;
    }
    set lives(aValue) {
        this._lives = aValue;
    }
    get highScore() {
        return this._highScore;
    }
    set highScore(aValue) {
        this._highScore = aValue;
        localStorage.setItem(SAVE_KEY_SCORE, this._highScore );
    }
    get gameText() {
        return this._gameText;
    }
    set gameText(aValue) {
        this._gameText = aValue;
    }
    get gameTextFade() {
        return this._gameTextFade;
    }
    set gameTextFade(aValue) {
        this._gameTextFade = aValue;
    }
    drawScores() {
        // draw the score
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.font = TEXT_SIZE + "px dejavu sans mono";
        ctx.fillText(this._score, canv.width - SHIP_SIZE / 2, SHIP_SIZE);

        // draw the high score
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.font = (TEXT_SIZE * 0.75) + "px dejavu sans mono";
        ctx.fillText("BEST " + this._highScore, canv.width / 2, SHIP_SIZE);
    }
    drawGameText() {
		ctx.textAlign = "center";
		ctx.textBaseAlign = "middle";
		ctx.fillStyle="rgba(255,255,255," + this.gameTextFade + ")";
 		ctx.font ="small-caps " + TEXT_SIZE + "px dejavu sans mono";
 		ctx.fillText(this.gameText, canv.width/2, canv.height * 0.75);
         this.gameTextFade -= (1.0 / TEXT_FADE_TIME / FPS);
    }
}