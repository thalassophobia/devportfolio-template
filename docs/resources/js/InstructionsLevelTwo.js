var WIDTH = 800;
var HEIGHT = 600;

var IMG_WIDTH = 100;
var IMG_HEIGHT = 100;

// Declare objects
var lemons, water, sugar, pitcher, spoon, lemonade, notepad, ice;

var targetObject = "lemons";
var objectList = ["lemons", "water", "sugar", "ice"];
var numCorrect = 0;

var shake = false;
var i = 200;
var forwards = true;

var moveLemonsBack = false;
var moveWaterBack = false;
var moveSugarBack = false;
var moveIceBack = false;
var lemonadeFadeIn = false;

var stepOne, stepTwo, stepThree, stepFour;

//store initial starting locations
var lemonsX = IMG_WIDTH / 4;
var waterX = IMG_WIDTH + 50;
var sugarX = IMG_WIDTH * 3;
var iceX = IMG_WIDTH + 100;

var lemonsY = HEIGHT - IMG_HEIGHT - 50;
var waterY = HEIGHT - IMG_HEIGHT - 90;
var sugarY = HEIGHT - IMG_HEIGHT - 50;
var iceY = HEIGHT - IMG_HEIGHT;

var misses = 0;

var startTime = new Date();

var stage = new PIXI.Container(),
    renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
document.body.appendChild(renderer.view);

//Use Pixi's built-in `loader` object to load an image
PIXI.loader
    .add([
        "resources/images/notepad.png",
        "resources/images/shelf.png",
        "resources/images/spoon.png",

        "resources/images/lemonade.png",
        "resources/images/lemons.png",
        "resources/images/lemonade_stand.png",
        "resources/images/outdoors_background.png",
        "resources/images/pitcher.png",
        "resources/images/sugar.png",
        "resources/images/water.png",
        "resources/images/ice.png"
    ])
    .load(setup);

//This `setup` function will run when the image has loaded
function setup() {

    addImages();

    addText();

    // Add last to ensure that they overlay everything
    stage.addChild(sugar);
    stage.addChild(water);
    stage.addChild(lemons);
    stage.addChild(ice);

    animate();
}

function addText() {
    var lemonadeText = new PIXI.Text("Lemonade", {
        fontFamily: 'Comic Sans MS',
        fontSize: 36,
        fill: 'steelblue',
        fontWeight: 'bold'
    });
    lemonadeText.anchor.set(0.5, 0.5);
    lemonadeText.position.set(notepad.width / 2, notepad.y + 30);

    //Randomize instructions
    swap(0, Math.floor(Math.random() * 4));
    swap(1, Math.floor(Math.random() * 3 + 1));
    swap(2, Math.floor(Math.random() * 2 + 2));

    targetObject = objectList[0];

    //Add first determined step
    stepOne = new PIXI.Text("1. " + objectList[0], {
        fontFamily: 'Comic Sans MS',
        fontSize: 24,
        fill: 'magenta'
    });
    stepOne.position.set(notepad.x + 50, lemonadeText.y + 20);

    var picOne = new PIXI.Sprite(
        PIXI.loader.resources["resources/images/" + objectList[0] + ".png"].texture
    );
    picOne.width = IMG_WIDTH / 3;
    picOne.height = IMG_HEIGHT / 3;
    picOne.position.set(stepOne.x + stepOne.width + 10, stepOne.y);
    stage.addChild(picOne);

    //Add second determined step
    stepTwo = new PIXI.Text("2. " + objectList[1], {
        fontFamily: 'Comic Sans MS',
        fontSize: 24,
        fill: 'magenta'
    });
    stepTwo.position.set(notepad.x + 50, stepOne.y + 70);

    var picTwo = new PIXI.Sprite(
        PIXI.loader.resources["resources/images/" + objectList[1] + ".png"].texture
    );
    picTwo.width = IMG_WIDTH / 3;
    picTwo.height = IMG_HEIGHT / 3;
    picTwo.position.set(stepTwo.x + stepTwo.width + 10, stepTwo.y);
    stage.addChild(picTwo);

    //Add third determined step
    stepThree = new PIXI.Text("3. " + objectList[2], {
        fontFamily: 'Comic Sans MS',
        fontSize: 24,
        fill: 'magenta'
    });
    stepThree.position.set(notepad.x + 50, stepTwo.y + 70);

    var picThree = new PIXI.Sprite(
        PIXI.loader.resources["resources/images/" + objectList[2] + ".png"].texture
    );
    picThree.width = IMG_WIDTH / 3;
    picThree.height = IMG_HEIGHT / 3;
    picThree.position.set(stepThree.x + stepThree.width + 10, stepThree.y);
    stage.addChild(picThree)

    //Add fourth determined step
    stepFour = new PIXI.Text("4. " + objectList[3], {
        fontFamily: 'Comic Sans MS',
        fontSize: 24,
        fill: 'magenta'
    });
    stepFour.position.set(notepad.x + 50, stepThree.y + 70);

    var picFour = new PIXI.Sprite(
        PIXI.loader.resources["resources/images/" + objectList[3] + ".png"].texture
    );
    picFour.width = IMG_WIDTH / 3;
    picFour.height = IMG_HEIGHT / 3;
    picFour.position.set(stepFour.x + stepFour.width + 10, stepFour.y);
    stage.addChild(picFour);

    stage.addChild(lemonadeText);
    stage.addChild(stepOne);
    stage.addChild(stepTwo);
    stage.addChild(stepThree);
    stage.addChild(stepFour);
}

