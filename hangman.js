const readlineSync = require('readline-sync');

// this array holds all the possible words that can be the answer
// feel free to change the words here to words you find interesting! :)

let words = [
	'hover',
	'better',
	'batter',
	'butter',
	'orange',
];

let answer; 
let nWrong; 
let pastGuesses = [];
let pastGames = [];
let pastGameStats = [{'wins': 0, 'losses': 0, 'wrong': 0}];
let cont = true;
let rightGuess = 0;
/*
PART 1

Write the pseudocode that represents your game logic here.

When player guesses letter correct, input letter in displayed word above hangman. 
If letter guess is incorrect, input letter into nWrong + past guesses display.
When player has guess all correct letters, end game and state "You've Won". 
When nWrong is >= 6, end the game and state "You've Lost"

*/

function startGame() {
	setUpGame();
	while (!checkGameOver()) {
		printGameState();
		const guess = readlineSync.question("please enter a guess: ");
		console.log('guess is', guess);
		/*
			PART 2

			Write the logic that will check whether or not the guess the user entered
			was valid here.
		*/
		
		
		

	// for (var i = 0; i < answer.length; i++){}
		
	
		if (guess.length != 1 || !isNaN(guess) || guess == null){
			console.log('Please enter a valid character')	
		}


		else if (pastGuesses.includes(guess)){
			console.log('You have guessed that already')
		}


		else if (!answer.includes(guess)){
			nWrong = nWrong + 1
			console.log('Incorrect!')
			pastGuesses.push(guess);
			pastGameStats[0].wrong ++
		}
	
	
		else {	
			for (let i = 0; i < answer.length; i++){
				if (guess === answer[i]){
					rightGuess += 1
					console.log('Correct!')
					pastGuesses.push(guess);
				}
			}
		}
		
		console.log('Wrong Guesses ' + nWrong +'/6')
		console.log('Right ' + rightGuess)
		
	}
	printGameState();

	/*
		PART 3	

		Log whether or not the game was won or lost here!
	*/

	
}


function checkGameOver(){
	// WRITE CODE FOR PART 3 BELOW
	if (nWrong>=6){
		console.log('Game over man, Game over')
		pastGameStats[0].losses ++
		var state = new Hang('loss');
	return true;
	}
	else if (rightGuess === answer.length){
		console.log('You\'ve Won!')
		pastGameStats[0].wins ++
		var state = new Hang('win');
	return true;
	
	}
}

function printGameState(){
	//Add a console.log here to print the previous guesses.
	console.log(pastGuesses)
	console.log('\n');
	let str = "";
	
	// for each letter in the target word
	for(let i = 0; i < answer.length; i++){
		let found = false;
		// loop through the pastGuesses
		for(let j = 0; j < pastGuesses.length; j++){
			// and check each element of past guesses to see if it matches the
			if(answer[i] === pastGuesses[j]){
				found = true;
			}
		}
		if(found){
			str += answer[i];
			str += "\t";
		}
		else{
			str += "_\t";
		}
	}
	console.log(str);
		
	console.log('\n');
	printHangMan(nWrong);	
	console.log('\n\n');
}

/* 
 =========================================================================================
 	Below are functions that may help with your logic, but do not need any modification
 =========================================================================================
*/
function Hang(state){
	this.state = state;
	pastGames.push(state)

}


function getRandomWord(){
	const index = Math.floor(Math.random()*words.length);
	return words[index];
}

function printHangMan(nWrong){
	//Don't worry about the syntax you see here.  The ? operator is a succinct way to write an
	//if statement that has two results. Think of it as:
	// statement_that_is_true_or_false ? happens_if_true : (OR) happens_if_false 
	const headSpot = (nWrong > 0) ? "O" : " ";
	const bodySpot = (nWrong > 1) ? "|" : " ";
	const leftArm = (nWrong > 2) ? "/": " ";
	const rightArm = (nWrong > 3) ? "\\" : " ";
	const leftLeg = (nWrong > 4) ? "/" : " ";
	const rightLeg = (nWrong > 5) ? "\\" : " ";
	
	let str = "";
	console.log(" ___ ");
	console.log(" |  | ");
	console.log(" |  " +  headSpot + " ");
	console.log(" | " + leftArm + bodySpot + rightArm);
	console.log(" | " + leftLeg + " " + rightLeg);
	return;
}

function setUpGame(){
	// choose a new word
	answer = getRandomWord().split('');
	// reset the total of wrong guesses
	nWrong = 0;
	// empty our array of previously guessed letters
	pastGuesses = []; 

	rightGuess = 0;

	console.log(pastGames)
	console.log(pastGameStats[0])
}

startGame()

while(cont){
	let answer = readlineSync.question('Would you like to play again? y/n')
	if(answer.toLowerCase() === 'y'){
		startGame();
	}
	else if(answer.toLowerCase() === 'n'){
		cont = false;
		console.log('Good game!')
	}
	else {
		console.log('Please enter either y (yes) or n (no).' + '')
	}
}