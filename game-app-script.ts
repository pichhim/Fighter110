import {
    Sprite,
    Application,
    Container,
    Rectangle,
    Graphics,
    DisplayObject,
    Text,
    RENDERER_TYPE,
} from "pixi.js";

import * as pixiSound from "pixi.js";

const app: Application = new Application(1500, 700);
document.body.appendChild(app.view);

let background: Sprite = Sprite.fromImage("./new.jpg");
app.stage.addChild(background);

PIXI.loader.add("kofmusic", "KOF Background Music (1).mp3");
PIXI.loader.add("bonk", "bonk.mp3");
PIXI.loader.add("chomp", "chomp.mp3");

let controls: Sprite = Sprite.fromImage("Fighter110.png");
controls.scale.x = .8;
controls.scale.y = .8;
controls.x = 400;
controls.y = 200;
app.stage.addChild(controls);

let deney: Sprite = Sprite.fromImage("./Kris.png");
deney.scale.x = 0.22;
deney.scale.y = 0.22;
deney.x = 80;
deney.y = 600;
app.stage.addChild(deney);

let kayla: Sprite = Sprite.fromImage("./bobrossKris.png");
kayla.scale.x = 0.22;
kayla.scale.y = 0.22;
kayla.x = 1300;
kayla.y = 1000;
app.stage.addChild(kayla);

let balls: Sprite[] = [];
let ballsL: Sprite[] = [];
let makeTennis = (a: Sprite[]) => {
    let tennis: Sprite = Sprite.fromImage("tennis.png");
    tennis.scale.x = 0.3;
    if (deney.scale.x < 0) {
        tennis.scale.x = -0.3;
    }
    tennis.scale.y = 0.3;
    tennis.x = deney.x;
    tennis.y = deney.y;
    app.stage.addChild(tennis);
    a[a.length] = tennis;
};
let deneyShoot = 0;

let pizza: Sprite[] = [];
let pizzaR: Sprite[] = [];
let makePizza = (b: Sprite[]) => {
    let pi: Sprite = Sprite.fromImage("pizza.gif");
    pi.scale.x = 0.2;
    pi.scale.y = 0.2;
    pi.x = kayla.x;
    pi.y = kayla.y;
    app.stage.addChild(pi);
    b[b.length] = pi;
};
let kaylaShoot = 0;

let deneyLEFT: boolean = false;
let deneyUP: boolean = false;
let deneyRIGHT: boolean = false;
let deneyDOWN: boolean = false;
let LEFTBOOL: boolean = false;
let UPBOOL: boolean = false;
let RIGHTBOOL: boolean = false;
let DOWNBOOL: boolean = false;
const bLEFT: number = 65;
const bUP: number = 87;
const bRIGHT: number = 68;
const bDOWN: number = 83;
const LEFT: number = 37;
const UP: number = 38;
const RIGHT: number = 39;
const DOWN: number = 40;
const STEP: number = 30;
const E: number = 69;
const pageUp: number = 33;

window.onkeydown = (e: KeyboardEvent): void => {
    app.stage.removeChild(controls);
    PIXI.loader.load(() => {
        const kofmusic = PIXI.loader.resources.kofmusic;
        console.log(kofmusic);
        kofmusic.data.play();
    });
    if (e.keyCode === bLEFT) {
        deneyLEFT = true;
        deney.scale.x = -0.22;
    } else if (e.keyCode === bUP) {
        deneyUP = true;
    } else if (e.keyCode === bRIGHT) {
        deneyRIGHT = true;
        deney.scale.x = 0.22;
    } else if (e.keyCode === bDOWN) {
        deneyDOWN = true;
    } else if (e.keyCode === LEFT) {
        LEFTBOOL = true;
        kayla.scale.x = .22;
    } else if (e.keyCode === UP) {
        UPBOOL = true;
    } else if (e.keyCode === RIGHT) {
        RIGHTBOOL = true;
        kayla.scale.x = -.22;
    } else if (e.keyCode === DOWN) {
        DOWNBOOL = true;
    }
    if (e.keyCode === E) {
        deneyShoot = 1;
    }
    if (e.keyCode === pageUp) {
        kaylaShoot = 1;
    }
};

