var canvas;
var backgroundImage, car1_img, car2_img, track;
var database, gameState;
var form, player, playerCount;
var allPlayers, hp1, hp2;
var hps= [];

function preload() {
  backgroundImage = loadImage("./assets/bg.jpg");
  hp1_img = loadImage("../assets/hp1.png");
  hp2_img = loadImage("../assets/hp2.png");
  track = loadImage("../assets/track.jpg");
  backgroundImage = loadImage("./assets/bg.jpg");
  hp1_img = loadImage("../assets/hp1.png");
  hp2_img = loadImage("../assets/hp2.png");
  track = loadImage("../assets/track.jpg");
  caveimg = loadImage("../assets/cave.png");
  centaurimg = loadImage("../assets/centaur.png");
  forestimg = loadImage("../assets/forest.png");
  riddle1img = loadImage("../assets/spell1.png");
  riddle2img = loadImage("../assets/centaur1.png");
  forestRidimg = loadImage("../assets/forest1.png");
  riddle1Ansimg =loadImage("../assets/spell1Answer.png");
  riddle2Ansimg = loadImage("../assets/rid2Ans.png");
  riddle3Ansimg = loadImage("../assets/rid3Ans.png");
  riddle1Optimg = loadImage("../assets/rid1Option.png");
  riddle2Optimg = loadImage("../assets/rid2Option.png");
  riddle3Optimg = loadImage("../assets/rid3Option.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  hp1 = createSprite(100,1600,20,20);
   hp1.addImage(hp1img);
   hp1.scale= 0.3
  
   hp2 = createSprite(500,1600,20,20);
   hp2.addImage(hp2img);
   hp2.scale= 0.3
  
   cave1 = createSprite(100, 1400, 20, 20);
   cave1.addImage(caveimg);
   cave1.scale = 0.4;
   cave1.setCollider("circle", 0,0,50);
  
   cave2 = createSprite(500, 1400, 20, 20);
   cave2.addImage(caveimg);
   cave2.scale = 0.4;
   cave2.setCollider("circle", 0,0,50);
  
   centaur1 = createSprite(100, 1200, 20, 20);
   centaur1.addImage(centaurimg);
   centaur1.scale = 0.4;
   centaur1.setCollider("circle", 0,0,50);
  
   centaur2 = createSprite(500, 1200, 20, 20);
   centaur2.addImage(centaurimg);
   centaur2.scale = 0.4;
   centaur2.setCollider("circle", 0,0,50);
  
   forest1 = createSprite(100, 1000, 20, 20);
   forest1.addImage(forestimg);
   forest1.scale = 0.15;
   forest1.setCollider("circle", 0,0,50);
  
   forest2 = createSprite(500, 1000, 20, 20);
   forest2.addImage(forestimg);
   forest2.scale = 0.15;
   forest2.setCollider("circle", 0,0,50);
}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }

  spawnCave();
  spawnCentaur();
  spawnForest();
  spawnCav();
  spawnFor();
  spawnCen();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
