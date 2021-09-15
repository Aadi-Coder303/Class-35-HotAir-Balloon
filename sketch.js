var balloon,balloonImage1,balloonImage2;
var database;
var position;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");
  }

//Function to set initial environment
function setup() {

  database = firebase.database();
  console.log(database);

  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readHeight, showError);



  textSize(20); 
}

// function to display UI
function draw() 
{
  background(bg);
  console.log(position);
  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

 function updateHeight(x,y){
   database.ref('balloon/position').set({
     'x': position.x + x ,
     'y': position.y + y
   })
 }


//CHOOSE THE CORRECT READHEIGHT FUNCTION
// function readHeight(data){
//   position.x = height.x;
//   position.y = height.y;
// }

 function readHeight(data){
  position = data.val();
   balloon.x = position.x;
   balloon.y = position.y;
 }

// function readHeight(data){
//   height = data.val();
// }

// function readHeight(){
//   height = val();
//   balloon.x = height.x;
//   balloon.y = height.y;
// }

function showError(){
  console.log("Error in writing to the database");
}