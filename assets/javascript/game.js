document.onkeyup= function(event) {hangman.keyPress(event)};

var hangman = {
    gameState: 0,
    words: ["witch", "ghost", "hobgoblin", "skeleton", "costume", "mummy", "scream", "spooky", "werewolf", "vampire", "fright", "wraith", "monster", "pumpkin", "treat", "wizard", "spiderweb", "fairy", "pirate", "ninja", "frightful"],
    word: "",
    guesses: [],
    words_played: [],
    guesses_left: 10,
    wins: 0,
    losses: 0,
    alphabet: "abcdefghijklmnopqrstuvwxyz",
    happyHalloween: new Audio("assets/sounds/happy-halloween.wav"),
    startItem: document.getElementById("start"),
    winScreen: document.getElementById("winScreen"),
    playAgain: document.getElementById("playAgain"),t
    wordItem: document.getElementById("theWord"),
    guessTracker: document.getElementById("guessedLetters"),
    guessTitle: document.getElementById("guessTitle"),
    winTracker: document.getElementById("win"),
    lossTracker: document.getElementById("lose"),
    guessesRemaining: document.getElementById("guessesRemaining"),
    guessLeft: document.getElementById("guessLeft"),
    hangmanPic: document.getElementById("hangPic"),

    makeWord: function() {
      if (this.words_played.length == this.words.length) {
        this.words_played = [this.word];f
      }
      if (this.gameState == 0) {
        var choice = Math.floor(Math.random() * this.words.length);
        this.word = this.words[choice];
      }
      else {
        while (this.words_played.indexOf(this.word) >= 0){
          choice = Math.floor(Math.random() * this.words.length);
          this.word = this.words[choice];
        }
      }
      this.words_played.push(this.word);
      this.updateWord();
    },
    updateWord: function() {
      output = "";
      for (var i in this.word) {
        if (this.guesses.indexOf(this.word[i]) >= 0) {
            output += this.word[i];
          } 
          else {
            output += "_";
          }
        }  
      this.wordItem.textContent = output; 
    },
    Guess: function(key) {
      this.guesses.push(key);
      var output = "";
      this.guesses.sort();
      for (var i in this.guesses) {
        output += this.guesses[i];
      }
      this.guessTracker.textContent = output;
      this.guessCheck(key)
      this.updateWord();
    },
    guessCheck: function(x){
      if (this.word.indexOf(x) < 0) {
        this.guesses_left -= 1;
        this.guessLeft.textContent = this.guesses_left;
        this.hangmanPic.src="assets/images/" + this.guesses_left + ".png";
      }
    },
    winCheck: function() {
      if (this.wordItem.textContent.indexOf("_") < 0) {
        this.winScreen.textContent = "You Win!";
        this.winScreen.style.visibility = "visible";
        this.happyHalloween.play();
        this.gameState = 2;
        this.wins += 1;
        this.winTracker.textContent = this.wins;
      }
      else if (this.guesses_left <= 0) {
        this.winScreen.textContent = "You Lose!";
        this.winScreen.style.visibility = "visible";
        this.gameState = 2;
        this.losses += 1;
        this.lossTracker.textContent = this.losses;
        this.wordItem.textContent = this.word;
      }
      this.playAgain.style.visibility = "visible";
    },
    resetAll: function() {
      this.gameState = 1;
      this.guesses_left = 10;
      this.guesses = [];
      this.makeWord();
      this.guessLeft.textContent = this.guesses_left;
      this.hangmanPic.src="assets/images/" + this.guesses_left + ".png";
      this.guessTracker.textContent = "";
      this.winScreen.style.visibility = "hidden";
      this.playAgain.style.visibility = "hidden";
    },
    startGame: function(){
      this.startItem.style.display  = "none";
      this.wordItem.style.display = "block";
      this.guessTracker.style.display = "block";
      this.guessTitle.style.display = "block";
      this.winScreen.style.display = "block";
      this.winScreen.style.visibility = "hidden";
      this.playAgain.style.display = "block";
      this.playAgain.style.visibility = "hidden";
      this.makeWord();
      this.gameState = 1;
    },
    keyPress: function(event) {
      var key = event.key;
      if (this.gameState === 0) {
        this.startGame();
      }
      else if (this.gameState === 1 && this.alphabet.indexOf(key)>=0) {
        if (this.guesses.indexOf(key) < 0) {
          this.Guess(key);          
          this.winCheck();
        }
      }
      else if(this.gameState === 2) {   
        this.resetAll();
      } 
    }
} 