window.onkeyup = (e: KeyboardEvent): void => {
    if (e.keyCode === bLEFT) {
        deneyLEFT = false;
    } else if (e.keyCode === bUP) {
        deneyUP = false;
    } else if (e.keyCode === bRIGHT) {
        deneyRIGHT = false;
    } else if (e.keyCode === bDOWN) {
        deneyDOWN = false;
    } else if (e.keyCode === LEFT) {
        LEFTBOOL = false;
    } else if (e.keyCode === UP) {
        UPBOOL = false;
    } else if (e.keyCode === RIGHT) {
        RIGHTBOOL = false;
    } else if (e.keyCode === DOWN) {
        DOWNBOOL = false;
    }
    if (e.keyCode === E) {
        deneyShoot = 0;
    }
    if (e.keyCode === pageUp) {
        kaylaShoot = 0;
    }
};

let powpow = (a: DisplayObject, b: DisplayObject): boolean => {
    const ab: Rectangle = a.getBounds();
    const bb: Rectangle = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
};

let deneyHealth = 1000;
let kaylaHealth = 1000;

const style = new PIXI.TextStyle({
    fontFamily: "Impact",
    fontSize: 36,
    fontStyle: "italic",
    fontWeight: "bold",
    fill: ["#207bd6", "#fcfdfe"],
    stroke: "#4a1850",
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
});

const style2 = new PIXI.TextStyle({
    fontFamily: "Impact",
    fontSize: 36,
    fontStyle: "italic",
    fontWeight: "bold",
    fill: ["#dd3416", "#fcfdfe"],
    stroke: "#4a1850",
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
});

const style3 = new PIXI.TextStyle({
    fontFamily: "Impact",
    fontSize: 100,
    fontStyle: "normal",
    fontWeight: "bold",
    fill: ["#ffffff"],
    stroke: "#4a1850",
    strokeThickness: 7,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 600,
});

let kaylaHealthText = new PIXI.Text("Bob Ross Kris health: " + kaylaHealth, style2);
kaylaHealthText.x = 1000;
kaylaHealthText.y = 40;
app.stage.addChild(kaylaHealthText);

let deneyHealthText = new PIXI.Text("Kris health: " + deneyHealth, style);
deneyHealthText.x = 50;
deneyHealthText.y = 50;
app.stage.addChild(deneyHealthText);

let changeHealth = (health: PIXI.Text, updatedText: string): PIXI.Text => {
    health.text = updatedText;
    return health;
};

let message: Text = new Text("Kris won!!");
message.x = 760;
message.y = 100;
message.style.fill = 0xffffff;
let message2: Text = new Text("Bob Ross Kris won!!");
message2.x = 760;
message2.y = 100;
message2.style.fill = 0xffffff;

const victoryDeney = new PIXI.Text("GAME OVER: Kris won!!", style3);
victoryDeney.x = 500;
victoryDeney.y = 200;

const victoryKayla = new PIXI.Text("GAME OVER: Bob Ross Kris won!!", style3);
victoryKayla.x = 500;
victoryKayla.y = 200;

let temp = 0;

