const words = [
  "bananas",
  "grapes",
  "carousel",
  "milkshake",
  "javascript",
  "limousine",
  "chocolate",
  "programming",
  "meatloaf",
  "ukulele",
  "mango",
];

let wins = 0;
let losses = 0;
let currentWord;

class Word {
  constructor(word) {
    this.word = word;
    this.displayWord = word.replaceAll(/[\w]/g, "_");
    this.remainingGuesses = 10;
    this.incorrectLetters = [];
    this.correctLetters = [];
  }

  // implement the guessLetter function:
  guessLetter(letter) {
    if (this.word.includes(letter)) {
      this.correctLetters.push(letter);
      let wordToGuessIndivLettersArr = this.word.split("");
      for (var i = 0; i < wordToGuessIndivLettersArr.length; i++) {
        if (wordToGuessIndivLettersArr[i] == letter) {
          //alert(letter)
          this.replaceUnderscoreAtIndex(i, letter); // replaceUnderscoreAtIndex is a helper function, see below
        }
      }
    }
    if (!this.word.includes(letter)) {
      this.incorrectLetters.push(letter);
      this.remainingGuesses--;
    }
    // Should add correct letter to correctLetters property, not incorrectLetters property
    // Should update displayWord with correctly guessed letters
    // Should add incorrect letter to incorrectLetters property, not correctLetters property
    // Should decrement remainingGuesses when incorrectly guessing a letter
  }

  // helper function
  replaceUnderscoreAtIndex(index, letter) {
    let replaceUnderscores = this.displayWord;
    if (index < this.displayWord.length) {
      replaceUnderscores =
        this.displayWord.substring(0, index) +
        letter +
        this.displayWord.substring(index + 1);
    }
    this.displayWord = replaceUnderscores;
    return;
  }

  // implement the updateScreen function:
  updateScreen() {
    let wordToGuessEl = document.getElementById("word-to-guess");
    wordToGuessEl.innerHTML = this.displayWord;
    let remainingGuessesEl = document.getElementById("remaining-guesses");
    remainingGuessesEl.innerHTML = this.remainingGuesses;
    let incorrectLettersEl = document.getElementById("incorrect-letters");
    incorrectLettersEl.innerHTML = this.incorrectLetters;
    // Should update #word-to-guess with displayWord
    // Should update #remaining-guesses with remainingGuesses
    // Should update #incorrect-letters with incorrectLetters
  }

  // implement the isGameOver function:
  isGameOver() {
    if (this.displayWord !== this.word && this.remainingGuesses > 0) {
      return false;
    }
    return true;
    // Should return false if displayWord !== word and remainingGuesses > 0
    // Should return true if displayWord === word and remainingGuesses > 0
    // Should return true if displayWord !== word and remainingGuesses <= 0
    // Should return true if displayWord === word and remainingGuesses <= 0
  }

  // implement the getWinOrLoss function:
  getWinOrLoss() {
    if (this.displayWord === this.word && this.remainingGuesses > 0) {
      return "win";
    }
    if (!currentWord.isGameOver() && this.remainingGuesses > 0) {
      return null;
    }
    return "loss";
    // Should return null if game is not over
    // Should return "win" if displayWord === word and remainingGuesses > 0
    // Should return "loss" if remainingGuesses <= 0 and displayWord !== word
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  currentWord = new Word(randomWord);
  currentWord.updateScreen();
}

document.onkeyup = function (e) {
  const pressedKey = e.key.toLowerCase();
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return;

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey);
  // allow word obj to update screen
  currentWord.updateScreen();

  // check if game is over
  const gameOver = currentWord.isGameOver();

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById("previous-word");
    const winDisplay = document.getElementById("wins");
    const lossDisplay = document.getElementById("losses");
    previousWord.textContent = currentWord.word;
    const result = currentWord.getWinOrLoss();
    if (result === "win") {
      wins++;
      winDisplay.textContent = wins;
    } else if (result === "loss") {
      losses++;
      lossDisplay.textContent = losses;
    }
    newGame();
  }
};

newGame();
