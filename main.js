document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const doodler = document.createElement("img");

  let startPoint = 150;
  let doodlerLeftSpace = 50;
  let doodlerBottomSpace = startPoint;
  let gridWidth = grid.clientWidth;
  let gridHeight = grid.clientHeight;
  let platformWidth = 85;
  let isGameOver = false;
  let platformCount = 5;
  let platforms = [];
  let goodThings = [];
  let upTimerId;
  let downTimerId;
  let leftTimerId;
  let rightTimerId;
  let isJumping = true;
  let isGoingLeft = false;
  let isGoingRight = false;
  let score = 0;
  let newPlatform;

  //doodler creation with it's style
  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add("doodler");
    //so that doodler won't go anywhere
    doodlerLeftSpace = platforms[0].left;
    doodler.style.left = doodlerLeftSpace + "px";
    doodler.style.bottom = doodlerBottomSpace + "px";
    doodler.src = "images/doodler.png";
  }

  //this is the platforms with it's style
  class Platform {
    constructor(newPlatformBottom) {
      this.bottom = newPlatformBottom;
      this.left = Math.random() * (gridWidth - platformWidth);
      this.visual = document.createElement("div");

      const visual = this.visual;
      visual.classList.add("platform");
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      grid.appendChild(visual);
    }
  }

  // this will create all the platforms
  function createPlatfoms() {
    for (let i = 0; i < platformCount; i++) {
      let platformGap = gridHeight / platformCount;
      let newPlatformBottom = 100 + i * platformGap;
      let newPlatform = new Platform(newPlatformBottom);
      platforms.push(newPlatform); //pushing newly created platform into this array
    }
  }

  //goodThing style
  class GoodThing {
    constructor(goodThingPos) {
      this.bottom = goodThingPos.bottom + 15;
      this.left = goodThingPos.left + 15; //grid width - platform width
      this.visual = document.createElement("div");

      const visual = this.visual;
      visual.classList.add("goodThing");
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      grid.appendChild(visual);
    }
  }

  //create goodThings
  function createGoodThing() {
    let haveIt = [];
    let i = 0;
    while (haveIt.length != 2) {
      let goodThingPlatform = Math.floor(
        1 + Math.random() * (platforms.length - 1)
      );
      if (haveIt.includes(goodThingPlatform) == false) {
        let goodThingPos = platforms[goodThingPlatform];
        let goodThing = new GoodThing(goodThingPos);
        goodThings.push(goodThing);
        haveIt.push(goodThingPlatform);
      } else {
        i++;
      }
    }
  }

  //so that platform will keeps falling down
  function movePlatforms() {
    if (doodlerBottomSpace > 50) {
      platforms.forEach((platform) => {
        moveGoodThing(platform);

        platform.bottom -= 4;
        visual = platform.visual;
        visual.style.bottom = platform.bottom + "px";

        //adding new platform and goodthing
        if (platform.bottom < 10) {
          //this will remove the first platform;
          let firstPlatform = platforms[0].visual;
          firstPlatform.classList.remove("platform");
          platforms.shift();
          score++;
          //new platform will apear at the top
          //debugger
          newPlatform = new Platform(gridHeight);
          platforms.push(newPlatform);
          if (goodThings.length <= 2) {
            createNewThing(newPlatform);
          }
        }
      });
    }
  }

  //move goodThing
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

  //create new thing
  function createNewThing(newPlatform) {
    let newGoodThing = new GoodThing(newPlatform);
    goodThings.push(newGoodThing);
  }

  //delete goodThing
  function deleteGoodThing(goodThing) {
    let goodThingsContent = goodThings;
    let deleteElement = goodThing;
    let deleting = goodThingsContent.indexOf(deleteElement);

    if (deleting != -1) {
      let firstGoodThing = goodThings[deleting].visual;
      firstGoodThing.classList.remove("goodThing");
      goodThings.splice(deleting, 1);
    }
  }

  //doodler jumping
  function jump() {
    //so that it won't fall
    clearInterval(downTimerId);
    isJumping = true;
    //to stop jump
    upTimerId = setInterval(() => {
      if (doodlerBottomSpace + 85 <= gridHeight - 100) {
        doodlerBottomSpace += 20; //height jump
        doodler.style.bottom = doodlerBottomSpace + "px";
      } else if (doodlerBottomSpace + 85 >= gridHeight - 100) {
        doodlerBottomSpace += 0; //height jump
          doodler.style.bottom = doodlerBottomSpace + "px";
          fall();
      }
      // the doodler will fall when it hits more than 350 px
      if (doodlerBottomSpace > startPoint + 200) {
        fall();
      }
    }, 30);
  }

  //doodler will fall
  function fall() {
    clearInterval(upTimerId);
    //to stop doodler from jumping
    isJumping = false;
    //doodler fall
    downTimerId = setInterval(() => {
      doodlerBottomSpace -= 5;
      doodler.style.bottom = doodlerBottomSpace + "px";

      //game over
      if (doodlerBottomSpace <= 0) {
        gameOver();
      }
      collisionPlatform();
    }, 20);
  }

  //collision with doodler and platform
  function collisionPlatform() {
    //collision doodler with the platforms
    //get platforms array if doodler bottom space is less or equal to platform bottom doodler stop falling
    // and check if doodler is between 15 px of the platform. 15 is height of platform
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

        //new start point for jumping
        startPoint = doodlerBottomSpace;
        isJumping = true;
        jump();
      }
    });
  }

  //collision with doodler and goodthing
  function collisionGoodThing(platform) {
    goodThings.forEach((goodThing) => {
      if (
        goodThing.bottom == platform.bottom + 15 &&
        doodlerLeftSpace + 30 >= goodThing.left &&
        doodlerLeftSpace + 30 <= goodThing.left + 25
      ) {
        deleteGoodThing(goodThing);
          score += 2;
        console.log("goodthing touched");
      }
    });
  }

  //game over
  function gameOver() {
    console.log("game over");
    isGameOver = true;
    //stops game
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
    grid.innerHTML = score;
    //stops platform
    clearInterval(upTimerId);
    //stops doodler
    clearInterval(downTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
  }

  //when doodler is going left
  function moveLeft() {
    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }
    isGoingLeft = true;
    leftTimerId = setInterval(() => {
      if (doodlerLeftSpace >= 11) {
        doodlerLeftSpace -= 20;
        doodler.style.left = doodlerLeftSpace + "px";
        isGoingLeft = false;
      } else if (doodlerLeftSpace < 10) {
          doodlerLeftSpace += gridWidth - 25;
      }
      else {
        moveRight();
      }
    }, 30);
  }

  //when doodler is going right
  function moveRight() {
    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }
    isGoingRight = true;
    rightTimerId = setInterval(function () {
      if (doodlerLeftSpace <= 330) {
        doodlerLeftSpace += 20;
        doodler.style.left = doodlerLeftSpace + "px";
      } else if (doodlerLeftSpace > 329) {
        doodlerLeftSpace -= gridWidth - 25;
      } else {
        moveLeft();
      }
    }, 30);
  }

  //move straight

  function moveStraight() {
    isGoingLeft = false;
    isGoingRight = false;
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
  }

  //controller
  function control(e) {
    if (e.key === "ArrowLeft") {
      //move left
      moveLeft();
    } else if (e.key === "ArrowRight") {
      //move right
      moveRight();
    } else if (e.key === "ArrowUp") {
      //move sraight up
      moveStraight();
    }
  }

  // STOP controller
  function stopControl(e) {
    if (e.key === "ArrowLeft") {
      //move left
      isGoingLeft = false;
      clearInterval(leftTimerId);
    } else if (e.key === "ArrowRight") {
      //move right
      isGoingRight = false;
      clearInterval(rightTimerId);
    } else if (e.key === "ArrowUp") {
      //move sraight up
      moveStraight();
    }
  }

  //start game
  function start() {
    if (!isGameOver) {
      createPlatfoms();
      createDoodler();
      createGoodThing();
      setInterval(movePlatforms, 30);
      jump();
      document.addEventListener("keydown", control);
      document.addEventListener("keyup", stopControl);
    }
  }

  start();
});
