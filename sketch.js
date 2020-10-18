var Runner_lives,life1,life2,life3,lifeImage;
var runway,runwayImage;
var Player,PlayerImage;
var invisibleGround;
var obstacle1, obstacle2, obstacle3, obstacle4;
var coin1;
var PLAY=1
var END=0
var gameState=PLAY;
var Gameover,GameoverImg,Restart,RestartImg;
var CoinScore,CoinScoreImg,CoinSound,Jumps,DashSound,CloudImg,Loose;

function preload(){
  
lifeImage=loadImage("life.png")
runwayImage=loadImage("runway.png") 

PlayerImage=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png") 
 
   obstacle1 = loadImage("cutter2.png");
  obstacle2 = loadImage("cutter3.png");
  obstacle3 = loadImage("cutter4.png");
  obstacle4 = loadImage("cutter5.png");
  
  coin1= loadImage("Coin1.png");
  
  CloudImg=loadImage("Clouds.png");
  
  GameoverImg= loadImage("gameOver.png");
  RestartImg= loadImage("restart.png");
  CoinSound= loadSound("coin3.mp3");
  Jumps= loadSound("Jump.wav");
  DashSound= loadSound("Swoosh.wav");
  Loose= loadSound("Looser.mp3");
}
function setup() {
  createCanvas(600,450);
  
  
  runway=createSprite(0,80,10,10)
  runway.addImage(runwayImage)
  runway.scale=2;
  runway.velocityX=-8
   
  cloudsGroup=new Group();
  
 life1=createSprite(450,50,20,20)
 life1.addImage(lifeImage)
 life1.scale=0.03;
   
  
 life2=createSprite(470,50,20,20)
 life2.addImage(lifeImage)
 life2.scale=0.03; 
   
  
 life3=createSprite(490,50,20,20)
 life3.addImage(lifeImage)
 life3.scale=0.03;
   
  
  
 Runner_lives=0;
  
 Player=createSprite(80,350,20,20) 
 Player.addAnimation("running",PlayerImage) 
 Player.scale=0.09;
  Player.setCollider("rectangle",0,0,200,600);
 
  
  
  invisibleGround=createSprite(300,350,600,10)
  invisibleGround.visible=false;
  
  obstaclesGroup=new Group();
  CoinGroup=new Group();
  CoinGroup2=new Group();
  CoinGroup3=new Group();
  
  CoinScoreImg=createSprite(180,50,20,20) 
  CoinScoreImg.addImage(coin1)  
  CoinScoreImg.scale = 0.06;
  
  Gameover=createSprite(300,200,20,20) 
  Gameover.addImage(GameoverImg)
  Gameover.scale = 0.5;
  
  
  Restart=createSprite(300,240,20,20) 
  Restart.addImage(RestartImg)
  Restart.scale = 0.5;
  
  CoinScore=0;
 
}
function draw() {
  background(200)
  
  if (gameState===PLAY)  { 
 
     Gameover.visible=false;
  Restart.visible=false;
    spawnObstacles()
  Coins()
    Coins2()
    Coins3()
    spawnClouds()
  Player.collide(invisibleGround)
 if (Runner_lives===0) {
   life1.visible=true;
   life2.visible=true;
   life3.visible=true;
 }
 
   

  
  if(keyDown("space")&&Player.y>=300) {
        Player.velocityY = -12;
    Jumps.play()
  } 
  
  
 if (Runner_lives===-1) {
   life3.visible=false;
  
 }
  
  if (Runner_lives===-2) {
   life2.visible=false;
   
 }
  
  if (Runner_lives===-3) {
   life1.visible=false;
    Loose.play()
  gameState=END
 }
  
 if (runway.x<0) { 
   runway.x=runway.width/2
 }
  
   
 if (obstaclesGroup.isTouching(Player)) { 
  obstaclesGroup.destroyEach();
    DashSound.play()
   Runner_lives=Runner_lives-1;
 }
  
  
   if (CoinGroup.isTouching(Player)) { 
  CoinGroup.destroyEach();
     CoinSound.play()
     CoinScore=CoinScore+1
 }
     if (CoinGroup2.isTouching(Player)) { 
  CoinGroup2.destroyEach();
     CoinSound.play()
       CoinScore=CoinScore+1
 } 
      
         if (CoinGroup3.isTouching(Player)) { 
  CoinGroup3.destroyEach();
     CoinSound.play()
           CoinScore=CoinScore+1
 } 

  }
  
  
  drawSprites();
  stroke("red")
  textSize(18)
  text("Lives:",390,55)
  
  stroke("green")
  textSize(18)
  text(":"+CoinScore,200,55)
  
  Player.collide(invisibleGround)
     Player.velocityY = Player.velocityY + 0.9
  
  
  
  
   if (gameState===END)  {
   runway.velocityX=0;
    obstaclesGroup.destroyEach();
     obstaclesGroup.setVelocityXEach(0);
     CoinScore=0;
    CoinGroup.destroyEach();
     CoinGroup.setVelocityXEach(0);
      CoinGroup2.destroyEach();
     CoinGroup2.setVelocityXEach(0);
     CoinGroup3.destroyEach();
     CoinGroup3.setVelocityXEach(0);
     cloudsGroup.destroyEach();
     cloudsGroup.setVelocityXEach(0); 
      Gameover.visible=true;
     Player.visible=false;
  Restart.visible=true;

 if(mousePressedOver(Restart)) {
  reset()
    }        
 } 

}
function spawnObstacles(){
 if (frameCount % 100 === 20){
   var obstacle = createSprite(600,310,10,40);
   obstacle.velocityX = -8 ;
   
       var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
          
    obstacle.scale = 0.06;
    obstacle.lifetime = 300;
   obstacle.collide(invisibleGround)
   
    obstaclesGroup.add(obstacle);
 }
}

function Coins(){
 if (frameCount % 120 === 20){
   var Coin = createSprite(600,200,10,40);
   Coin.x = Math.round(random(600,640));
   Coin.y = Math.round(random(200,250));
   Coin.velocityX = -8;
   Coin.addImage(coin1)   
    Coin.scale = 0.06;
    Coin.lifetime = 300;
    CoinGroup.add(Coin);
 }
}

function Coins2(){
 if (frameCount % 100 === 0){
   var Coin2 = createSprite(650,200,10,40);
    Coin2.x = Math.round(random(650,690));
   Coin2.y = Math.round(random(200,250));
   Coin2.velocityX = -8;
   Coin2.addImage(coin1)   
    Coin2.scale = 0.06;
    Coin2.lifetime = 300;
    CoinGroup2.add(Coin2);
 }
}

function Coins3(){
 if (frameCount % 75 === 0){
   var Coin3 = createSprite(700,200,10,40);
   Coin3.x = Math.round(random(700,740));
   Coin3.y = Math.round(random(200,250));
   Coin3.velocityX = -8;
   Coin3.addImage(coin1)   
    Coin3.scale = 0.06; 
    Coin3.lifetime = 300;
    CoinGroup3.add(Coin3);
 }
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(100,120));
    cloud.addImage(CloudImg);
    cloud.scale = 0.03;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloudsGroup.add(cloud);
  }
}
function reset()  { 
  gameState=PLAY;
   Runner_lives=0;
    Gameover.visible=false;
  Restart.visible=false; 
  runway.velocityX=-8
  Player.visible=true;
       }
 






