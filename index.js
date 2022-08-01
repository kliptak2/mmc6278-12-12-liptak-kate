const words = [
  "bananas",
  // "grapes",
  // "carousel",
  // "milkshake",
  // "javascript",
  // "limousine",
  // "chocolate",
  // "programming",
  // "meatloaf",
  // "ukulele",
  // "mango",
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
          this.replaceUnderscoreAtIndex(i, letter);
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
    let incorrectLettersEl = document.getElementById("incorrect-letters");
    incorrectLettersEl.innerHTML = this.incorrectLetters;
    let wordToGuessEl = document.getElementById("word-to-guess");
    wordToGuessEl.innerHTML = this.displayWord;
  }

  // implement the isGameOver function:
  isGameOver() {}

  // implement the getWinOrLoss function:
  getWinOrLoss() {}
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
