// goodies

var StationaryPiece = function() {

	this.pieceType = 'stationary';

	this.hit = false;

	// default boundaries for stationary pieces
	this.boundaryX = 0;
	this.boundaryY = 5;
	this.boundaryWidth = 12;
	this.boundaryHeight = 14;


	this.render = function() {
		this.vy = this.y + offsetY;
	  ctx.drawImage(Resources.get(this.sprite), this.x, this.vy);
	};

	this.update = function(dt) {
		collision.call(this);
	};
	this.hitSprite = 'images/blank-piece.png';
};

var Koch = function() {
	StationaryPiece.call(this);

	this.sprite = 'images/goodie-koch.png';
	this.hitSprite = 'images/goodie-koch-hit.png';

	this.name = 'koch';

	this.goodie = 9;

	this.goodieType = 'cash';

	this.boundaryX = 8;
	this.boundaryY = 6;
	this.boundaryWidth = 4;
	this.boundaryHeight = 10;

};

// chamber of commerce money
var Uscc = function() {
	// this.prototype = StationaryPiece;

	StationaryPiece.call(this);

	this.name = 'uscc';

	this.sprite = 'images/goodie-uscc.png';

	this.goodie = 4;

	this.goodieType = 'cash';

	this.boundaryX = 0;
	this.boundaryY = 3;
	this.boundaryWidth = 9;
	this.boundaryHeight = 14;

	this.hitSprite = 'images/goodie-uscc-hit.png';

};

// inflammatory statement, jump ahead
var Inflame = function() {
	StationaryPiece.call(this);

	this.name = 'inflame';

	this.goodieType = 'position';
	this.goodie = 3;

	this.sprite = 'images/goodie-inflame.png';

	this.boundaryX = 5;
	this.boundaryY = 7;
	this.boundaryWidth = 7;
	this.boundaryHeight = 6;

};

//unused Reagan piece (would freeze all enemies, theoretically)
var Reagan = function() {
	MovingEnemy.call(this);

	this.goodieType = 'enemySpeed';

	this.sprite = 'images/goodie-reagan.png';

	var boundaryX = 0;
	var boundaryY = 3;
	var boundaryWidth = 10;
	var boundaryHeight = 14;

	this.update = function(dt) {
		collision.call(this);

		var oldPosition = [this.x, this.y];

		// get random new point
		function getNewPosition() {

			position = randomPosition(boundaryWidth, boundaryHeight, boundaryY, boundaryY);

			calcSpeed();

			function calcSpeed() {
			    var x = Math.abs(oldPosition[0] - position[0]);
			    var y = Math.abs(oldPosition[1] - position[1]);
			    var speedVariable = Math.floor(Math.random() * 100);

			    speed.x = x / speedVariable;
			    speed.y = y / speedVariable;

			}
		}

		// need to find a match within 1 px, since final position may not === what is calculated with speed variable
		if ((Math.abs(position[0] - this.x) < 1) && (Math.abs(position[1] - this.y) < 1)) {
			getNewPosition();
		}

		if (position[0] > this.x) {
			this.x += speed.x;

		} else if (position[0] < this.x) {
			this.x -= speed.x;
		}

		if (position[1] > this.y) {
			this.y += speed.y;

		} else if (position[1] < this.y) {
			this.y -= speed.y;
		}

	}; // end update function for Reagan
};