/**
 * Guess Tracker Object
 */
var guessTracker = {

	guesses: [],

	isNewGuess: function(unicodeLetter) {
		if (this.guesses[(unicodeLetter-65)] == 0){
			this.addGuess(unicodeLetter);
			return true;
		}
		else {
			return false;
		}
	},

	addGuess: function(unicodeLetter) {
		this.guesses[(unicodeLetter-65)] = 1;
	},

	reset: function() {
		this.guesses = new Array(26+1).join('0').split('').map(parseFloat);
	}
}

/**
 * Secret Word Object
 */
var secretWord = {

	sourceWord: "",
	uniques: 0,
	uniquesFound: 0,
	solved: false,
	letters: [],

	containsGuess: function(unicodeLetter) {
		if (this.letters[(unicodeLetter-65)] == 1){
			this.uniquesFound++;
			return true;
		}
		else {
			return false;
		}
	},

	isSolved: function() {
		return (this.uniques === this.uniquesFound);
	},

	reset: function(source) {
		this.sourceWord = source;
		this.uniques = 0;
		this.uniquesFound = 0;
		this.letters = new Array(26+1).join('0').split('').map(parseFloat);
		source = source.toLowerCase();
		for (var i = 0; i < source.length; i++) {
			var singleLetter = source[i];
			var lookupIndex = singleLetter.charCodeAt(0) - 97;
			if (this.letters[lookupIndex] == 0){
				this.letters[lookupIndex] = 1;
				this.uniques++;
			}
		}
	}
}

/**
 * Setting Up for Game
 */
var pokemon = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina", "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"];
var guessesLeft = 6;
var resetting = false;

function resetGuessDisplay() {
	document.getElementById("guessesLeft").innerHTML = guessesLeft;
	document.getElementById("guesses").innerHTML = "";
}
function resetGame() {
	//TODO: choose random word
	var word = pokemon[0];

	//reset Objects
	secretWord.reset(word);
	guessTracker.reset();
	guessesLeft = 6;
	resetGuessDisplay();
}

resetGame();

document.onkeyup = function (event) {

	if(resetting == true){
		console.log("sorry, still loading");
		return;
	}

	var keycode = event.keyCode;

	// ignore non-letter keys
	if (keycode < 65 || keycode > 90) {
		return;
	}
	if(guessTracker.isNewGuess(keycode)) {

		if (secretWord.containsGuess(keycode)){
			console.log("good guess!");
			if(secretWord.isSolved()) {
				console.warn("You Win!");
				console.log("new game in 3 seconds");
				resetting = true;
				setTimeout(function(){
					resetGame();
					resetting = false;
				}, 3000);
			}
		}
		else {
			console.log("whoops.");
			guessesLeft--;
		}
		
		var letter = String.fromCharCode(event.keyCode).toLowerCase();
		var prev = document.getElementById("guesses").innerHTML;
		document.getElementById("guesses").innerHTML = prev + " " + letter;
		document.getElementById("guessesLeft").innerHTML = guessesLeft;
	}
	if (guessesLeft == 0) {
		console.warn("You Lose!");
		console.log("new game in 3 seconds");
		resetting = true;
		setTimeout(function(){
			resetGame();
			resetting = false;
		}, 3000);
	}
};