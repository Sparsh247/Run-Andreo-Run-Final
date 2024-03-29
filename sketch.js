var PLAY=1;
var END=0;
var gameState=PLAY;

var boyimg,boy,bgimg,carimg,greyCarimg,car1,car2;
var car1Grp,car2Grp;
var score,wall1,coinimg,coinGrp;

function preload(){
 boyimg=loadAnimation("Images/Andreo0.gif","Images/Andreo1.gif","Images/Andreo2.gif","Images/Andreo3.gif","Images/Andreo4.gif","Images/Andreo5.gif","Images/Andreo6.gif","Images/Andreo7.gif","Images/Andreo8.gif","Images/Andreo9.gif","Images/Andreo10.gif","Images/Andreo11.gif","Images/Andreo12.gif","Images/Andreo13.gif","Images/Andreo14.gif","Images/Andreo15.gif")
  bgimg=loadImage("Bg.png")
carimg=loadAnimation("Images/Car1.gif","Images/Car2.gif","Images/Car3.gif","Images/Car4.gif","Images/Car5.gif")
greyCarimg=loadAnimation("Images/Grey1.gif","Images/Grey2.gif","Images/Grey3.gif","Images/Grey4.gif")
coinimg=loadAnimation("Coins/Coin 1.gif","Coins/Coin 2.gif","Coins/Coin 3.gif","Coins/Coin 4.gif","Coins/Coin 5.gif","Coins/Coin 6.gif","Coins/Coin 7.gif","Coins/Coin 8.gif","Coins/Coin 9.gif","Coins/Coin 10.gif","Coins/Coin 11.gif","Coins/Coin 12.gif")
gameimg=loadImage("Game.png")
resetimg=loadImage("Restart.png")


}


function setup() {
  createCanvas(displayWidth,displayHeight);

  bg=createSprite(displayWidth/2,displayHeight/2)
bg.addImage(bgimg)
bg.scale=0.7
//bg.velocityX=-6

  boy=createSprite(400, 600, 50, 50);
  boy.addAnimation("running",boyimg)
  //boy.velocityX=4
  boy.scale=0.4 
 

  boy.debug=true
 boy.setCollider("rectangle",-10,-20,120,140)
  wall1=createSprite(20,500,2600,10)
  //wall1.velocityX=-4
 wall1.visible=false
 
wall2=createSprite(20,720,2600,10)
   wall2.visible=false

  gameover=createSprite(displayWidth/2,350)
  gameover.addImage(gameimg)
  gameover.scale=1.5
  reset=createSprite(displayWidth/2,550)
  reset.addImage(resetimg)
  reset.scale=0.4

car1Grp=new Group()
car2Grp=new Group()
coinGrp=new Group()
score=0;
}


function draw() {
  background(0);
  fill("black")
textSize(35)
if(gameState===PLAY){
  gameover.visible=false
  reset.visible=false
  //score=score+Math.round(frameRate()/60)
  if(keyDown("UP_ARROW")){
    boy.y=boy.y-10;
  
  }
  if(keyDown("DOWN_ARROW")){
    boy.y=boy.y+10;
  
  }
  if(boy.isTouching(coinGrp)){
    coinGrp.destroyEach()
    score=score+100
  }
 
  /*if(bg.x<0){
    bg.x=displayWidth
  }*/



 
  spawnCars();
  blackcars();
  spawnCoins();
  

  if(boy.isTouching(car1Grp)||boy.isTouching(car2Grp)){
    gameState=END
     
  }
}
else{
   if(gameState===END){
    gameover.visible=true
    reset.visible=true
     boy.velocityY=0;
     car1Grp.setLifetimeEach(-1)
     car1Grp.setVelocityXEach(0)
     car2Grp.setLifetimeEach(-1)
     car2Grp.setVelocityXEach(0)
     coinGrp.setVelocityXEach(0)
     coinGrp.setLifetimeEach(-1)

     
   }
}
boy.collide(wall1)
boy.collide(wall2)
 // camera.position.x=boy.x



 if(mousePressedOver(reset)){
   restart()
 }


  drawSprites();
  
text("Score:"+score,900,50)
}
function restart(){
  gameover.visible=false
  reset.visible=false
  gameState=PLAY
  car1Grp.destroyEach()
  car2Grp.destroyEach()
  coinGrp.destroyEach()
  score=0
}


function  spawnCars(){
if(frameCount%200===0){
  var car1=createSprite(1200,550,10,10)
 car1.addAnimation("running",carimg)
 car1.y=Math.round(random(550,600))
 car1.velocityX=-4
  car1.scale=0.8

  car1.lifetime=2000
  car1.depth=boy.depth
  boy.depth=boy.depth+1
 car1Grp.add(car1)

 car1.debug=true

 car1.setCollider("rectangle",5,20,300,100)
}
}
function blackcars(){
  if(frameCount%380===0){
    var car2=createSprite(1200,600,20,20)
    car2.addAnimation("running",greyCarimg)
    car2.y=Math.round(random(600,650))
    car2.velocityX=-4
     car2.scale=1.8
     car2.debug=true
     car2.depth=boy.depth
     boy.depth=boy.depth+1
  car2Grp.add(car2)
    
    }
 
}

function spawnCoins(){
 if(frameCount%170===0){
   var coin=createSprite(1200,550,10,10)
   coin.addAnimation("moving",coinimg)
   coin.y=Math.round(random(550,650))
   coin.velocityX=-6
   coin.scale=0.6
coin.debug=true
 coin.setCollider("circle",0,0,40)
coinGrp.add(coin)
}

  
}