app.ticker.add((delta: number): void => { 
    if (deneyShoot === 1) {
        if (deney.scale.x > 0) {
        makeTennis(balls);
        } else {
            makeTennis(ballsL);
        }
        deneyShoot = 0;
        PIXI.loader.load(() => {
            const bonk = PIXI.loader.resources.bonk;
            console.log(bonk);
            bonk.data.play();
        });
    }
    if (kaylaShoot === 1) {
        if (kayla.scale.x > 0) {
        makePizza(pizza);
        } else {
            makePizza(pizzaR);
        }
        kaylaShoot = 0;
        PIXI.loader.load(() => {
            const chomp = PIXI.loader.resources.chomp;
            console.log(chomp);
            chomp.data.play();
        });
    }
    for (let i = 0; i < pizza.length; i++) {
            pizza[i].x -= 10;
        }
    for (let i = 0; i < pizzaR.length; i++) {
            pizzaR[i].x += 10;
        }
    for (let i = 0; i < balls.length; i++) {
        balls[i].x += 10;
    }
    for (let i = 0; i < ballsL.length; i++) {
        ballsL[i].x -= 10;
    }   
    if (deneyLEFT) {
        deney.x -= STEP;
    }
    if (deneyUP) {
        deney.y -= STEP;
    }
    if (deneyRIGHT) {
        deney.x += STEP;
    }
    if (deneyDOWN) {
        deney.y += STEP;
    }
    if (LEFTBOOL) {
        kayla.x -= STEP;
    }
    if (UPBOOL) {
        kayla.y -= STEP;
    }
    if (RIGHTBOOL) {
        kayla.x += STEP;
    }
    if (DOWNBOOL) {
        kayla.y += STEP;
    }

    if (deney.y <= 0) {
        deney.y = 1;
    } else if (deney.y >= 460) {
        deney.y = 459;
    }
    if (deney.x <= 120) {
        deney.x = 121;
    } else if (deney.x >= 1400) {
        deney.x = 1399;
    }
    if (kayla.y <= 0) {
        kayla.y = 1;
    } else if (kayla.y >= 460) {
        kayla.y = 459;
    }
    if (kayla.x <= 0) {
        kayla.x = 1;
    } else if (kayla.x >= 1549) {
        kayla.x = 1550;
    }

    if (powpow(deney, kayla)) {
        let a = Math.random();
        if (a > 0.5 && deneyHealth !== 0 && kaylaHealth !== 0) {
            deneyHealth -= 2;
            changeHealth(deneyHealthText, "Kris health: " + deneyHealth);
        } else if (a < 0.5 && kaylaHealth !== 0 && deneyHealth !== 0) {
            kaylaHealth -= 2;
            changeHealth(kaylaHealthText, "Bob Ross Kris health: " + kaylaHealth);
        }
    }

    for (let i = 0; i < balls.length; i++) {
        if (powpow(kayla, balls[i])) {
            if (kaylaHealth !== 0 && deneyHealth !== 0) {
                app.stage.removeChild(balls[i]);
                kaylaHealth -= 2;
                changeHealth(kaylaHealthText, "Bob Ross Kris health: " + kaylaHealth);
            }
        }
    }

    for (let i = 0; i < ballsL.length; i++) {
        if (powpow(kayla, ballsL[i])) {
            if (kaylaHealth !== 0 && deneyHealth !== 0) {
                app.stage.removeChild(ballsL[i]);
                kaylaHealth -= 2;
                changeHealth(kaylaHealthText, "Bob Ross Kris health: " + kaylaHealth);
            }
        }
    }

    for (let i = 0; i < pizza.length; i++) {
        if (powpow(deney, pizza[i])) {
            if (kaylaHealth !== 0 && deneyHealth !== 0) {
                app.stage.removeChild(pizza[i]);
                deneyHealth -= 2;
                changeHealth(deneyHealthText, "Kris health: " + deneyHealth);
            }
        }
    }

    for (let i = 0; i < pizzaR.length; i++) {
        if (powpow(deney, pizzaR[i])) {
            if (kaylaHealth !== 0 && deneyHealth !== 0) {
                app.stage.removeChild(pizzaR[i]);
                deneyHealth -= 2;
                changeHealth(deneyHealthText, "Kris health: " + deneyHealth);
            }
        }
    }

    if (deneyHealth === 0 && kaylaHealth !== 0 || deneyHealth !== 0 && kaylaHealth === 0) {
        if (deneyHealth === 0) {
            app.stage.addChild(victoryKayla);
        } else if (kaylaHealth === 0) {
            app.stage.addChild(victoryDeney);
        }
    }


});