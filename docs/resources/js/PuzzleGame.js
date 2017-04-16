//set up stage
var screenWidth = 800;
var screenHeight = 800;
var app=new PIXI.Application(screenWidth,screenHeight,{antialias: true, backgroundColor:0x000000});
document.body.appendChild(app.view);

//variables used to scale puzzle pieces and their positions
var scale = 0.4;
var square1 = new PIXI.Graphics();
var sqrWidth = 495*scale;
var sqrHeight = 577*scale;

var win = false;

//set up sound effects
var TaDa = new Howl({
  src: ["resources/sounds/Ta Da.mp3"]
});
 var Blop = new Howl({
   src: ["resources/sounds/Blop.mp3"]
 });

//Create all textures and sprites
var puzzleBackgroundTexture = PIXI.Texture.fromImage("resources/images/Cork Board.jpg");
var puzzleBackground = new PIXI.Sprite(puzzleBackgroundTexture);
  
puzzleBackground.scale.set(0.135);
puzzleBackground.x = 336;
puzzleBackground.y = 21;

var sunRay1 = PIXI.Texture.fromImage("resources/images/Sun Ray6.png");
var sunRay = new PIXI.Sprite(sunRay1);

sunRay.anchor.x = 0.5;
sunRay.anchor.y = 0.5;
sunRay.scale.set(0.65);
sunRay.alpha = 0;
sunRay.x = 400;
sunRay.y = 400;

var backgroundTexture = PIXI.Texture.fromImage("resources/images/Background.jpg");
var background = new PIXI.Sprite(backgroundTexture);

var puzzleTexture1=PIXI.Texture.fromImage("resources/images/p1.png");
var puzzleTexture2=PIXI.Texture.fromImage("resources/images/p2.png");
var puzzleTexture3=PIXI.Texture.fromImage("resources/images/p3.png");
var puzzleTexture4=PIXI.Texture.fromImage("resources/images/p4.png");

var puzzlePiece1 = new PIXI.Sprite(puzzleTexture1);
var puzzlePiece2 = new PIXI.Sprite(puzzleTexture2);
var puzzlePiece3 = new PIXI.Sprite(puzzleTexture3);
var puzzlePiece4 = new PIXI.Sprite(puzzleTexture4);

//add sprites to stage
app.stage.addChild(background);
app.stage.addChild(puzzleBackground);
app.stage.addChild(sunRay);

createPuzzleBackground();

//Variables used for random inital puzzlepiece positions
var numArr = [0,1,2,3];
var counter = 0;

piece1 = createInteractivePuzzlePiece(puzzleTexture1, 1);
piece2 = createInteractivePuzzlePiece(puzzleTexture2, 2);
piece3 = createInteractivePuzzlePiece(puzzleTexture3, 3);
piece4 = createInteractivePuzzlePiece(puzzleTexture4, 4);

