/////////////////////////////
//         VARIABLES       //
////////////////////////////

let platforms = [];
let newPlatform;

let goodThings = [];
let badThings = [];
let specialThings = ["Front-end", "Back-end", "Developer", "Analista"];

let playerInfo = ["1", "Cristine", "1"];

let finalInfo = [
  "Grau superior DAW",
  "Aprèn a dissenyar i programar eines web que permetin oferir una òptima presència d’empreses i altres organitzacions a internet. La utilitat, l’accessibilitat i la usabilitat d’aquestes aplicacions han de proporcionar la millor experiència als usuaris.",
  "Sortides professionals:",
  "Front-end developer : Dissenyar interfícies d’usuari, Generar contingut multimèdia, Programar la interacció amb l’usuari",
  "Back-end developer : Crear base de dades, Programar les funcionalitats de la capa de negoci, Programar APIs / web services",
  "Analista : Investigar i detectar necessitats, Dissenyar bases de dades, Dissenyar interfícies de les aplicacions, Crear diagrames UML"
];

let scoreFinal = 0;

let minute = 2;
let seconds = 0;
let time;

/////////////////////////////
//          DOODLER         //
////////////////////////////

//doodler creation with it's style
function createDoodler() {
  GRID.appendChild(DOODLER);
  DOODLER.classList.add("doodler");
  //so that doodler won't go anywhere
  doodlerLeftSpace = platforms[0].left;
  DOODLER.style.left = doodlerLeftSpace + "px";
  DOODLER.style.bottom = doodlerBottomSpace + "px";
  DOODLER.src = "images/doodler.png";
}

/////////////////////////////
//        PLATFORM         //
////////////////////////////

//this is the platforms with it's style
class Platform {
  constructor(newPlatformBottom) {
    this.bottom = newPlatformBottom;
    this.left = Math.random() * (GRIDWIDTH - platformWidth);
    this.visual = document.createElement("div");

    const visual = this.visual;
    visual.classList.add("platform");
    visual.style.left = this.left + "px";
    visual.style.bottom = this.bottom + "px";
    GRID.appendChild(visual);
  }
}

// this will create all the platforms
function createPlatfoms() {
  for (let i = 0; i < platformCount; i++) {
    let platformGap = GRIDHEIGHT / platformCount;
    let newPlatformBottom = 100 + i * platformGap;
    let newPlatform = new Platform(newPlatformBottom);
    platforms.push(newPlatform); //pushing newly created platform into this array
  }
}

/////////////////////////////
//          THINGS         //
////////////////////////////

