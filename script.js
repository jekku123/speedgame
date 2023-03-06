(() => {
  let buttons;
  let scoreField;
  let finalScore;
  let modalOverlay;
  let endGameModal;
  let inputField;
  let highScoresModal;
  let topNames;
  let topScores;
  let message;
  let madeTop;
  let startEndBtn;

  let score = 0;
  let delay = 1000;
  let intervalId;

  const buttonOrderArray = [];
  const scoresArray = [];

  const randomIdx = () => {
    return Math.floor(Math.random() * 4);
  };

  const startGame = () => {
    startEndBtn.textContent = "end";

    buttons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    activateButton();
  };

  const activateButton = () => {
    if (startEndBtn.textContent === "start") return;

    const buttonIdx = randomIdx();

    if (buttonOrderArray[buttonOrderArray.length - 1] !== buttonIdx) {
      buttons[buttonIdx].classList.add("active");

      buttonOrderArray.push(buttonIdx);

      intervalId = setTimeout(() => {
        buttons[buttonIdx].classList.remove("active");
        activateButton();
      }, delay);
      delay -= 10;
    } else {
      activateButton();
    }
  };

  const handleClick = (e) => {
    if (buttonOrderArray[score] !== +e.target.id) return endGame();

    const popSound = new Audio("mixkit-long-pop-2358.wav");
    popSound.play();

    buttons[+e.target.id].classList.remove("active");

    score++;
    scoreField.textContent = score;
  };

  // sets the judgement message
  const getJudgement = () => {
    if (score < 6) return "That was not so good! tbh that was HORRIBLE!";
    else if (score < 10) return "Can you get 10? Can you?";
    else if (score === 10) return "That's a 10!";
    else if (score < 16)
      return "Well atleast you got over 10.. Great! Could you get 20+ too? Like my cat did?";
    else if (score < 21) return "Nice! U almost beat my cat in this game!";
    else if (score < 31) return "Good job! U beat my cat in this game.";
    else if (score < 51)
      return "Very good job! Your prize is free lunch at the Business College restaurant";
    else if (score < 61) return "Nice!";
    else return "Awesome!!";
  };

  // checks if the score is top5 score and prints a message telling that was it or was it not
  const checkIfTopFive = () => {
    if (score > scoresArray[0]?.score || !scoresArray.length) return "Rank 1 score!!";
    else if (scoresArray.length < 5 || score > scoresArray[4].score) return "You made TOP 5! :)";
    else return "Not a top 5 score :(";
  };

  // reset stuff etc listeners, checks if score is top 5 and gets the judgements for the score
  // and opens the modal
  const endGame = () => {
    const endSound = new Audio("mixkit-slot-machine-win-alarm-1995.wav");
    endSound.play();

    madeTop.textContent = checkIfTopFive();
    message.textContent = getJudgement();
    finalScore.textContent = score;
    startEndBtn.textContent = "start";

    startEndBtn.removeEventListener("click", handleStartButton);

    buttons.forEach((button) => {
      button.classList.add("active");
      button.removeEventListener("click", handleClick);
    });

    clearTimeout(intervalId);

    setTimeout(() => {
      modalOverlay.classList.add("active");
      endGameModal.classList.add("active");
      startEndBtn.addEventListener("click", handleStartButton);
    }, 2500);
  };

  // pushses the score to an array of objs with {name, score} then sorts the array by scores and loops the values into hs board
  const submitScore = () => {
    if (!inputField.value) return;

    scoresArray.push({ name: inputField.value, score });
    scoresArray.sort((a, b) => b.score - a.score);

    for (let i = 0; i < 5 && i < scoresArray.length; i++) {
      topNames[i].textContent = scoresArray[i].name;
      topScores[i].textContent = scoresArray[i].score;
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

  const handleStartButton = () => {
    startEndBtn.textContent === "start" ? startGame() : endGame();
  };

  const closeModal = () => {
    modalOverlay.classList.remove("active");
    highScoresModal.classList.remove("active");
  };

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    buttons = document.querySelectorAll(".btn");
    scoreField = document.querySelector(".score");
    finalScore = document.querySelector(".endgame-score");
    modalOverlay = document.querySelector(".modal-overlay");
    endGameModal = document.querySelector(".endgame-modal");
    inputField = document.querySelector("input");
    highScoresModal = document.querySelector(".highscores-modal");
    topNames = document.querySelectorAll(".name");
    topScores = document.querySelectorAll(".top-score");
    message = document.querySelector(".endgame-modal-area p");
    madeTop = document.querySelector(".endgame-modal-area h2");

    document.querySelector(".startEndBtn").addEventListener("click", handleStartButton);
    document.querySelector(".submit-btn").addEventListener("click", submitScore);
    document.querySelector(".close-btn").addEventListener("click", closeModal);
  }
})();
