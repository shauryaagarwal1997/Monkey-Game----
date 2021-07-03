var jungle,jungleImg;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,coinsGroup,dollarsGroup,diamondGroup;
var score
var ground;
var survivalTime=0;
var Coins=0;
var score=0;
var gameState="PLAY";
var gameState="END";
var gameOver,gameOverImg;
var coin,coinImg;
var diamond,diamondImg;
var dollar,dollarImg;
var coins;
var g,a,m,e,o,v,e1,r;
var gI,aI,mI,eI,oI,vI,e1I,rI;

function preload(){
  
  
monkey_running =        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImg=loadImage("game-over-1-1.jpeg");
  jungleImg=loadImage("jungle1.jpg");
  coinImg=loadImage("coin.jpg");
  diamondImg=loadImage("diamond1.jpg");
  dollarImg=loadImage("dollar.jpg");
  gI=loadImage("g.jpg");
  aI=loadImage("a.jpg");
  mI=loadImage("m.jpg");
  eI=loadImage("e.jpg");
  oI=loadImage("o.jpg");
  vI=loadImage("v.jpg");
  e1I=loadImage("e1.jpg");
  rI=loadImage("r.jpg");
}



function setup() {
  createCanvas(400,300);
  
  jungle=createSprite(300,140,400,400);
  jungle.addImage(jungleImg);
  jungle.scale=1.4;
 
  
  monkey=createSprite(50,280,10,10);
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1;
  monkey.velocityX=5;
  
  ground=createSprite(200,350,80000,10);
  
  obstaclesGroup=new Group();
  FoodGroup=new Group();
  coinsGroup=new Group();
  dollarsGroup=new Group();
  diamondsGroup=new Group();
  
  gameOver=createSprite(-2200,-2220,400,400);
  gameOver.addImage(gameOverImg);
  
   g=createSprite(60,159.8,10,10);
   a=createSprite(70,169.6,10,10);
   m=createSprite(80,171,10,10);
   e=createSprite(90,171,10,10);
   o=createSprite(60,240,10,10);
   v=createSprite(70,240,10,10);
   e1=createSprite(80,239,10,10); 
   r=createSprite(90,240,10,10);
  
  g.addImage(gI);
  a.addImage(aI);
  m.addImage(mI);
  e.addImage(eI);
  o.addImage(oI);
  v.addImage(vI);
  e1.addImage(e1I);
  r.addImage(rI);
  
   g.scale=0.42
   a.scale=0.4
   m.scale=0.4
   e.scale=0.4
   o.scale=0.4
   v.scale=0.4
   e1.scale=0.4
   r.scale=0.4
  
  g.visible=false;
  a.visible=false;
  m.visible=false; 
  e.visible=false; 
  o.visible=false;
  v.visible=false;
  e1.visible=false; 
  r.visible=false; 
}


function draw() {
  gameState="PLAY";
  if(gameState==="PLAY"){
  background("black");
  ground.depth=monkey.depth-1;
  if(ground.x<100) {
    ground.x=400;
  }
     g.x=monkey.x+25;
     a.x=monkey.x+115;
     m.x=monkey.x+203;
     e.x=monkey.x+290;
     o.x=monkey.x+35; 
     v.x=monkey.x+110; 
     e1.x=monkey.x+170; 
     r.x=monkey.x+255;
  if(frameCount % 4===0 && gameOver.x===-2200) {
    survivalTime+=1;
  }
    if(frameCount % 70 === 0){
      jungle.x=monkey.x+300;
    }
    camera.x=monkey.x+150;
    camera.y=monkey.y-125;
  if(monkey.collide(ground) && keyDown("space")) {
    monkey.velocityY=-12.6;
  }
  if(coinsGroup.isTouching(monkey)){
    coinsGroup.destroyEach();
    Coins+=1;
  }
    
  monkey.velocityY=monkey.velocityY+0.5;
  monkey.collide(ground);
    
   if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
     score+=1;
    }
    if(diamondsGroup.isTouching(monkey)) {
      diamondsGroup.destroyEach();
      Coins+=10;
    }
    if(dollarsGroup.isTouching(monkey)) {
      dollarsGroup.destroyEach();
      Coins+=5;
    }
  if(obstaclesGroup.isTouching(monkey)) {
    gameState="END";
  }
  obstacles();
  Banana();
  coins();
  dollars();
  diamonds();
  
}
  if(gameState==="END") {
    
    createCanvas(400,300);
    
    monkey.destroy();
    gameOver.x=200;
    
    obstaclesGroup.destroyEach();
    FoodGroup.destroyEach();
    dollarsGroup.destroyEach();
    diamondsGroup.destroyEach();
    coinsGroup.destroyEach();
    
    if(keyDown("space")){
    gameState="PLAY";
  }
    
   g.visible=true;
   a.visible=true;
   m.visible=true; 
   e.visible=true; 
   o.visible=true;
   v.visible=true;
   e1.visible=true; 
   r.visible=true;
    
  jungle.destroy();
    
  }
  drawSprites();
    
  fill("orange");
  textSize(20);
  stroke("black");
  text("SURVIVAL  TIME : "+survivalTime,monkey.x+50,60);
    
  fill("red");
  textSize(20);
  stroke("black");
  text("Coins : "+Coins,monkey.x+105,100);
  
  fill("yellow");
  textSize(20);
  text("BANANAS : "+score,monkey.x+85,80);
  
}

function obstacles() {
  if(frameCount % 120 === 0 ) {
    obstacle=createSprite(monkey.x+500,316,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.lifetime=300;
    obstacle.setCollider("rectangle",0,0,300,200);
    obstacle.depth=gameOver-10;
    obstaclesGroup.add(obstacle);
    if(gameOver.x===200) {
      obstacle.destroy();
    }
  }
}
function Banana() {
  if(frameCount % 85 === 0 ) {
    banana=createSprite(monkey.x+450,random(150,225),10,10);
    banana.lifetime=300;
    banana.addImage(bananaImage);
    banana.scale=random(0.1,0.2);
    if(gameOver.x===200) {
      banana.destroy();
    }
    FoodGroup.add(banana);
}
}
function coins(){
  if (frameCount % 180 === 0){
    var coins=createSprite(monkey.x+450,random(120,180),10,10);
    coins.scale=0.2;
    coins.lifetime=300;
    coins.addImage(coinImg);
    coinsGroup.add(coins);
    if(gameOver.x===200) {
      coins.destroy();
    }
  }
}
function dollars(){
  if (frameCount % 250 === 0){
    var dollar=createSprite(monkey.x+450,random(120,190),10,10);
    dollar.scale=0.05;
    dollar.lifetime=300;
    dollar.addImage(dollarImg);
    dollarsGroup.add(dollar);
    if(gameOver.x===200) {
      dollar.destroy();
    }
  }
}
function diamonds(){
  if (frameCount % 320 === 0){
    var diamond=createSprite(monkey.x+450,random(80,210),10,10);
    diamond.scale=0.15;
    diamond.lifetime=300;
    diamond.addImage(diamondImg);
    diamondsGroup.add(diamond);
    if(gameOver.x===200) {
      diamond.destroy();
    }
  }
}