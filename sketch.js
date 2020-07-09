var trex, trex_running, trex_collided, ground_image, ground, invisibleGround,obstacles,cloud_Image,cloud,obstacles,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,gameState,obstaclesGroup,cloudsGroup,restart,gameOver,gameOverImage,restartImage,HICount,Count; 
var Count = 0

function preload(){
trex_running = loadAnimation("trex1.png" , "trex3.png" , "trex4.png");
trex_collided = loadImage("trex_collided.png");
ground_image = loadImage("ground2.png")  
cloud_Image = loadImage("cloud.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
gameOverImage = loadImage("gameOver.png");
restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite (50, 130, 20 ,50);
  trex.addAnimation("running" , trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite (300,180,400,20);
  ground.addImage("ground", ground_image);
  
  invisibleGround = createSprite(300,190,600,20);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  restart = createSprite(300,130,50,50);
  restart.addImage(restartImage);
  restart.visible = false;
  restart.scale = 0.5;

  gameOver = createSprite(300,100,50,50);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  gameOver.scale = 0.5;
  gameState = "play";
  
  Count = 0;
  HICount = 0;
}

function draw() {
    background(180);
    if(gameState === "play"){
     ground.velocityX = -(10 + Count/100);
     if (ground.x < 0){
         ground.x = ground.width/2;
     }
      if(keyDown("space") && trex.y >= 150){
        trex.velocityY = -13 ;
        //playSound("jump.mp3"); 
      }
     trex.velocityY = trex.velocityY + 0.8;
     trex.collide(invisibleGround);
     console.log(trex.y);
     Count = Count + Math.round(World.frameRate/60);
     if (obstaclesGroup.isTouching(trex)) {
     gameState = "end";
          //playSound("die.mp3");
     }
    
      spawnClouds();
     spawnObstacles();
     }  
  
        else if( gameState === "end" ){
        ground.velocityX = 0;
        trex.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);
        trex.changeAnimation("collided",trex_collided);
        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        gameOver.visible = true;
        restart.visible = true;
     }
      if(mousePressedOver(restart)){
    Reset();
    }
      text("HI "+ HICount, 280, 15);
    text("Score:" + Count, 320, 15);
    
    if (Count > 0 && Count % 100 === 0) {
      
      //playSound("checkPoint.mp3");
      
    }

  
  
    

  
  drawSprites();
  
}

    function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 40 === 0) {
    cloud = createSprite(600,120,40,10);
    cloud.addImage(cloud_Image);
    cloud.y = random(60,100);
    cloud.scale = 0.7;
    cloud.velocityX = -6;
     //assign lifetime to the variable
    cloud.lifetime = 100;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
  }
}

  function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 40 === 0) {
    obstacle = createSprite(600,160,40,10);
    var rand = Math.round(random(1,6))
    switch(rand){
    case 1:obstacle.addImage(obstacle1);
    break;
    case 2:obstacle.addImage(obstacle2);
    break;
    case 3:obstacle.addImage(obstacle3);
    break;
    case 4:obstacle.addImage(obstacle4);
    break;
    case 5:obstacle.addImage(obstacle5);
    break;
    case 6:obstacle.addImage(obstacle6);
    break;
    default:break;
    }
    obstacle.scale = 0.6;
    obstacle.velocityX = -(10 + Count/100);
    obstacle.lifetime = 60;
    obstaclesGroup.add(obstacle);
    
  }
  }
function Reset() {
  gameState = "play";
  gameOver.visible = false;
  restart.visible = false;
  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  trex.x = 50;
  trex.y = 130;
if (HICount < Count) {
    HICount = Count;
  } 
  else{
    HICount = HICount;
  }
    Count = 0;
}
