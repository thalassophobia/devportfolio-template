var app = new PIXI.Application(800, 600, {backgroundColor: 0x000000});
document.body.appendChild(app.view);

app.stage.interactive = true;

var squareHole = new PIXI.Graphics();

var circleHole = new PIXI.Graphics();

var starHole = new PIXI.Graphics();

var rectWidth = 100;
var rectHeight = 100;
var circleRadius = 50;

var starTexture = PIXI.Texture.fromImage('resources/images/star3.png');
var backgroundTexture = PIXI.Texture.fromImage('resources/images/shapes_background.png');
var backgroundSprite = new PIXI.Sprite(backgroundTexture);

var starSprite = new PIXI.Sprite(starTexture);


var boxContainer = new PIXI.Container();
var starContainer = new PIXI.Container();
var ballContainer = new PIXI.Container();

starSprite.scale.x = .2;
starSprite.scale.y = .2;
starSprite.x = 90;
starSprite.y = 450;


var squareContainerXPos = 500;
var squareContainerYPos = 100;
var circleContainerXPos = 550;
var circleContainerYPos = 300;
var snapRange = 30;

function drawSquareContainer(x, y) {
    squareHole.lineStyle(2, 0x0000FF, 1);
    squareHole.drawRect(x, y, rectWidth + 3, rectHeight + 3);
}

function drawCircleContainer(x, y) {
    circleHole.lineStyle(2, 0xFF0000, 1);
    circleHole.drawCircle(x, y, circleRadius + 2)
}

function drawStarContainer() {
    starHole.lineStyle(2, 0xFFFF00, 1);
    starHole.moveTo(550, 100);
    starHole.lineTo(570, 150);
    starHole.lineTo(630, 155);
    starHole.lineTo(585, 195);
    starHole.lineTo(600, 250);
    starHole.lineTo(550, 220);
    starHole.lineTo(500, 250);
    starHole.lineTo(515, 195);
    starHole.lineTo(470, 155);
    starHole.lineTo(530, 150);
    starHole.lineTo(550, 100);
}

var boxSprite;
//Draws a dragable square
function drawSquare() {
    var boxTexture = PIXI.Texture.fromImage('resources/images/RTS_Crate.png');
    boxSprite = new PIXI.Sprite(boxTexture);

    boxSprite.anchor.set(-1);
    boxSprite.scale.set(.2);

    boxSprite.interactive = true;
    boxSprite.buttonMode = true;

    //pointer events for touch AND mouse
    boxSprite
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onRectDragMove);
}

var tennisBallSprite;
//Draws a dragable circle
function drawCircle() {
    var tennisBallTexture = PIXI.Texture.fromImage('resources/images/tennisball512.png');
    tennisBallSprite = new PIXI.Sprite(tennisBallTexture);

    tennisBallSprite.scale.set(.2);
    tennisBallSprite.anchor.set(.1);
    tennisBallSprite.x = 100;
    tennisBallSprite.y = 300;

    tennisBallSprite.interactive = true;
    tennisBallSprite.buttonMode = true;

    //pointer events for touch AND mouse
    tennisBallSprite
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onCircleDragMove);
}

function drawStar() {
    star.moveTo(0, 0);
    star.lineStyle(0);
    star.beginFill(0x00FF00, 1);

    star.moveTo(550, 100);
    star.lineTo(570, 150);
    star.lineTo(630, 155);
    star.lineTo(585, 195);
    star.lineTo(600, 250);
    star.lineTo(550, 220);
    star.lineTo(500, 250);
    star.lineTo(515, 195);
    star.lineTo(470, 155);
    star.lineTo(530, 150);
    star.endFill();

    star.interactive = true;
    star.buttonMode = true;

    //pointer events for touch AND mouse
    star
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onStarDragMove);
}

drawCircle();
drawSquare();

drawSquareContainer(squareContainerXPos, squareContainerYPos);
drawCircleContainer(circleContainerXPos, circleContainerYPos);
starHole.position.x = 0;
starHole.position.y = 300;
drawStarContainer();

app.stage.addChild(backgroundSprite);
app.stage.addChild(starSprite);
app.stage.addChild(tennisBallSprite);
app.stage.addChild(boxSprite);
app.stage.addChild(squareHole);
app.stage.addChild(circleHole);
app.stage.addChild(starHole);

function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function onRectDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x - rectWidth * 1.5;
        this.y = newPosition.y - rectHeight * 1.5;

        if (this.position.x >= squareContainerXPos - snapRange - rectWidth
        && this.position.x <= squareContainerXPos + snapRange - rectWidth
        && this.position.y <= squareContainerYPos + snapRange - rectHeight
        && this.position.y >= squareContainerYPos - snapRange - rectHeight) {
            this.x = squareContainerXPos - rectWidth;
            this.y = squareContainerYPos - rectHeight;
            this.interactive = false;
            this.alpha = 1;
        }
    }
}

function onCircleDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x - circleRadius * 3;
        this.y = newPosition.y - circleRadius * 6;

        if (this.position.x >= circleContainerXPos - snapRange - circleRadius
        && this.position.x <= circleContainerXPos + snapRange - circleRadius
        && this.position.y <= circleContainerYPos + snapRange - circleRadius
        && this.position.y >= circleContainerYPos - snapRange - circleRadius) {
            console.log("In bounds\n");
            this.x = circleContainerXPos - circleRadius;
            this.y = circleContainerYPos - circleRadius;
            this.interactive = false;
        }
    }
}

function onStarDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x - 550;
        this.y = newPosition.y - 185;
    }
}

animate();

function animate() {
    requestAnimationFrame(animate);
}