//Randomly places puzzle pieces in one of four starting positions
function createInteractivePuzzlePiece(texture, num){

    var rand = randomInt(0, 4-counter);
    var puzzlePiece = new PIXI.Sprite(texture);

    puzzlePiece.interactive=true;
    puzzlePiece.buttonMode=true;
    puzzlePiece.anchor.x = 0.5;
    puzzlePiece.anchor.y = 0.5;
    puzzlePiece.scale.set(scale);
    puzzlePiece.on('pointerdown',onDragStart).on('pointerup',onDragEnd).on('pointerupoutside',onDragEnd).on('pointermove',onDragMove);

    if (numArr[rand] < 2) {
      if (num == 2){
        puzzlePiece.x = 45 + sqrWidth/2 + (sqrHeight - sqrWidth)/2 - 85*scale;
        puzzlePiece.y = (screenHeight - 2*sqrHeight)/3 * (1 + numArr[rand]) + (numArr[rand] * sqrHeight * 2/3) - 70 + sqrHeight/2;
      } else if (num == 3){
        puzzlePiece.x = 45 + sqrWidth/2 + (sqrHeight - sqrWidth)/2;
        puzzlePiece.y = (screenHeight - 2*sqrHeight)/3 * (1 + numArr[rand]) + (numArr[rand] * sqrHeight * 2/3) - 70 + sqrHeight/2;
      } else{
        puzzlePiece.x = 45 + sqrWidth/2;
        puzzlePiece.y = (screenHeight - 2*sqrHeight)/3 * (1 + numArr[rand]) + (numArr[rand] * sqrHeight * 2/3) - 70 + sqrHeight/2;
      }
    } else {
      if (num == 1) {
        puzzlePiece.x = (screenWidth - 2*sqrWidth)/3 * (1 + (numArr[rand]-2)) + (numArr[rand]-2) * sqrWidth * 2/3 + 130;
        puzzlePiece.y = screenHeight - sqrHeight/2 - 45;
      } else if (num == 4) {
        puzzlePiece.x = (screenWidth - 2*sqrWidth)/3 * (1 + (numArr[rand]-2)) + (numArr[rand]-2) * sqrWidth * 2/3 + 130;
        puzzlePiece.y = screenHeight - sqrHeight/2  - 45;
      } else {
        puzzlePiece.x = (screenWidth - 2*sqrWidth)/3 * (1 + (numArr[rand]-2)) + (numArr[rand]-2) * sqrWidth * 2/3 + 130;
        puzzlePiece.y = screenHeight - sqrWidth/2 - 45;
      }
    }
    app.stage.addChild(puzzlePiece);
    numArr.splice(rand,1);
    counter++;
    return puzzlePiece;
}

//Creates transparent puzzle pieces on puzzle board.
//Positions of transparent puzzle piece are used for snapping.
function createPuzzleBackground(){
    
    puzzlePiece1.scale.set(scale);
    puzzlePiece2.scale.set(scale);
    puzzlePiece3.scale.set(scale);
    puzzlePiece4.scale.set(scale);

    puzzlePiece1.anchor.x = 0.5;
    puzzlePiece1.anchor.y = 0.5;
    puzzlePiece2.anchor.x = 0.5;
    puzzlePiece2.anchor.y = 0.5;
    puzzlePiece3.anchor.x = 0.5;
    puzzlePiece3.anchor.y = 0.5;
    puzzlePiece4.anchor.x = 0.5;
    puzzlePiece4.anchor.y = 0.5;

    puzzlePiece1.alpha = 0;
    puzzlePiece2.alpha = 0;
    puzzlePiece3.alpha = 0;
    puzzlePiece4.alpha = 0;

    puzzlePiece1.x= 350 + 18 + sqrWidth/2;
    puzzlePiece1.y= (screenHeight-2*sqrHeight)/2;
    puzzlePiece2.x= 350 + sqrWidth *3/2;
    puzzlePiece2.y= (screenHeight-2*sqrHeight)/2-16;
    puzzlePiece3.x= 350 + 35  + sqrWidth/2;
    puzzlePiece3.y= (screenHeight-sqrHeight*2)/2 + sqrHeight - 52;
    puzzlePiece4.x= 350 + sqrWidth*3/2 + 16;
    puzzlePiece4.y= (screenHeight-sqrHeight*2)/2 + sqrHeight - 69;

    app.stage.addChild(puzzlePiece1);
    app.stage.addChild(puzzlePiece2);
    app.stage.addChild(puzzlePiece3);
    app.stage.addChild(puzzlePiece4);

}

//When a puzzle piece is clicked and held
function onDragStart(event){
  this.data=event.data;
  this.alpha=0.5;
  this.dragging=true;
}

//When a puzzle piece is no longer being clicked and held
function onDragEnd(){
  this.alpha=1;
  this.dragging=false;
  this.data=null;
}

//Variable keeping track of whether a position on the puzzle board
//is occupied with a puzzle piece and which piece occupies each position.
var occupiedBy = [0, 0, 0, 0];

//x an y position range for which a puzzle piece will snap into position on puzzle board
var range = 30;

