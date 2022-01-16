const startBtn = document.getElementById("start");
const questionDiv = document.getElementById("question");
const timerElement = document.getElementById("timer");
const answersDiv = document.getElementById("answers");
const highScoreDiv = document.getElementById("high-scores");
const userInitialsDiv = document.getElementById("user-initials");
const questions = [
  {
    title: "What foundational coding type produces the result true or false?",
    answers: ["String", "Number", "Boolean"],
    correct: "Boolean",
  },
  {
    title: "What data type will always be contained within quotation marks?",
    answers: ["Number", "String", "Boolean"],
    correct: "String",
  },
  {
    title: "What is an element in javascript with no definition?",
    answers: ["variable", "Boolean", "Baked beans"],
    correct: "variable",
  },
  {
    title: "What is created with an expression that starts with the keyword function?",
    answers: ["poopoo", "console log", "function", "element"],
    correct: "function",
  },
  {
    title: "Inside which HTML element do we put the JS?",
    answers: ["<javascript>", "<link>", "<script>"],
    correct: "<script>",
  },
];
let qIndex = 0;
let timerCount = 30;
isWin = false;
// Functions
function startGame() {
  answersDiv.textContent = "";
  
  questionDiv.innerHTML = questions[qIndex].title;
  
  questions[qIndex].answers.forEach((answer) => {
    const answerBtn = document.createElement("button");
    answerBtn.textContent = answer;
    answerBtn.setAttribute("value", answer);
    answerBtn.onclick = answerClick;
    answersDiv.appendChild(answerBtn);
  });
}
// Answer click function
function answerClick() {
  // When someone clicks the button, we want the computer to know what button you pushed. Determine the answer the user chose.
  let clickedAnswer = this.value;
  // Verify if the answer is correct.
  if (clickedAnswer === questions[qIndex].correct) {
    // Move to next question or end the game.
    qIndex++;
    if (questions.length > qIndex) {
      startGame();
    } else {
      endGame();
    }
  } else {
      alert("wrong answer - 5 points try again");
      timerCount = timerCount - 5;
  }
}
function endGame() {
  isWin = true;
  recordHighScore();
}
function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        alert("Refresh page to try again");
      }
    }
    // Tests if time has run out
    if (timerCount < 0) {
      // Clears interval
      clearInterval(timer);
      //loseGame();
      alert("YOU LOST! Refresh page to try again.");
    }
  }, 1000);
}
function recordHighScore() {
  highScore = timerCount;
  const initials = prompt("enter initials");
  let userScore = {
    score: highScore,
    initials: initials,
  };
  window.localStorage.setItem("userScore", JSON.stringify(userScore));
  displayHighScore();
}
function displayHighScore() {
  const highScore = JSON.parse(window.localStorage.getItem("userScore"));
  highScoreDiv.innerHTML = `${highScore.initials}: ${highScore.score}`;
};

startBtn.addEventListener("click",() => {
  startGame();
  startTimer();
});
