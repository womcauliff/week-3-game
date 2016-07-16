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
	displayWord: "",
	uniques: 0,
	uniquesFound: 0,
	solved: false,
	alphabet: [],

	containsGuess: function(unicodeLetter) {
		if (this.alphabet[(unicodeLetter-65)] !== 0){
			this.uniquesFound++;

			//update displayWord, swapping blanks with correct letter
			this.fillBlanks(unicodeLetter);
			return true;
		}
		else {
			return false;
		}
	},

	isSolved: function() {
		return (this.uniques === this.uniquesFound);
	},

	fillBlanks: function(unicodeLetter) {
		for (var i = 0; i < this.alphabet[(unicodeLetter-65)].length; i++) {
				this.displayWord = 
					this.displayWord.slice(0, this.alphabet[(unicodeLetter-65)][i]) 
					+ String.fromCharCode(unicodeLetter) 
					+ (this.displayWord.slice(((this.alphabet[(unicodeLetter-65)][i])+1), this.displayWord.length));
		}
	},

	reset: function(source) {
		this.sourceWord = source;
		this.displayWord = this.sourceWord.replaceAll("[A-Za-z]", "_");
		this.uniques = 0;
		this.uniquesFound = 0;
		this.alphabet = new Array(26+1).join('0').split('').map(parseFloat);
		source = source.toLowerCase();
		for (var i = 0; i < source.length; i++) {
			var singleLetter = source[i];
			var lookupIndex = singleLetter.charCodeAt(0) - 97;
			if (this.alphabet[lookupIndex] === 0){
				this.alphabet[lookupIndex] = [i];
				this.uniques++;
			}
			else{
				//letter occurs more than once in word
				this.alphabet[lookupIndex].push(i);
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
var wins = 0;

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function resetGuessDisplay() {
	document.getElementById("guessesLeft").innerHTML = guessesLeft;
	document.getElementById("guesses").innerHTML = "";
	document.getElementById("wins").innerHTML = wins;
	document.getElementById("hiddenword").innerHTML = secretWord.displayWord;
}
function resetGame() {
	
	var word = pokemon[Math.floor(Math.random() * pokemon.length)];

	//reset Objects
	secretWord.reset(word);
	guessTracker.reset();
	guessesLeft = 6;
	resetGuessDisplay();
}



//for initial page load
resetGame();

document.onkeyup = function (event) {

	//still loading next round, ignore input
	if(resetting == true){
		return;
	}

	var keycode = event.keyCode;

	// ignore non-letter keys
	if (keycode < 65 || keycode > 90) {
		return;
	}

	//new guess
	if(guessTracker.isNewGuess(keycode)) {

		//show guess
		var letter = String.fromCharCode(event.keyCode).toLowerCase();
		var prev = document.getElementById("guesses").innerHTML;
		document.getElementById("guesses").innerHTML = prev + " " + letter;

		//correct guess
		if (secretWord.containsGuess(keycode)){
			//update blanks with correctly guessed letter
			document.getElementById("hiddenword").innerHTML = secretWord.displayWord;
			
			//Won game, reset for next game
			if(secretWord.isSolved()) {
				wins++;
				resetting = true;
				setTimeout(function(){
					resetGame();
					resetting = false;
				}, 3000);
			}
		}
		//incorrect guess
		else {
			guessesLeft--;
			document.getElementById("guessesLeft").innerHTML = guessesLeft;
		}
	}
	// Lose game, reset for next game
	if (guessesLeft == 0) {
		document.getElementById("hiddenword").innerHTML = secretWord.sourceWord;

		resetting = true;
		setTimeout(function(){
			resetGame();
			resetting = false;
		}, 3000);
	}
};