//Changes position of puzzle pieces being clicked and dragged.
//Snaps puzzle pieces into positions on puzzle board.
function onDragMove(){
    if(this.dragging && win == false){

      var newPosition=this.data.getLocalPosition(this.parent);

      if (newPosition.x < (puzzlePiece1.x + range) 
            && newPosition.x > (puzzlePiece1.x - range) 
            && newPosition.y < (puzzlePiece1.y + range) 
            && newPosition.y > (puzzlePiece1.y - range) 
            && (occupiedBy[0] == 0
            || ((this == piece1 && occupiedBy[0] == 1) || (this == piece2 && occupiedBy[0] == 2)
            || (this == piece3 && occupiedBy[0] == 3) || (this == piece4 && occupiedBy[0] == 4)))) {

        if (occupiedBy[0]==0){
          Blop.play();
        }

        if (this == piece1){
          occupiedBy[0] = 1;
        } else if (this == piece2){
          occupiedBy[0] = 2;
        } else if (this == piece3){
          occupiedBy[0] = 3;
        } else {
          occupiedBy[0] = 4;
        }

        if (this == piece1) {
          this.x = puzzlePiece1.x;
          this.y = puzzlePiece1.y;
        } else if (this == piece2) {
          this.x = puzzlePiece1.x - 85*scale/2;
          this.y = puzzlePiece1.y - 85*scale/2;
        } else if (this == piece3) {
          this.x = puzzlePiece1.x + 85*scale/2;
          this.y = puzzlePiece1.y - 85*scale/2;
        } else if (this == piece4){
          this.x = puzzlePiece1.x;
          this.y = puzzlePiece1.y - 85*scale;
        }
        


      } else if (newPosition.x < (puzzlePiece2.x + range) 
            && newPosition.x > (puzzlePiece2.x - range) 
            && newPosition.y < (puzzlePiece2.y + range) 
            && newPosition.y > (puzzlePiece2.y - range) 
            && (occupiedBy[1] == 0
            || ((this == piece1 && occupiedBy[1] == 1) || (this == piece2 && occupiedBy[1] == 2)
            || (this == piece3 && occupiedBy[1] == 3) || (this == piece4 && occupiedBy[1] == 4)))) {
        if (occupiedBy[1]==0){
          Blop.play();
        }

        if (this == piece1){
          occupiedBy[1] = 1;
        } else if (this == piece2){
          occupiedBy[1] = 2;
        } else if (this == piece3){
          occupiedBy[1] = 3;
        } else {
          occupiedBy[1] = 4;
        }

        if (this == piece1) {
          this.x = puzzlePiece2.x + 85*scale/2;
          this.y = puzzlePiece2.y + 85*scale/2;
        } else if (this == piece2) {
          this.x = puzzlePiece2.x;
          this.y = puzzlePiece2.y;
        } else if (this == piece3) {
          this.x = puzzlePiece2.x + 85*scale;
          this.y = puzzlePiece2.y;
        } else if (this == piece4){
          this.x = puzzlePiece2.x + 85*scale/2;
          this.y = puzzlePiece2.y - 85*scale/2;
        }


      } else if (newPosition.x < (puzzlePiece3.x + range) 
            && newPosition.x > (puzzlePiece3.x - range) 
            && newPosition.y < (puzzlePiece3.y + range) 
            && newPosition.y > (puzzlePiece3.y - range) 
            && (occupiedBy[2] == 0
            || ((this == piece1 && occupiedBy[2] == 1) || (this == piece2 && occupiedBy[2] == 2)
            || (this == piece3 && occupiedBy[2] == 3) || (this == piece4 && occupiedBy[2] == 4)))) {
        if (occupiedBy[2]==0){
          Blop.play();
        }

        if (this == piece1){
          occupiedBy[2] = 1;
        } else if (this == piece2){
          occupiedBy[2] = 2;
        } else if (this == piece3){
          occupiedBy[2] = 3;
        } else {
          occupiedBy[2] = 4;
        }

        if (this == piece1) {
          this.x = puzzlePiece3.x - 85*scale/2;
          this.y = puzzlePiece3.y + 85*scale/2;
        } else if (this == piece2) {
          this.x = puzzlePiece3.x - 85*scale;
          this.y = puzzlePiece3.y;
        } else if (this == piece3) {
          this.x = puzzlePiece3.x;
          this.y = puzzlePiece3.y;
        } else if (this == piece4){
          this.x = puzzlePiece3.x - 85*scale/2;
          this.y = puzzlePiece3.y - 85*scale/2;
        }



      } else if (newPosition.x < (puzzlePiece4.x + range) 
            && newPosition.x > (puzzlePiece4.x - range) 
            && newPosition.y < (puzzlePiece4.y + range) 
            && newPosition.y > (puzzlePiece4.y - range) 
            && (occupiedBy[3] == 0
            || ((this == piece1 && occupiedBy[3] == 1) || (this == piece2 && occupiedBy[3] == 2)
            || (this == piece3 && occupiedBy[3] == 3) || (this == piece4 && occupiedBy[3] == 4)))) {

        if (occupiedBy[3]==0){
          Blop.play();
        }

        if (this == piece1){
          occupiedBy[3] = 1;
        } else if (this == piece2){
          occupiedBy[3] = 2;
        } else if (this == piece3){
          occupiedBy[3] = 3;
        } else {
          occupiedBy[3] = 4;
        }

        if (this == piece1) {
          this.x = puzzlePiece4.x;
          this.y = puzzlePiece4.y + 85*scale;
        } else if (this == piece2) {
          this.x = puzzlePiece4.x - 85*scale/2;
          this.y = puzzlePiece4.y + 85*scale/2;
        } else if (this == piece3) {
          this.x = puzzlePiece4.x + 85*scale/2;
          this.y = puzzlePiece4.y + 85*scale/2;
        } else if (this == piece4){
          this.x = puzzlePiece4.x;
          this.y = puzzlePiece4.y;
        }


      } else {

        if (this == piece1 && occupiedBy.indexOf(1) > -1) {
          occupiedBy[occupiedBy.indexOf(1)] = 0;
        } else if (this == piece2 && occupiedBy.indexOf(2) > -1){
          occupiedBy[occupiedBy.indexOf(2)] = 0;
        } else if (this == piece3 && occupiedBy.indexOf(3) > -1){
          occupiedBy[occupiedBy.indexOf(3)] = 0;
        } else if (this == piece4 && occupiedBy.indexOf(4) > -1) {
          occupiedBy[occupiedBy.indexOf(4)] = 0;
        }

        if (newPosition.y < this.height/2){
           this.y = this.height/2;
        } else if (newPosition.y > screenHeight - this.height/2) {
          this.y = screenHeight - this.height/2;
        } else {
          this.y = newPosition.y;
        }

        if (newPosition.x < this.width/2){
          this.x = this.width/2;
        } else if (newPosition.x > (screenWidth-this.width/2)) {
         this.x = (screenWidth-this.width/2);
        } else {
            this.x=newPosition.x;
        }
      }

      if (occupiedBy[0] == 1 && occupiedBy[1] == 2 && occupiedBy[2] == 3 && occupiedBy[3] == 4) {

          this.alpha = 1;

          piece1.interactive = false;
          piece2.interactive = false;
          piece3.interactive = false;
          piece4.interactive = false;

          puzzlePiece1.alpha = 0;
          puzzlePiece2.alpha = 0;
          puzzlePiece3.alpha = 0;
          puzzlePiece4.alpha = 0;

          youWin();
      }
    }
  }


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var playTaDa = false;

function youWin(){

    requestAnimationFrame(youWin);
    if (piece1.x + piece1.width/2 > screenWidth/2) {
      puzzleBackground.x = puzzleBackground.x - 1.5;
      piece1.x = piece1.x - 1.5;
      piece2.x = piece2.x - 1.5;
      piece3.x = piece3.x - 1.5;
      piece4.x = piece4.x - 1.5;
    }
    if ((piece1.y + piece1.height/2 - 85*scale) < 1/2*screenHeight) {
      puzzleBackground.y = puzzleBackground.y + 1.4;
      piece1.y = piece1.y + 1.4;
      piece2.y = piece2.y + 1.4;
      piece3.y = piece3.y + 1.4;
      piece4.y = piece4.y + 1.4;
    }

    sunRay.rotation = sunRay.rotation + 0.02;
    
    if ((piece1.x + piece1.width/2 <= screenWidth/2) && ((piece1.y + piece1.height/2 - 85*scale) >= 1/2*screenHeight 
        && playTaDa == false)){
      sunRay.alpha = 0.9;
      playTaDa  = true;
      TaDa.play();
    }
}