function addImages() {
    
    //Create the `lemons` sprite from the texture
    lemons = new PIXI.Sprite(
        PIXI.loader.resources["resources/images/lemons.png"].texture
    );

    //Change the sprite's position
    lemons.position.set(lemonsX, lemonsY);
    lemons.width = IMG_WIDTH;
    lemons.height = IMG_HEIGHT;

    lemons.interactive = true;
    lemons.buttonMode = true;

    //pointer events for touch AND mouse
    lemons
        .on('pointerdown', onDragStart)
        .on('pointerup', onLemonsDragEnd)
        .on('pointerupoutside', onLemonsDragEnd)
        .on('pointermove', onDragMove);


    water = new PIXI.Sprite(
        PIXI.loader.resources["resources/images/water.png"].texture
    );

    water.position.set(waterX, waterY);
    water.width = IMG_WIDTH;
    water.height = IMG_HEIGHT;

    water.interactive = true;
    water.buttonMode = true;

    //pointer events for touch AND mouse
    water
        .on('pointerdown', onDragStart)
        .on('pointerup', onWaterDragEnd)
        .on('pointerupoutside', onWaterDragEnd)
        .on('pointermove', onDragMove);


    sugar = new PIXI.Sprite(
        PIXI.loader.resources["resources/images/sugar.png"].texture
    );

    sugar.position.set(sugarX, sugarY);
    sugar.width = IMG_WIDTH;
    sugar.height = IMG_HEIGHT;

    sugar.interactive = true;
    sugar.buttonMode = true;

    //pointer events for touch AND mouse
    sugar
        .on('pointerdown', onDragStart)
        .on('pointerup', onSugarDragEnd)
        .on('pointerupoutside', onSugarDragEnd)
        .on('pointermove', onDragMove);

    ice = new PIXI.Sprite(
        PIXI.loader.resources["resources/images/ice.png"].texture
    );

    ice.position.set(iceX, iceY);
    ice.width = IMG_WIDTH;
    ice.height = IMG_HEIGHT;

    ice.interactive = true;
    ice.buttonMode = true;

    //pointer events for touch AND mouse
    ice
        .on('pointerdown', onDragStart)
        .on('pointerup', onIceDragEnd)
        .on('pointerupoutside', onIceDragEnd)
        .on('pointermove', onDragMove);

    pitcher = new PIXI.Sprite(
        PIXI.loader.resources["resources/images/pitcher.png"].texture
    );

    pitcher.anchor.x = 0.5;
    pitcher.anchor.y = 0.5;
    pitcher.position.set(WIDTH * 2 / 3 + 60, HEIGHT - IMG_HEIGHT * 4 + 70);
    pitcher.width = IMG_WIDTH * 2;
    pitcher.height = IMG_HEIGHT * 2;


    spoon = new PIXI.Sprite(
        PIXI.loader.resources["resources/images/spoon.png"].texture
    );

    spoon.position.set(pitcher.x, pitcher.y - IMG_HEIGHT + 17);
    spoon.width = IMG_WIDTH;
    spoon.height = IMG_HEIGHT;
    spoon.visible = false;

    lemonade = new PIXI.Sprite(
        PIXI.loader.resources["resources/images/lemonade.png"].texture
    );

    lemonade.position.set(WIDTH / 2 + IMG_WIDTH + 20, HEIGHT - IMG_HEIGHT * 4);
    lemonade.width = IMG_WIDTH * 2;
    lemonade.height = IMG_HEIGHT * 2;
    lemonade.visible = false;

    notepad = new PIXI.Sprite(
        PIXI.loader.resources["resources/images/notepad.png"].texture
    );

    notepad.position.set(10, 10);
    notepad.width = IMG_WIDTH * 3;
    notepad.height = IMG_HEIGHT * 4;


    var recipePic = new PIXI.Sprite(
        PIXI.loader.resources["resources/images/lemonade.png"].texture
    );

    recipePic.anchor.set(0.5, 0.5);
    recipePic.position.set(notepad.x + notepad.width - 55, notepad.height - 50);
    recipePic.width = IMG_WIDTH;
    recipePic.height = IMG_HEIGHT;

    /*
    var shelf = new PIXI.Sprite(
        PIXI.loader.resources["resources/images/shelf.png"].texture
    );

    shelf.position.set(WIDTH / 2 - 150, HEIGHT / 2 - 200);
    shelf.width = IMG_WIDTH * 6;
    shelf.height = IMG_HEIGHT;
    */

    var lemonade_stand = new PIXI.Sprite(
        PIXI.loader.resources["resources/images/lemonade_stand.png"].texture
    );

    lemonade_stand.position.set(WIDTH / 2, 0);
    lemonade_stand.width = WIDTH / 2;
    lemonade_stand.height = HEIGHT;

    var outdoors_background = new PIXI.Sprite(
        PIXI.loader.resources["resources/images/outdoors_background.png"].texture
    );

    outdoors_background.width = WIDTH;
    outdoors_background.height = HEIGHT;


    //Add sprites to the stage
    stage.addChild(outdoors_background);

    stage.addChild(lemonade_stand);

    stage.addChild(notepad);

    //stage.addChild(shelf);

    stage.addChild(pitcher);

    stage.addChild(spoon);

    stage.addChild(lemonade);

    stage.addChild(recipePic);
}

