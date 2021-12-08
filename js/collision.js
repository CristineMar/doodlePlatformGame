/////////////////////////////
//         VARIABLE        //
////////////////////////////
let platformTouched = [];

/////////////////////////////
//        PLATFORM         //
////////////////////////////

//collision with doodler and platform
function collisionPlatform() {
  //collision doodler with the platforms
  //get platforms array if doodler bottom space is less or equal to platform bottom doodler stop falling
  //and check if doodler is between 15 px of the platform. 15 is height of platform
  //check if doodler left space + width of platform is less or equal than platform.left width
  //check that doodler is not jumping
  platforms.forEach((platform) => {
    if (
      doodlerBottomSpace >= platform.bottom &&
      doodlerBottomSpace <= platform.bottom + 15 &&
      doodlerLeftSpace + 30 >= platform.left &&
      doodlerLeftSpace <= platform.left + 85 &&
      !isJumping
    ) {
      collisionGoodThing(platform);
      collisionBadThing(platform);
      platformTouched.push(platform);
      addScore();
      //new start point for jumping
      startPoint = doodlerBottomSpace;
      isJumping = true;
      jump();
    }
  });
}

/////////////////////////////
//          THINGS         //
////////////////////////////
//collision with doodler and goodthing
function collisionGoodThing(platform) {
  goodThings.forEach((goodThing) => {
    if (
      goodThing.bottom == platform.bottom + 15 &&
      doodlerLeftSpace + 85 >= goodThing.left &&
      doodlerLeftSpace <= goodThing.left + 85
    ) {
      goodThing.visual.style.animation = "disappear 0.4s";
      setInterval(() => {
        deleteGoodThing(goodThing);
      }, 400);

      score += 1;
    }
  });
}

//collision with doodler and goodthing
function collisionBadThing(platform) {
  badThings.forEach((badThing) => {
    if (
      badThing.bottom == platform.bottom + 15 &&
      doodlerLeftSpace + 60 >= badThing.left &&
      doodlerLeftSpace <= badThing.left + 25
    ) {
      badThing.visual.style.animation = "disappear 0.4s";
      setInterval(() => {
        deleteBadThing(badThing);
      }, 400);

      score -= 3;
    }
  });
}
