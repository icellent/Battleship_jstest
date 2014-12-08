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
				};
				return true;
				// we have a hit.
			};
		}
		view.displayMiss(guess);
		view.displayMessage("You missed");
		return false;
	},

	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] !== "hit") {
				return false;
			};
		}
		return true;
	}
}

model.fire("11");
model.fire("26");
model.fire("23");