function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onLemonsDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;

    if (hitTestObjects(lemons, pitcher)) {
        if (targetObject == "lemons") {
            //switch object
            lemons.visible = false;
            numCorrect++;
            if (numCorrect >= objectList.length) {

                console.log("You made lemonade!");
                lemonadeFadeIn = true;
            } else {
                targetObject = objectList[numCorrect];
                //animate spoon
                shake = true;
                if (numCorrect == 1) {
                    stepOne.style.fill = '#15db19';
                } else if (numCorrect == 2) {
                    stepTwo.style.fill = '#15db19';
                } else {
                    stepThree.style.fill = '#15db19';
                }
            }
        } else {
            //hit the pitcher, but was not the right object
            misses++;
            moveLemonsBack = true;
        }
    }
}

function onWaterDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;

    if (hitTestObjects(water, pitcher)) {
        if (targetObject == "water") {
            //animate success
            //switch object
            water.visible = false;
            numCorrect++;
            if (numCorrect >= objectList.length) {
                console.log("You made lemonade!");
                //make lemonade appear
                lemonadeFadeIn = true;
            } else {
                targetObject = objectList[numCorrect];
                shake = true;
                if (numCorrect == 1) {
                    stepOne.style.fill = '#15db19';
                } else if (numCorrect == 2) {
                    stepTwo.style.fill = '#15db19';
                } else {
                    stepThree.style.fill = '#15db19';
                }
            }
        } else {
            misses++;
            moveWaterBack = true;
        }
    }
}

function onSugarDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;

    if (hitTestObjects(sugar, pitcher)) {
        if (targetObject == "sugar") {
            //animate success
            //switch object
            sugar.visible = false;
            numCorrect++;
            if (numCorrect >= objectList.length) {
                console.log("You made lemonade!");
                lemonadeFadeIn = true;
            } else {
                targetObject = objectList[numCorrect];
                shake = true;
                if (numCorrect == 1) {
                    stepOne.style.fill = '#15db19';
                } else if (numCorrect == 2) {
                    stepTwo.style.fill = '#15db19';
                } else {
                    stepThree.style.fill = '#15db19';
                }
            }
        } else {
            misses++;
            moveSugarBack = true;
        }
    }
}

function onIceDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;

    if (hitTestObjects(ice, pitcher)) {
        if (targetObject == "ice") {
            //animate success
            //switch object
            ice.visible = false;
            numCorrect++;
            if (numCorrect >= objectList.length) {
                console.log("You made lemonade!");
                lemonadeFadeIn = true;
            } else {
                targetObject = objectList[numCorrect];
                shake = true;
                if (numCorrect == 1) {
                    stepOne.style.fill = '#15db19';
                } else if (numCorrect == 2) {
                    stepTwo.style.fill = '#15db19';
                } else {
                    stepThree.style.fill = '#15db19';
                }
            }
        } else {
            misses++;
            moveIceBack = true;
        }
    }
}

function onDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x - IMG_WIDTH / 2;
        this.y = newPosition.y - IMG_HEIGHT / 2;
    }
}

