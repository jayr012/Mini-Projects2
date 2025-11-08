/* NAVIGATION CONTROL */
function showHome() {
  document.getElementById("home").style.display = "block";
  document.getElementById("projectCards").style.display = "none";
  hideAllSections();
}
function showProjects() {
  document.getElementById("home").style.display = "none";
  document.getElementById("projectCards").style.display = "block";
}
function hideAllSections() {
  document.querySelectorAll(".section").forEach(s => s.style.display = "none");
}
function showSection(id) {
  hideAllSections();
  document.getElementById(id).style.display = "block";
  window.scrollTo({ top: 250, behavior: 'smooth' });
}

/* ROCK JS */
const userChoiceText = document.getElementById("userChoice");
const computerChoiceText = document.getElementById("computerChoice");
const message = document.getElementById("message");
const choices = ["rock", "paper", "scissors"];

function play(userChoice) {
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  
  // Display choices
  userChoiceText.textContent = "You chose: " + userChoice;
  computerChoiceText.textContent = "Computer chose: " + computerChoice;

  // Condition logic
  if (userChoice === computerChoice) {
    message.textContent = "🤝 It's a tie!";
  } 
  else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    message.textContent = "🎉 You win!";
  } 
  else {
    message.textContent = "💻 Computer wins!";
  }

  // LOOP EFFECT: auto-reset after 1 second
  setTimeout(() => {
    resetGame();
  }, 1000);
}

function resetGame() {
  userChoiceText.textContent = "";
  computerChoiceText.textContent = "";
  message.textContent = "";
}

/* GUESSING GAME JS */
let secretNumber, maxAttempts, attemptsLeft, maxRange;
let wins = 0, losses = 0;
let gameOver = false;

function setDifficulty() {
  const difficulty = document.getElementById("difficulty").value;
  if (difficulty === "easy") {
    maxRange = 10;
    maxAttempts = 5;
  } else if (difficulty === "medium") {
    maxRange = 50;
    maxAttempts = 7;
  } else {
    maxRange = 100;
    maxAttempts = 10;
  }
  startGame();
}

function startGame() {
  secretNumber = Math.floor(Math.random() * maxRange) + 1;
  attemptsLeft = maxAttempts;
  gameOver = false;
  document.getElementById("gameBox").className = "game-box";
  document.getElementById("message").textContent = "🎮 Game started! Make your guess.";
  document.getElementById("rangeText").textContent = `Guess the number between 1 and ${maxRange}`;
  document.getElementById("attemptsLeft").textContent = `Attempts left: ${attemptsLeft}`;
  document.getElementById("guessInput").value = "";
}

function checkGuess() {
  if (gameOver) return;

  const guess = parseInt(document.getElementById("guessInput").value);
  const box = document.getElementById("gameBox");

  if (isNaN(guess)) {
    document.getElementById("message").textContent = "⚠️ Please enter a valid number!";
    return;
  }

  attemptsLeft--;

  if (guess < secretNumber) {
    document.getElementById("message").textContent = "📉 Too low! Try again.";
  } else if (guess > secretNumber) {
    document.getElementById("message").textContent = "📈 Too high! Try again.";
  } else {
    document.getElementById("message").textContent = `🎉 Correct! You guessed it in ${maxAttempts - attemptsLeft} tries!`;
    document.getElementById("attemptsLeft").textContent = "";
    box.classList.add("win");
    wins++;
    updateScore();
    gameOver = true;
    return;
  }

  if (attemptsLeft <= 0) {
    document.getElementById("message").textContent = `💀 Game Over! The correct number was ${secretNumber}.`;
    document.getElementById("attemptsLeft").textContent = "";
    box.classList.add("lose");
    losses++;
    updateScore();
    gameOver = true;
  } else {
    document.getElementById("attemptsLeft").textContent = `Attempts left: ${attemptsLeft}`;
  }
}

function updateScore() {
  document.getElementById("wins").textContent = wins;
  document.getElementById("losses").textContent = losses;
}

function restartGame() {
  startGame();
}

setDifficulty();