//random
function createThing(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//goodThing style
class Thing {
  constructor(thingPos, num) {
    this.bottom = thingPos.bottom + 15;
    this.left = thingPos.left + 15; //grid width - platform width
    this.visual = document.createElement("div");

    let visual = this.visual;
    switch (num) {
      case 1:
        visual.classList.add("goodThing");
        visual.id = "goodThing";
        let numpos = createThing(0, specialThings.length - 1);
        visual.style.color = "white";
        visual.style.fontSize = "20px";
        visual.innerHTML = specialThings[numpos];
        break;
      case 2:
        visual.classList.add("badThing");
        visual.style.color = "pink";
        visual.style.fontSize = "25px";
        visual.innerHTML = "-2";
        break;
      default:
        break;
    }

    visual.style.left = this.left + "px";
    visual.style.bottom = this.bottom + "px";
    visual.style.animation = "appear 0.4s";
    visual.style.margin = "0";

    GRID.appendChild(visual);
  }
}
//create new thing
function createNewThing(newPlatform, random) {
  switch (random) {
    case 1:
      let newGoodThing = new Thing(newPlatform, random);
      goodThings.push(newGoodThing);
      break;
    case 2:
      let newBadThing = new Thing(newPlatform, random);
      badThings.push(newBadThing);
      break;
    default:
      break;
  }
}
/////////////////////////////
//          SCORE          //
////////////////////////////

//score
function countScore(score) {
  document.getElementById("score").innerHTML = "PUNTS: " + score;
}

//final score
function displayFinalScreen() {
  debugger
  let contText = document.createElement("div");
  contText.style.margin = "0 1rem 0 1rem";
  contText.style.borderStyle = "dashed solid";
  if (score === 0) {
    minute = 0;
    seconds = 0;
    result = 0;
  } else {
    result = score + (120 - (minute * 60 + seconds));
  }
  scoreFinal = result;
  GRID.innerHTML = "game over <br>" + scoreFinal; //add ranking here
  GRID.style.color = "white";
  GRID.style.fontSize = "50px";

  for (let i = 0; i < finalInfo.length; i++) {
     let text = document.createElement("p");
     let element = finalInfo[i];
     text.style.color = "white";
     text.style.fontSize = "20px";
    text.innerHTML = element;
    text.style.textAlign = "start";
    text.style.margin = "10px";
        contText.appendChild(text);
  }
  GRID.appendChild(contText);
}

/////////////////////////////
//          TIME           //
////////////////////////////

function timedCount() {
  time = setTimeout(timedCount, 1000);
  if (seconds > 0) {
    seconds -= 1;
  } else if (seconds == 0 && minute > 0) {
    minute -= 1;
    seconds = 59;
  } else if (minute == 0 && seconds == 0) {
    gameOver();
  }

  let formattedMinute = ("0" + minute).slice(-2);
  let formattedSeconds = ("0" + seconds).slice(-2);
  document.getElementById("time").innerHTML =
    "TEMPS: " + formattedMinute + ":" + formattedSeconds;
}

/////////////////////////////
//        HOME PAGE        //
////////////////////////////

function homePage() {
  //stops doodler + platform

  isGameOver = false;

  while (GRID.firstChild) {
    GRID.removeChild(GRID.firstChild);
  }

  document.getElementById("time").innerHTML = " ";
  document.getElementById("score").innerHTML = " ";

  let box = document.createElement("div");
  let play = document.createElement("button");
  let instruction = document.createElement("button");
  let scoreBoard = document.createElement("button");
  let text = document.createElement("p");

  text.className = "anim-typewriter";
  text.style.fontSize = "100px";
  text.style.color = "white";
  text.textContent = "DOODLE JUMP";

  box.className = "boxBtn";

  play.className = "buttons";
  play.id = "play";
  play.innerHTML = "Jugar!";
  play.style.margin = "0";
  play.addEventListener("click", start);

  instruction.className = "buttons";
  instruction.id = "instruction";
  instruction.innerHTML = "Instrucció";
  instruction.addEventListener("click", displayInstruccions);

  scoreBoard.className = "buttons";
  scoreBoard.id = "scoreBoard";
  scoreBoard.innerHTML = "Ranking";
  scoreBoard.addEventListener("click", displayRank);

  GRID.appendChild(text);
  GRID.appendChild(box);
  box.appendChild(play);
  box.appendChild(instruction);
  box.appendChild(scoreBoard);
}


/////////////////////////////
//          Modal          //
////////////////////////////

function displayInstruccions() {
     Swal.fire({
       title: "Instrucció",
       html:
         "<div class= 'left'> <img src='images/left.png' alt='left arrow' height='42' width='42'> <span style='padding-top: 10px'> per moure a l'esquerra </span> </div> " +
         "<div class= 'left'> <img src='images/right.png' alt='left arrow' height='42' width='42'> <span style='padding-top: 10px'> per moure a la dreta </span> </div> " +
         "<div class= 'left'> <span style='padding-top: 10px'> * text: +2pts </span> </div> " +
         "<div class= 'left'> <span style='padding-top: 10px'> * -2: -2pts </span> </div> ",
       icon: "question",
       showCancelButton: true,

       confirmButtonColor: "#f6e7d1",
       cancelButtonColor: "#d308087d",

       confirmButtonText: "Començar a jugar!",
       cancelButtonText: "Tornar",
     }).then((result) => {
       if (result.isConfirmed) {
         start();
       } else {
         homePage();
       }
     });
}

function displayRank() {
  while (GRID.firstChild) {
    GRID.removeChild(GRID.firstChild);
  }

  let table = document.createElement("table");
  let home = document.createElement("button");

  home.innerHTML = "tornar";
  home.className = "home";
  home.style.animation = "appear 0.4s";
  home.addEventListener("click", homePage);
  GRID.innerHTML = "Ranking";
  GRID.style.color = "white";
  table.style.margin = "auto";

  let rowTable = table.insertRow(0);
  for (let y = 0; y < 3; y++) {
    let column = rowTable.insertCell(y);
    column.innerHTML = playerInfo[y];
    column.style.color = "white";
    column.style.fontSize = "70px";
  }
  GRID.appendChild(home);
  GRID.appendChild(table);
}
