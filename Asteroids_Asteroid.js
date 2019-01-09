class Asteroid {
    constructor(x_val, y_val, radius_val) {
        let gameLevel = aGame.level;
        let AsteroidSpeed =  (1 + 0.1 * (gameLevel-1) ) * ASTEROID_SPD ;

        this._xPos = x_val;
        this._yPos = y_val;
        this._xVelocity =  Math.random() * AsteroidSpeed / FPS * (Math.random() < 0.5 ? 1 : -1);
        this._yVelocity =  Math.random() * AsteroidSpeed / FPS * (Math.random() < 0.5 ? 1 : -1);
        this._radius = radius_val;
        this._angle = Math.random() * Math.PI * 2;   
        this._vertices =Math.floor(Math.random() * (ASTEROID_VERT + 1) + ASTEROID_VERT / 2);
        this._offs = [];
        for (var i=0; i< this.vertices; i++) {
            this._offs.push(Math.random() * ASTEROID_JAG * 2 + 1 - ASTEROID_JAG);
        }
    }
    get xPos() {
        return this._xPos;
    }
    set xPos(x_val) {
        this._xPos = x_val;
    }

    get yPos() {
        return this._yPos;
    }
    set yPos(x_val) {
        this._yPos = x_val;
    }
    
    get xVelocity (){
        return this._xVelocity;
    }
    get yVelocity (){
        return this._yVelocity;
    }

    get radius() {
        return this._radius;
    }    
    get angle() {
        return this._angle;
    }
    get vertices() {
        return this._vertices;
    }
    
    get offs() {
        return this._offs;
    }
}