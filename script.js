const buttons = document.querySelectorAll(".btn");
const scoreField = document.querySelector(".score");
const finalScore = document.querySelector(".endgame-score");
const modalOverlay = document.querySelector(".modal-overlay");
const endGameModal = document.querySelector(".endgame-modal");
const inputField = document.querySelector("input");
const highScoresModal = document.querySelector(".highscores-modal");
const topNames = document.querySelectorAll(".name");
const topScores = document.querySelectorAll(".top-score");
const message = document.querySelector(".endgame-modal-area p");
const madeTop = document.querySelector(".endgame-modal-area h2");
const startEndBtn = document.querySelector(".startEndBtn");

let score = 0;
let delay = 1000;
let intervalId;

const buttonOrderArray = [];
// const scoresArray = [];

const handleStartButton = () => {
  startEndBtn.textContent === "start" ? startGame() : endGame();
};

const startGame = () => {
  startEndBtn.textContent = "end";
  buttons.forEach((button) => {
    button.addEventListener("click", handleClick);
  });
  activateButton();
};

const endGame = () => {
  const endSound = new Audio(
    "assets/mixkit-slot-machine-win-alarm-1995.wav"
  );
  endSound.play();
  message.textContent = getJudgement();
  madeTop.textContent = checkIfTopFive();
  finalScore.textContent = score;
  buttons.forEach((button) => {
    button.classList.add("active");
    button.removeEventListener("click", handleClick);
  });
  startEndBtn.removeEventListener("click", handleStartButton);
  startEndBtn.textContent = "start";
  clearTimeout(intervalId);
  setTimeout(() => {
    modalOverlay.classList.add("active");
    endGameModal.classList.add("active");
    startEndBtn.addEventListener("click", handleStartButton);
  }, 2500);
};

const activateButton = () => {
  if (startEndBtn.textContent === "end") {
    const buttonIdx = Math.floor(Math.random() * 4);
    if (buttonOrderArray[buttonOrderArray.length - 1] !== buttonIdx) {
      buttonOrderArray.push(buttonIdx);
      buttons[buttonIdx].classList.add("active");
      intervalId = setTimeout(() => {
        buttons[buttonIdx].classList.remove("active");
        activateButton();
      }, delay);
      delay > 400 && (delay -= 10);
    } else {
      activateButton();
    }
  }
};

const handleClick = (e) => {
  if (buttonOrderArray[score] === +e.target.id) {
    const popSound = new Audio("assets/mixkit-long-pop-2358.wav");
    popSound.play();
    buttons[+e.target.id].classList.remove("active");
    score++;
    scoreField.textContent = score;
  } else {
    endGame();
  }
};

const getJudgement = () => {
  if (score < 6)
    return "That was not so good! tbh that was HORRIBLE!";
  else if (score < 10) return "Can you get 10? Can you?";
  else if (score === 10) return "That s a 10!";
  else if (score < 16)
    return "Well atleast you got over 10.. Great! Could you get 20+ too? Like my cat did?";
  else if (score < 21)
    return "Nice! U almost beat my cat in this game!";
  else if (score < 31) return "Good job! U beat my cat in this game.";
  else if (score < 51)
    return "Very good job! Your prize is free lunch at the Business College restaurant";
  else if (score < 61) return "Nice!";
  else return "Awesome!!";
};

const checkIfTopFive = () => {
  const data = JSON.parse(localStorage.getItem("scores"));

  if (score > data[0]?.score || !data.length) return "Rank 1 score!!";
  else if (data.length < 5 || score > data[4].score)
    return "You made TOP 5! :)";
  else return "Not a top 5 score :(";
};

const submitScore = () => {
  if (!inputField.value) return;
  const data = JSON.parse(localStorage.getItem("scores"));

  data.push({ name: inputField.value, score });
  data.sort((a, b) => b.score - a.score);

  localStorage.setItem("scores", JSON.stringify(data));

  for (let i = 0; i < 5 && i < data.length; i++) {
    topNames[i].textContent = data[i].name;
    topScores[i].textContent = data[i].score;
  }
  endGameModal.classList.remove("active");
  highScoresModal.classList.add("active");
  resetValues();
};

const resetValues = () => {
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  delay = 1000;
  score = 0;
  scoreField.textContent = score;
  inputField.value = "";
  buttonOrderArray.length = 0;
};

const closeModal = () => {
  modalOverlay.classList.remove("active");
  highScoresModal.classList.remove("active");
};

startEndBtn.addEventListener("click", handleStartButton);

document
  .querySelector(".submit-btn")
  .addEventListener("click", submitScore);

document
  .querySelector(".close-btn")
  .addEventListener("click", closeModal);