function animate() {
    requestAnimationFrame(animate);

    if (shake) {
        if (i > 0) {
            if (forwards) {
                pitcher.rotation += .1;
                if (pitcher.rotation >= 2) {
                    forwards = false;
                    pitcher.rotation = 2;
                }
            } else {
                pitcher.rotation -= .1;
                if (pitcher.rotation <= -2) {
                    forwards = true;
                    pitcher.rotation = -2;
                }
            }
            i--;
        } else {
            spoon.visible = false;
            shake = false;
            i = 200;
        }
    }

    if (moveWaterBack) {
        var done = false;
        if (water.x + 5 <= waterX) {
            water.x += 5;
        } else if (water.x - 5 >= waterX) {
            water.x -= 5;
        } else {
            water.x = waterX
            done = true;
        }

        if (water.y + 5 <= waterY) {
            water.y += 5;
            done = false;
        } else if (water.y - 5 >= waterY) {
            water.y -= 5;
            done = false;
        } else {
            water.y = waterY;
            done &= true;
        }

        if (done) {
            moveWaterBack = false;
        }
    }

    if (moveLemonsBack) {
        var done = false;
        if (lemons.x + 5 <= lemonsX) {
            lemons.x += 5;
        } else if (lemons.x - 5 >= lemonsX) {
            lemons.x -= 5;
        } else {
            lemons.x = lemonsX
            done = true;
        }

        if (lemons.y + 5 <= lemonsY) {
            lemons.y += 5;
            done = false;
        } else if (lemons.y - 5 >= lemonsY) {
            lemons.y -= 5;
            done = false;
        } else {
            lemons.y = lemonsY;
            done &= true;
        }

        if (done) {
            moveLemonsBack = false;
        }
    }

    if (moveSugarBack) {
        var done = false;
        if (sugar.x + 5 <= sugarX) {
            sugar.x += 5;
        } else if (sugar.x - 5 >= sugarX) {
            sugar.x -= 5;
        } else {
            sugar.x = sugarX
            done = true;
        }

        if (sugar.y + 5 <= sugarY) {
            sugar.y += 5;
            done = false;
        } else if (sugar.y - 5 >= sugarY) {
            sugar.y -= 5;
            done = false;
        } else {
            sugar.y = sugarY;
            done &= true;
        }

        if (done) {
            moveSugarBack = false;
        }
    }

    if (moveIceBack) {
        var done = false;
        if (ice.x + 5 <= iceX) {
            ice.x += 5;
        } else if (ice.x - 5 >= iceX) {
            ice.x -= 5;
        } else {
            ice.x = iceX;
            done = true;
        }

        if (ice.y + 5 <= iceY - 10) {
            ice.y += 5;
            done = false;
        } else if (ice.y - 5 >= iceY - 10) {
            ice.y -= 5;
            done = false;
        } else {
            ice.y = iceY - 10;
            done &= true;
        }

        if (done) {
            moveIceBack = false;
        }
    }

    //Signals completion of the game
    if (lemonadeFadeIn) {
        if (!lemonade.visible) {
            stepFour.style.fill = '#15db19';
            lemonade.visible = true;
            shake = false;
            spoon.visible = false;
            lemonade.alpha = 0.025;

            var endTime = new Date();

            var timeDiff = endTime - startTime;
            //Take off miliseconds
            timeDiff /= 1000;

            var seconds = Math.round(timeDiff % 60);
            timeDiff = Math.floor(timeDiff / 60);
            var minutes = Math.round(timeDiff % 60);

            var timeText = new PIXI.Text("Total Time: " + minutes + " min " + seconds + " sec", {
                fontFamily: 'Comic Sans MS',
                fontSize: 20,
                fontWeight: 'bold'
            });
            timeText.x = WIDTH - timeText.width;
            timeText.y = HEIGHT - timeText.height * 2;

            stage.addChild(timeText);

            //Add num misses to bottom
            var missesText = new PIXI.Text("Misses: " + misses, {
                fontFamily: 'Comic Sans MS',
                fontSize: 20,
                fontWeight: 'bold'
            });
            missesText.x = WIDTH - missesText.width;
            missesText.y = HEIGHT - missesText.height;

            stage.addChild(missesText);
        } else {
            lemonade.alpha += 0.025;
        }
        pitcher.alpha -= 0.05;
    }

    //Render the stage   
    renderer.render(stage);
}

function hitTestObjects(r1, r2) {

    //Define the variables we'll need to calculate
    var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x;
    r2.centerY = r2.y;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {

        //A collision might be occuring. Check for a collision on the y axis
        if (Math.abs(vy) < combinedHalfHeights) {

            //There's definitely a collision happening
            hit = true;
        } else {

            //There's no collision on the y axis
            hit = false;
        }
    } else {

        //There's no collision on the x axis
        hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
};

function swap(i, j) {
    var temp = objectList[i];
    objectList[i] = objectList[j];
    objectList[j] = temp;
}