var mario,mario_img;
var background_Img,ground;
var ground_img;
var stone_ground;
var obstacle;
var brick_img;
var brick1_img;
var PLAY = 1;
var END = 2;
var gameState = PLAY;
var enemyg1,enemyg2,brickg,markg;
var score = 0;
var flowerg,restart,gameOver;
var restart_img,gameOver_img;
var mushroomg,mushroom_img,mushroom;
var mario_img2;

function preload(){
  mario_img = loadAnimation("images/m1.png","images/m2.png","images/m3.png");
  background_Img = loadImage("images/background1.png");
  ground_img = loadImage("images/ground.png");
  obstacle = loadAnimation("images/enemy1.png","images/enemy2.png");
  brick_img = loadImage("images/brick.png");
  brick1_img = loadImage("images/questionmark.png");
  flower_img = loadAnimation("images/flower1.png","images/flower2.png");
  restart_img = loadImage("images/restart.png");
  gameOver_img = loadImage("images/gameOver.png");
  mario_img1 = loadAnimation("images/m4.png");
  mushroom_img = loadImage("images/mushroom.png");
  
};

function setup() {
  createCanvas(1200,800);
  mario = createSprite(70,500,20,50);
  mario.addAnimation("running",mario_img);
  mario.addAnimation("stopping",mario_img1);
  mario.scale = 0.4;
  //mario.debug= true;
  mario.setCollider("rectangle",0,0,210,280);
  ground = createSprite(400,720,1800,30);

  restart = createSprite(600,600,30,30);
  restart.addImage(restart_img);
  restart.scale = 0.5;
  restart.visible = false;

  mushroom = createSprite(1000,675,20,20);
  mushroom.addImage(mushroom_img);
  mushroom.visible = false;
  mushroom.scale = 0.8;

  gameOver = createSprite(600,450,30,30);
  gameOver.addImage(gameOver_img);
  gameOver.visible = false;

  enemyg1 = new Group();
  enemyg2 = new Group();
  brickg = new Group();
  markg = new Group();
  flowerg = new Group();
  mushroomg = new Group();
  //edges = createEdgeSprite();
 
  ground.visible = true;

  stone_ground = createSprite(400,780,1800,80);
  stone_ground.addImage(ground_img);
  stone_ground.scale =4;
  stone_ground.velocityX = -4;
  stone_ground.x = stone_ground.width/2;
}

function draw() {
  background(background_Img); 
  
  mario.collide(ground);
  mario.collide(brickg);

  //console.log(stone_ground.x)
 if (gameState === PLAY){

  if (mario.isTouching(enemyg1)||mario.isTouching(enemyg2)&&mario.scale === 0.4){
    gameState = END;
    
   }
     
    
 
if (mario.isTouching(markg)){
  score += 5;
  markg.destroyEach();
}

if (mario.isTouching(flowerg)){
  gameState = END;
}
 if (score === 10){
   mushroom.visible = true;
   mushroom.velocityX = -6;
 }
 





 if (keyDown("UP_ARROW")){
   mario.velocityY = -12;
 }

 

 mario.velocityY = mario.velocityY+0.5;

 if (stone_ground.x<0){
   stone_ground.x = stone_ground.width/2;
 }
  spawnObstacles();
  spawnObstacles1();
  spawnBricks();
  spawnFlowers();


  switch(score){
    case 10 : mario.scale = 0.5;
      break;
       case 20 : mario.scale = 0.6;
      break;
       case 30 : mario.scale = 0.7;
      break;
       case 40 : mario.scale = 0.8;
      break;
       case 50 : mario.scale = 0.9;
      break;
     default : break;
      
  }
}

if (mario.isTouching(enemyg1)||mario.isTouching(enemyg2)&&mario.scale > 0.4){
  enemyg1.destroyEach();
  enemyg2.destroyEach();
     mario.scale = 0.4;
     score = score - 5;
     gameState = PLAY;
   }

if (gameState === END){
mario.velocityY = 0;
stone_ground.velocityX = 0;
enemyg1.setVelocityXEach(0);
enemyg1.setLifetimeEach(-1);
enemyg2.setVelocityXEach(0);
enemyg2.setLifetimeEach(-1);
markg.setVelocityXEach(0);
markg.setLifetimeEach(-1);
brickg.setVelocityXEach(0);
brickg.setLifetimeEach(-1);
flowerg.setVelocityXEach(0);
flowerg.setLifetimeEach(-1);
mario.changeAnimation("stopping",mario_img1);
restart.visible = true;
gameOver.visible = true;



}

  drawSprites();
  textSize(15);
  fill("black");
  text("Score: "+score,50,300);

}

function spawnObstacles(){
  if (frameCount%200 === 0){
  var enemy = createSprite(1000,685,20,20);
  enemy.addAnimation("enemy",obstacle);
  enemy.velocityX = -6;
  enemy.scale = 0.2;
  enemyg1.add(enemy);

  enemy.lifetime = 250;
  }
}

function spawnObstacles1(){
  if (frameCount%210 === 0){
  var enemy = createSprite(1000,685,20,20);
  enemy.addAnimation("enemy",obstacle);
  enemy.velocityX = -7;
  enemy.scale = 0.2;
  enemyg2.add(enemy);

  enemy.lifetime = 250;
  }
}

function spawnBricks(){
  if (frameCount%300 === 0){
    var brick = createSprite(1000,500,20,20);
    var mark = createSprite(1020,500,20,20);
    brick.y = Math.round(random(400,500));
    mark.y = brick.y;
    brick.addImage(brick_img);
    mark.addImage(brick1_img);
    mark.velocityX = -6;
    brick.velocityX = -6;
    brick.scale = 0.8;
    mark.scale = 0.8;
    mark.lifetime = 250;
    brickg.add(brick);

    markg.add(mark);
  brick.depth = gameOver.depth;
  mark.depth = gameOver.depth;
  gameOver.depth = gameOver.depth+1;

    brick.lifetime = 250;
  }
}

function spawnFlowers(){
  if (frameCount%500 === 0){
    var flower = createSprite(1000,675,20,20);
    flower.addAnimation("flower",flower_img);
    flower.velocityX = -6;
    flower.scale = 0.8;
    flowerg.add(flower);
  
    flower.lifetime = 250;
  }
}

function spawnMushroom(){
 
     mushroom = createSprite(1000,675,20,20);
    mushroom.addAnimation("mushroom",mushroom_img);
    mushroom.velocityX = -6;
    mushroom.scale = 0.8;
   // mushroomg.add(mushroom);
  
    mushroom.lifetime = 250;
  
}



