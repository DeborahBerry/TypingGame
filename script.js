const wordToType = document.querySelector(".word-to-type");
const typedWord = document.querySelector(".typed-word");
const scoreEl = document.querySelector(".score");
const timeEl = document.querySelector(".time");
const gameOverContainer = document.querySelector(".game-over-container");
const levelEl = document.querySelector("#level");


let words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

let generatedWord;
let score = 0;
let time = 10;
let level = localStorage.getItem("currentLevel") !== null? localStorage.getItem("currentLevel") : "easy";


levelEl.value = localStorage.getItem("currentLevel") !== null? localStorage.getItem("currentLevel") : "easy";


typedWord.focus();
 
let timeInterval = setInterval(updateTime, 1000);

function updateTime() {
  time--;
  timeEl.textContent = "Time Left:" + time + "s";
  
  if(time <= 0){
    clearInterval(timeInterval);
    gameOverContainer.innerHTML = `
    
    <p> Your Score Is: ${score} </p>
    <button onclick="window.location.reload()">Play Again </button>
    `;
    gameOverContainer.style.display = "flex";

    window.addEventListener("keypress", function (e){
      if(e.key === "Enter"){
        this.location.reload();
      }
    });
  }
}

function randomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function updateDom() {
  generatedWord = randomWord();
  wordToType.textContent = generatedWord;
}

updateDom();

function updateScore() {
  score++;
  scoreEl.textContent = `Score: ${score}`;
}

typedWord.addEventListener("input", function (e) {
  let userText = e.target.value;

  if (userText === generatedWord) {
    updateDom();

    updateScore();

    e.target.value = "";

    if (level === "easy"){
      time += 5;
    }

    if (level === "medium"){
      time += 3;
    }

    if (level === "hard"){
      time += 2;
    }
  }
});

levelEl.addEventListener("change", function(e) {
  let selectedLevel = e.target.value;
  localStorage.setItem("currentLevel", selectedLevel);
});

const levelContainer = document.querySelector(".level-container");

document.querySelector(".level-toggle-btn").addEventListener("click", function(){
  levelContainer.classList.toggle("hide");
});

