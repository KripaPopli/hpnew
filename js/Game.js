class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    hp1 = createSprite(width / 2 - 50, height - 100);
    hp1.addImage("hp1", hp1_img);
    hp1.scale = 0.5;

    hp2 = createSprite(width / 2 + 100, height - 100);
    hp2.addImage("hp2", hp2_img);
    hp2.scale = 0.5;

    hps = [hp1, hp2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    //C39
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leadeboardTitle.html("Leaderboard");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  play() {
    this.handleElements();
    this.handleResetButton();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      this.showLeaderboard();

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        hps[index - 1].position.x = x;
        hps[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          // Changing camera position in y direction
          camera.position.y = hps[index - 1].position.y;
        }
      }

      // handling keyboard events
      this.handlePlayerControls();

      drawSprites();
    }
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }

  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;    This tag is used for displaying four spaces.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  handlePlayerControls() {
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }

    if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
      player.positionX -= 5;
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
      player.positionX += 5;
      player.update();
    }
  }
}


function spawnCave(){
  if(hp1.isTouching(cave1)){
    hp1.velocityY = 0;
    cave1.destroy();
   riddle1 = createSprite(200,1350,20,20);
   riddle1.addImage(riddle1img);
   riddle1.scale= 0.9;
   
    
   riddle1Answer = createSprite(50, 1350, 10, 10);
   riddle1Answer.addImage(riddle1Ansimg);
   riddle1Answer.scale = 0.7;
    
  riddle1Option = createSprite(300, 1380, 10, 10);
  riddle1Option.addImage(riddle1Optimg);
  riddle1Option.scale = 0.7;
  }
  
  if (gameState===0 && mousePressedOver(riddle1Answer)){
    riddle1.destroy();
    riddle1Answer.destroy();
    riddle1Option.destroy();
  }
  
  if(gameState === 1){
    hp1.destroy();
    text("you failed, kindly restart the game", 150, 1350);
  }
  }
  
  function spawnCentaur() {
  if(hp1.isTouching(centaur1)){
    hp1.velocityY = 0;
    centaur1.destroy();
   riddle2 = createSprite(200,1170,20,20);
   riddle2.addImage(riddle2img);
   riddle2.scale= 0.9;
    
   riddle2Answer = createSprite(200, 1210, 10, 10);
   riddle2Answer.addImage(riddle2Ansimg);
   riddle2Answer.scale = 0.7;
    
  riddle2Option = createSprite(300, 1230, 10, 10);
  riddle2Option.addImage(riddle2Optimg);
  riddle2Option.scale = 0.7;
  }
  if (mousePressedOver(riddle2Answer)) {
    riddle2.destroy();
    riddle2Answer.destroy();
    riddle2Option.destroy();
  }
  }
  
  function spawnForest() {
   if(hp1.isTouching(forest1)){
    hp1.velocityY = 0;
    forest1.destroy();
   forestRiddle = createSprite(200,900,20,20);
   forestRiddle.addImage(forestRidimg);
   forestRiddle.scale= 0.9;
     
   riddle3Answer = createSprite(300, 920, 10, 10);
   riddle3Answer.addImage(riddle3Ansimg);
   riddle3Answer.scale = 0.7;
     
  riddle3Option = createSprite(200, 920, 10, 10);
  riddle3Option.addImage(riddle3Optimg);
  riddle3Option.scale = 0.7;
   }
  if (mousePressedOver(riddle3Answer)) {
    forestRiddle.destroy();
    riddle3Answer.destroy();
    riddle3Option.destroy();
  }
  
  function spawnCav() {
    
    if(hp2.isTouching(cave2)){
      hp2.velocityY = 0;
      cave2.destroy();
     riddle1 = createSprite(600,1350,20,20);
     riddle1.addImage(riddle1img);
     riddle1.scale= 0.9;
      
     riddle8Answer = createSprite(450,1350,10,10);
     riddle8Answer.addImage(riddle1Ansimg);
     riddle8Answer.scale = 0.7;
      
    riddle8Option = createSprite(700, 1380, 10, 10);
    riddle8Option.addImage(riddle1Optimg);
    riddle8Option.scale = 0.7;
  
    if (mousePressedOver(riddle8Answer)) {
      riverRiddle.destroy();
      riddle8Answer.destroy();
      riddle8Option.destroy();
  
  
    }
    }
  }
  
  
  function spawnCen() {
    if(hp2.isTouching(centaur2)){
      hp2.velocityY = 0;
      centaur2.destroy();
     spell2 = createSprite(600,1170,20,20);
     spell2.addImage(riddle2img);
     spell2.scale= 0.9;
      
     riddle9Answer = createSprite(600,1210,10,10);
     riddle9Answer.addImage(riddle2Ansimg);
     riddle9Answer.scale = 0.7;
      
    riddle9Option = createSprite(700,1230,10,10);
    riddle9Option.addImage(riddle2Optimg);
    riddle9Option.scale = 0.7;
    }
  }
  
  function spawnFor() {
     if(hp2.isTouching(forest2)){
      hp2.velocityY = 0;
      forest2.destroy();
     forestRiddle = createSprite(600,900,20,20);
     forestRiddle.addImage(forestRidimg);
     forestRiddle.scale= 0.9;
       
     riddle10Answer = createSprite(700,920,10,10);
     riddle10Answer.addImage(riddle3Ansimg);
     riddle10Answer.scale = 0.7;
       
    riddle10Option = createSprite(600,920,10,10);
    riddle10Option.addImage(riddle3Optimg);
    riddle10Option.scale = 0.7;
    }
  }
  
  
  }
  