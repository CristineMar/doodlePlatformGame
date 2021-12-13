/////////////////////////////
//         VARIABLES       //
////////////////////////////

let upTimerId;
let downTimerId;

let timer_is_on = 0;

/////////////////////////////
//      MOVE PLATFORM      //
////////////////////////////
//so that platform will keeps falling down
function movePlatforms() {

        if (doodlerBottomSpace > 50) {
          platforms.forEach((platform) => {
            moveGoodThing(platform);
            moveBadThing(platform);

            platform.bottom -= 4;
            visual = platform.visual;
            visual.style.bottom = platform.bottom + "px";

            //adding new platform and goodthing
            if (platform.bottom < 10) {
              //this will remove the first platform;
              let firstPlatform = platforms[0].visual;
              firstPlatform.classList.remove("platform");
              platforms.shift();
              //new platform will apear at the top
              newPlatform = new Platform(GRIDHEIGHT);
              platforms.push(newPlatform);
              let random = createThing(1, 2);
              //will create new goodthing or badthing
              if (goodThings.length < 2 && badThings.length < 2) {
                createNewThing(newPlatform, random);
              }
            }
          });
        }
}

/////////////////////////////
//       MOVE THINGS       //
////////////////////////////

//move goodThing with the platform
function moveGoodThing(platform) {
  if (doodlerBottomSpace > 50) {
    goodThings.forEach((goodThing) => {
      if (platform.bottom + 15 == goodThing.bottom) {
        goodThing.bottom -= 4;
        let visual = goodThing.visual;
        visual.style.bottom = goodThing.bottom + "px";
      }
      if (goodThing.bottom < 25) {
        deleteGoodThing(goodThing);
      }
    });
  }
}

//move goodThing with the platform
function moveBadThing(platform) {
  if (doodlerBottomSpace > 50) {
    badThings.forEach((badThing) => {
      if (platform.bottom + 15 == badThing.bottom) {
        badThing.bottom -= 4;
        let visual = badThing.visual;
        visual.style.bottom = badThing.bottom + "px";
      }
      if (badThing.bottom < 25) {
        deleteBadThing(badThing);
      }
    });
  }
}

/////////////////////////////
//       DELETE THING      //
////////////////////////////

//delete goodThing
function deleteGoodThing(goodThing) {
  let goodThingsContent = goodThings;
  let deleteElement = goodThing;
  let deleting = goodThingsContent.indexOf(deleteElement);
    if (deleting != -1) {
        let firstGoodThing = goodThings[deleting].visual;
        firstGoodThing.classList.remove("goodThing");
        firstGoodThing.innerHTML = "";
        goodThings.splice(deleting, 1);
    }
}

//delete goodThing
function deleteBadThing(badThing) {
  let badThingsContent = badThings;
  let deleteElement = badThing;
  let deleting = badThingsContent.indexOf(deleteElement);
  if (deleting != -1) {
    let firstBadThing = badThings[deleting].visual;
    firstBadThing.classList.remove("badThing");
    firstBadThing.innerHTML = "";
    badThings.splice(deleting, 1);
  }
}

/////////////////////////////
//       DOODLER FALL      //
////////////////////////////

//doodler will fall
function fall() {
  clearInterval(upTimerId);
  //to stop doodler from jumping
  isJumping = false;
  //doodler fall
  downTimerId = setInterval(fallDoodler, velocityFall);
/*   downTimerId = setInterval(() => {
    doodlerBottomSpace -= 5;
    DOODLER.style.bottom = doodlerBottomSpace + "px";

    //game over
    if (doodlerBottomSpace <= 0) {
      gameOver();
    }
    collisionPlatform();
  }, velocityFall); */
}

function fallDoodler() {
  doodlerBottomSpace -= 5;
  DOODLER.style.bottom = doodlerBottomSpace + "px";

  //game over
  if (doodlerBottomSpace <= 0) {
    gameOver();
  }
  collisionPlatform();
}

/////////////////////////////
//       DOODLER JUMP      //
////////////////////////////

//doodler jumping
function jump() {
  //so that it won't fall
  clearInterval(downTimerId);
  isJumping = true;
  //to stop jump
  upTimerId = setInterval(() => {
    if (doodlerBottomSpace + 85 <= GRIDHEIGHT - 100) {
      doodlerBottomSpace += 20; //height jump
      DOODLER.style.bottom = doodlerBottomSpace + "px";
    } else if (doodlerBottomSpace + 85 >= GRIDHEIGHT - 100) {
      doodlerBottomSpace += 0; //height jump
      DOODLER.style.bottom = doodlerBottomSpace + "px";
      fall();
    }
    // the doodler will fall when it hits more than 350 px
    if (doodlerBottomSpace > startPoint + 200) {
      fall();
    }
  }, velocityJump);
}

/////////////////////////////
//         ADD SCORE       //
////////////////////////////

//so that when doodler jump on the same platform it won't add any points.
function addScore() {
  platformTouched = platformTouched.slice(-2);
  if (
    platformTouched.length > 0 &&
    platformTouched[platformTouched.length - 1] !==
      platformTouched[platformTouched.length - 2]
  ) {
    score++;
    countScore(score);
    changeVelocity(score);
  }
}

/////////////////////////////
//        START TIME       //
////////////////////////////

//Time
function startCount() {
  if (!timer_is_on) {
    timer_is_on = 1;
    timedCount();
  }
}

/////////////////////////////
//        STOP TIME        //
////////////////////////////

function stopCount() {
  clearTimeout(time);
  timer_is_on = 0;
}

function changeVelocity(velocityObject, velocity) {
  if (score % 10 === 0 && score > 0) {
    velocityObject -= velocity;
  }

  return velocityObject;
}

/////////////////////////////
//     CHANGE VELOCITY     //
////////////////////////////

function changeVelocity(score) {
  if (score % 10 === 0 && score != 0) {
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
    clearInterval(platformTimerId);
    velocityPlatform -= 5;
    platformTimerId = setInterval(movePlatforms, velocityPlatform); //every 1 sec
  }
}


