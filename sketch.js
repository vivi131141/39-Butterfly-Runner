var gameState = "start";
var energy = 0;
var distance = 3000;

function preload(){
  
  butterflyImg = loadAnimation ("butterfly2.png","butterfly5.png","butterfly3.png");
  plant1Img = loadImage("plant1.png");
  plant2Img = loadImage("plant2.gif");
  plant3Img = loadImage("plant3.png");
  web1Img = loadImage("web1.png");
  web2Img = loadImage("web2.png");
  bird1Img = loadImage("bird1.png");
  bird2Img = loadImage("bird2.png");
  bird3Img = loadImage("bird3.png");
  finishLineImg = loadImage("finishLine.png");
}

function setup () {
  createCanvas(displayWidth,displayHeight);
  
  butterfly = createSprite(300,200);
  butterfly.addAnimation("butterflyImg",butterflyImg);

  finishLine = createSprite();
  finishLine.addImage(finishLineImg);
  
  obstaclesGroup = createGroup();
  plantsGroup = createGroup();
}

function draw () {

  background ("plum");
  
  if(gameState === "start"){

    finishLine.visible = false;

    textSize(35);
    stroke("purple");
    strokeWeight(3);
    textFont("georgia");
    fill("white");
    text("Butterfly Runner",600,50);
    
    textSize(20);
    strokeWeight(1);
    fill("purple");
    text("Imagine you are a butterfly who must travel south for the winter.",450,90);
    text("Butterflies face many dangers in their 3,000-mile journey.",450,120);
    text("Predators, such as birds & spiders, are always hunting for prey.",450,150);
    text("Butterflies require nectar from plants and they are their energy source.",450,180);
    text("In this game, as a butterfly, you must fly south for the winter.",450,210);
    text("Use the arrow keys to move up, down, left, and right respectively.",450,240);
    text("Be careful! It's dangerous out there. You never know what's coming.",450,270);
    
    textSize(25);
    fill(255);
    strokeWeight(3);
    text("Press the Space bar to begin! Have fun! Good luck!",500,320)
    
    if(keyDown("space"))
        gameState = "play"

  }
  
  if(gameState === "play"){

    drawSprites();

    spawnObstacles();
    spawnPlants();
    
    camera.position.x = butterfly.x;
    camera.position.y = butterfly.y;
    
    if(keyDown(UP_ARROW)){
        butterfly.y = butterfly.y-15;
    } else if(keyDown(DOWN_ARROW)){
        butterfly.y = butterfly.y+15;
    } else if(keyDown(RIGHT_ARROW)){
        butterfly.x = butterfly.x+10;
        distance--;
    } else if(keyDown(LEFT_ARROW)){
        butterfly.x = butterfly.x-10;
        distance++;
    }
    
    if(obstaclesGroup.isTouching(butterfly))
      gameState = "end";
    
    if(distance <= 0)
      gameState = "win";

    if(plantsGroup.isTouching(butterfly)){
      for (var i=0; i<plantsGroup.length; i++){
        if(plantsGroup.get(i).isTouching(butterfly)){
          plantsGroup.get(i).remove();
          energy++;
        }
      }
    }

    if(distance <= 100){
      finishLine.visible = true;
      finishLine.x = displayWidth;
      finishLine.y = butterfly.y;
    }

    textSize(20);
    stroke("black");
    strokeWeight(1);
    textFont("georgia");
    fill("black");
    text("Energy Level: " + energy,butterfly.x-200,butterfly.y+15);
    text("Miles Left: " + distance,butterfly.x-200,butterfly.y-15);
    
  }

  if(gameState === "win"){

    finishLine.visible = false;

    if(keyDown("space")){
      gameState  = "play";
      energy = 0;
      distance = 3000;
    }

    plantsGroup.destroyEach();
    obstaclesGroup.destroyEach();

    textSize(70);
    stroke("blue");
    strokeWeight(3);
    textFont("georgia");
    fill("white");
    text("You Made It!",butterfly.x-200,butterfly.y);

    textSize(30);
    strokeWeight(1);
    fill("blue");
    text("Your energy level was "+energy+".",butterfly.x-175,butterfly.y+50);
    text("You traveled 3,000 miles to Mexico!",butterfly.x-250,butterfly.y+100);
    text("Press the space bar to play again!",butterfly.x-225,butterfly.y+150);

  }
  
  if(gameState === "end"){

      finishLine.visible = false;
      
      if(keyDown("space")){
        gameState  = "play";
        energy = 0;
        distance = 3000;
      }
    
      plantsGroup.destroyEach();
      obstaclesGroup.destroyEach();
    
      textSize(70);
      stroke("blue");
      strokeWeight(3);
      textFont("georgia");
      fill("white");
      text("Game Over!",butterfly.x-200,butterfly.y);
    
      textSize(30);
      strokeWeight(1);
      fill("blue");
      text("Your energy level was "+energy+".",butterfly.x-175,butterfly.y+50);
      text("You had "+distance+" miles left!",butterfly.x-175,butterfly.y+100);
      text("Press the space bar to play again!",butterfly.x-225,butterfly.y+150);

  }
  
}

function spawnObstacles(){
  
  if(frameCount % 30 === 0){
    
    obstacle = createSprite(butterfly.x+800,random(butterfly.y+250,butterfly.y-250),10,10);
    
    var rand = Math.round(random(1,5));

    if(rand === 1) {
      obstacle.addImage("web1Img",web1Img);
    } else if(rand === 2){
      obstacle.addImage("web2Img",web2Img);
    } else if (rand === 3){
      obstacle.addImage("bird1Img",bird1Img);
      obstacle.velocityX = random(-20,-10);
    } else if (rand === 4){
      obstacle.addImage("bird2Img",bird2Img);
      obstacle.velocityX = random(-20,-10);
    } else if (rand === 5){
      obstacle.addImage("bird3Img",bird3Img);
      obstacle.velocityX = random(-20,-10);
    }
      
    obstacle.lifetime = 2000;
    obstacle.scale = random(0.1,0.2);
    obstaclesGroup.add(obstacle);
    
  }
}

function spawnPlants(){
  
  if(frameCount % 30 === 0){
    
    plant = createSprite(butterfly.x+800,random(butterfly.y+250,butterfly.y-250),10,10);
    
    var rand2 = Math.round(random(1,3));
    
    if(rand2 === 1){
      plant.addImage("plant1Img",plant1Img);
    } else if (rand2 === 2){
      plant.addImage("plant2Img",plant2Img);
    } else if (rand2 === 3){
      plant.addImage("plant3Img",plant3Img);
    }
    
    plant.scale = random(0.15,0.3);
    plant.lifetime = 2000;
    plantsGroup.add(plant);
    
  }
  
}
