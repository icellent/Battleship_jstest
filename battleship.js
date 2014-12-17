var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById('messageArea');
		messageArea.innerHTML = msg;
	},
	displayHit: function(location){
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},
	displayMiss: function(location){
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}
};


// var ships = [
// 	{locations: ["10", "20", "30"], hits: ["", "", ""]},
// 	{locations: ["32", "33", "34"], hits: ["", "", ""]},
// 	{locations: ["63", "64", "65"], hits: ["hit", "", "hit"]},
// ];

/******** test drive

var ship2 = ships[1];
var locations = ship2.locations;
console.log("Location is " + locations[1]);

var ship3 = ships[2];
var hits = ship3.hits;
if (hits[0] === "hit") {
	console.log("Ouch, hit on third ship at location one");
}
*********/

var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipSunk: 0,

	ships: [{ locations: [0, 0, 0], hits: ["", "", ""] },
			{ locations: [0, 0, 0], hits: ["", "", ""] },
			{ locations: [0, 0, 0], hits: ["", "", ""] }],
	fire: function(guess) {

		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);
			if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("Hit!");
				if (this.isSunk(ship)) {
					this.shipSunk++;
				}
				return true;
				// we have a hit.
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You missed");
		return false;
	},

	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
		return true;
	},

	generateShipLocations: function () {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
	},

	generateShip: function () {
		var direction = Math.floor(Math.random()*2);
		var row, col;

		if (direction === 1) {
			// Generate a starting location for a horizontal ship
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
		}
		else {
			// Generate a starting location for a vertical ship
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				// add location to array for new horizontal ship
				newShipLocations.push(row + "" + (col + i));
			}
			else {
				newShipLocations.push((row + i) + "" + col);
				// add location to array for new vertical ship
			}
		}
		return newShipLocations;
	},
	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = model.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}


};

/* model.fire("11");
model.fire("26");
model.fire("23");
*/

var controller = {
	guesses: 0,

	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.shipSunk === model.numShips) {
				view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
			}
		}
		// more code will go here
	}
};
function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert ("Oop, please enter a letter and a number on the board.");
	}
	else {
		firstChar =  guess.charAt(0).toUpperCase();
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);

		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		}
		else if (row < 0 || row>= model.boardSize || column < 0
			|| column >= model.boardSize) {

			alert("Oop, that's off the board.");
		}
		else {
			return row + column;
		}
	}
	return null;
}

//console.log(parseGuess("B3"));
//console.log(parseGuess("A7"));
//controller.processGuess("A0");
//controller.processGuess("A6"); controller.processGuess("B6"); controller.processGuess("C6");
//controller.processGuess("C4"); controller.processGuess("D4"); controller.processGuess("E4");
//controller.processGuess("B0"); controller.processGuess("B1"); controller.processGuess("B2");

function handleFireButton () {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	controller.processGuess(guess);

	guessInput.value = "";
	// get the player's guess input
	// and get it to the controller
}

function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");
	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}

function init() {
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	model.generateShipLocations();
}

window.onload = init;









