// for the gamestate
var PLAY = 1;
var END = 0;

// so that gamesate is equal to play
var gameState = PLAY;

//this is trex of the game
var trex;

// ground o the game
var ground, invisibleGround, groundImage;

// the cloudgroup and clouds images are here
var cloudsGroup, cloudImage;

// the groups created for the obsacles of the game
var obstaclesGroup;

// random image sof the obstacles
var obstacle1,obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

// its written for score tof the game
var score = 0;

// so it displays game over and restart utton
var gameover,restart;


function preload(){
  
  // to load the animation pf the followin
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  
  
  trex_collided = loadAnimation("trex_collided.png");
  
  obstacle1 = loadImage("obstacle1.png");
  
  
  obstacle2 = loadImage("obstacle2.png");
  
  
  obstacle3 = loadImage("obstacle3.png");
  
  
  obstacle4 = loadImage("obstacle4.png");
  
  
  obstacle5 = loadImage("obstacle5.png");
  
  
  obstacle6 = loadImage("obstacle6.png");
  
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  

  
  gameOverImg = loadImage("gameOver.png");
  
  restartImg = loadImage("restart.png");
}

function setup() {
  
  // to create background
  createCanvas(windowWidth,windowHeight);
  
  trex = createSprite(50,height-200,20,50);
 
  // so trex can get  a animation
  trex.addAnimation("running", trex_running);
  
  // scale for the trex
  trex.scale = 0.550;
  
  ground = createSprite(200, height-180 ,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
       trex.addAnimation("collided", trex_collided);
  
  
  gameOver = createSprite(200,height-210);
  
  
  
  restart = createSprite(200,height-250);
  
  
  
  restart.addImage(restartImg);
  
 
  
  gameOver.scale = 0.6;
  
  
  restart.scale = 0.6;

  gameOver.visible = false;
  
   gameOver.addImage(gameOverImg);
  restart.visible = false;
  
  invisibleGround = createSprite(200,height-165,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  
  background(225);
  
  textSize(30)
  fill("white")
  text("Score: "+ score, width-200,height-550);
  
  if (gameState === PLAY){
    
    ground.velocityX = -(6 + 3*score/100);
    
  
    if(touches.length > 0 || keyDown("space") && trex.y >= height-425) {
      trex.velocityY = -8;
      touches = [];
    }
    
    console.log(trex.y);
    
    score = score + Math.round(getFrameRate()/60);
    
    
    trex.velocityY = trex.velocityY + 0.950
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
   // trex.debug = true;
  
    trex.collide(invisibleGround);
    
    spawnclouds();
    
    spawnobstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    
        ground.velocityX = 0;
    trex.velocityY = 0;

    
  

    obstaclesGroup.setVelocityXEach(0);
    
    
    cloudsGroup.setVelocityXEach(0);
    
    gameOver.visible = true;
    restart.visible = true;
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      resetgame();
      touches = [];
    }
  }
  
  
  drawSprites();
}

function spawnclouds() {
  
  if (frameCount % 50 === 0) {
    var cloud = createSprite(600,120,40,10);
    
    cloud.y = Math.round(random(80,120));
    
    cloud.addImage(cloudImage);
    
    cloud.scale = 0.5;
    
    cloud.velocityX = -3.50;
    
     
    cloud.lifetime = 200;
    
  
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 7;
    
    
    cloudsGroup.add(cloud);
  }
  
}

function spawnobstacles() {
  if(frameCount % 70 === 0) {
    
    var obstacle = createSprite(width-0 ,height-190 ,10 ,40 );
    
   // obstacle.debug = true;
    
    obstacle.velocityX = -(6 + 4 * score/100);
    
    
    var random1 = Math.round(random(1,6));
    switch(random1) {
        
      case 1: obstacle.addImage(obstacle1);
              break;
               
      case 2: obstacle.addImage(obstacle2);
              break;
              
      case 3: obstacle.addImage(obstacle3);
              break;
              
      case 4: obstacle.addImage(obstacle4);
              break;
              
      case 5: obstacle.addImage(obstacle5);
              break;
              
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function resetgame(){
  gameState = PLAY;
  
  gameOver.visible = false;
  
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  }