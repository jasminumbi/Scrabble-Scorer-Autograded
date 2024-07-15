// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	} 
	return letterPoints;
 }


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some Scrabble!")
   word = input.question("Enter a word to score:");
};


let newPointStructure = transform(oldPointStructure);

let simpleScorer = function(word) {
  word = word.toUpperCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++){
  letterPoints += 1;
  }
  return letterPoints;
};

let vowelBonusScorer = function(word) {
  word = word.toUpperCase();
  let vowels = ["A", "E", "I", "O", "U"];
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++){
    if (vowels.includes(word[i])){
      letterPoints += 3;
    } else{
      letterPoints += 1;
    }
  }
  return letterPoints;
}

let scrabbleScorer = function(word) {
  let letterPoints = 0;
  word = word.toUpperCase();
  for(let i = 0; i < word.length; i++){
    let letters = word[i];
    letterPoints += newPointStructure[letters];
  }
  return letterPoints;
};

const scoringAlgorithms = [
  {name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scoreFunction: simpleScorer
  },
  {name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scoreFunction: vowelBonusScorer
  },
  {name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scoreFunction: scrabbleScorer
  }
];


 function scorerPrompt() {
  let selectedAlgorithm = input.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2:"
   );
   return selectedAlgorithm;
 }

function transform(object) {
  let newPointStructure = {};
  for (let key in object) {
    keyArray = object[key];
    for(i = 0; i < keyArray.length; i++) {
      newPointStructure[keyArray[i].toUpperCase()] = Number(key);
      }
  }        
  return newPointStructure
};
//console.log(transform(oldPointStructure))

function runProgram() {
   initialPrompt();
   let pickedNumber = scorerPrompt(scoringAlgorithms);
   let score = scoringAlgorithms[pickedNumber].scoreFunction(word);
   console.log(`Score for '${word}': ${score}`);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
