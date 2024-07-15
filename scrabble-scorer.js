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


let newPointStructure;

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
  let vowels = ["a", "e", "i", "o", "u"];
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

let scrabbleScorer;

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
   if(selectedAlgorithm === 0){
    console.log(`Score for '${word}': ${scoringAlgorithms[0].scoreFunction(word)}`);
   }
   return selectedAlgorithm;
 }

function transform(object) {
  newPointStructure = { };
  for (key in object) {
    keyArray = object[key];
    for(i = 0; i < keyArray.length; i++) {
      newPointStructure[keyArray[i].toLowerCase()] = Number(key);
      }
  }        
  return newPointStructure
};
//console.log(transform(oldPointStructure))

function runProgram() {
   initialPrompt();
   scorerPrompt(scoringAlgorithms);
   
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
