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

	ships: [{ locations: ["06", "16", "26"], hits: ["", "", ""] },
			{ locations: ["24", "34", "44"], hits: ["", "", ""] },
			{ locations: ["10", "11", "12"], hits: ["", "", ""] }],
	fire: function(guess) {

		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			locations = ship.locations;
			var index = locations.indexOf(guess);
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
		firstChar =  guess.charAt(0);
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
}

window.onload = init;










