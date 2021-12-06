/////////////////////////////
//      WINDOW LOADED      //
////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  Swal.fire({
    title: "En que consisteix:",
    icon: "info",
    text: "En aquest joc aprendreu quins sortides professionals els quals podeu optar, per aixo haurieu de jugar i agafar-les",
    confirmButtonText: "Perfecte!",
  }).then((result) => {
    if (result.isConfirmed) {
      homePage();
    }
  });
});

/////////////////////////////
//         VARIABLES       //
////////////////////////////

const GRID = document.querySelector(".grid");
const DOODLER = document.createElement("img");
const GRIDWIDTH = GRID.clientWidth;
const GRIDHEIGHT = GRID.clientHeight;
let velocityPlatform = 25;
let velocityJump = 25;
let velocityFall = 13;
let velocityLeft = 30;
let velocityRight = 30;

let startPoint = 400;
let doodlerLeftSpace = 50;
let platformWidth = 85;
let doodlerBottomSpace;
let platformCount = 5;

let isGameOver = false;
let isJumping = true;
let platformTimerId;

let score;

/////////////////////////////
//        GAME OVER        //
////////////////////////////

//game over
function gameOver() {
  isGameOver = true;
  //stops game
  while (GRID.firstChild) {
    GRID.removeChild(GRID.firstChild);
  }
  //stops doodler + platform
  clearInterval(upTimerId);
  clearInterval(downTimerId);
  clearInterval(leftTimerId);
  clearInterval(rightTimerId);
  clearInterval(platformTimerId);

  platforms = [];
  goodThings = [];
  badThings = [];

  let home = document.createElement("button");

  home.innerHTML = "tornar";
  home.className = "home";
  home.style.animation = "appear 0.4s";
  home.addEventListener("click", homePage);

  displayFinalScreen(); //show final screen with info
  //stop timer
  stopCount();
  GRID.appendChild(home);
}

/////////////////////////////
//        START GAME       //
////////////////////////////

//start game
function start() {
  while (GRID.firstChild) {
    GRID.removeChild(GRID.firstChild);
  }
  if (!isGameOver) {
    minute = 2;
    seconds = 0;
    score = 0;
    doodlerBottomSpace = startPoint;
    createPlatfoms();
    createDoodler();

    platformTimerId = setInterval(movePlatforms, velocityPlatform); //every 1 sec
    jump();
    countScore(score);
    startCount();
    document.addEventListener("keydown", control);
    document.addEventListener("keyup", stopControl);
  }
}
