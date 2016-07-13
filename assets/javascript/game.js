/**
 * Guess Tracker Object
 */
var guessTracker = {

	guesses: [],

	isNewGuess: function(unicodeLetter) {
		console.log("isNewGuess fired");
		//console.log(this.guesses.length);
		// console.log(this.guesses);
		// console.log(unicodeLetter);
		// console.log((unicodeLetter - 65));
		if (this.guesses[(unicodeLetter - 65)] == 0){
			console.log("returning true");
			this.addGuess(unicodeLetter);
			return true;
		}
		else {
			console.log("returning false");
			return false;
		}
	},

	addGuess: function(unicodeLetter) {
		console.log("addGuess fired");
		this.guesses[(unicodeLetter-65)] = 1;
	},

	reset: function() {
		console.log("reset fired");
		this.guesses = new Array(26+1).join('0').split('').map(parseFloat);
	}
}

function resetDisplay() {
	document.getElementById("guessesLeft").innerHTML = guessesLeft;
	document.getElementById("guesses").innerHTML = "";
}

/**
 * Setting Up for Game
 */
var pokemon = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina", "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"];
var word = pokemon[0];
guessTracker.reset();
guessesLeft = 5;
resetDisplay();

document.onkeyup = function (event) {
	var keycode = event.keyCode;

	// ignore non-letter keys
	if (keycode < 65 || keycode > 90) {
		return;
	}
	if(guessTracker.isNewGuess(keycode)) {
		guessesLeft--;
		var letter = String.fromCharCode(event.keyCode).toLowerCase();
		console.log(letter);
		var prev = document.getElementById("guesses").innerHTML;
		document.getElementById("guesses").innerHTML = prev + " " + letter;
		document.getElementById("guessesLeft").innerHTML = guessesLeft;
	}
	if (guessesLeft == 0) {
		guessTracker.reset();
		guessesLeft = 5;
		resetDisplay();
	}
	
};

