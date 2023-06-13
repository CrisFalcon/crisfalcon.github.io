// Get the canvas element
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


// Set canvas dimensions to the window's inner width and height
var CANVAS_WIDTH = canvas.width = window.innerWidth;
var CANVAS_HEIGHT = canvas.height = window.innerHeight;
const SNOW_AMOUNT = 200;
const snowArray = [];
const MAX_SNOW = 500;
const BACKGROUND_COLOR = `rgb(83, 79, 104)`;
const SNOW_COLOR = `rgb(130, 130, 150)`;
const MENU_BG_COLOR = 'rgba(0,0,0,0.23)';
const BUTTON_COLOR = `rgb(255, 255, 255)`;

class Snow {
    constructor(posX, posY) {
        //this.x = Math.random() * canvas.width;
        this.x = posX;
        //this.y = Math.random() * canvas.height;
        this.y = posY;
        this.size = (Math.random() * 7) + 3;
        this.ySpeed = (Math.random() * 5) + 2;
        this.xSpeed = (Math.random() * 2) + 1;
        this.position = (this.x, this.y);
        this.color = SNOW_COLOR;
        this.canUpdate = true;
    }
    draw() {
        DrawSquare(this.x, this.y, this.size, this.size, this.color);
    }
    update() {
        this.y += this.ySpeed;
        this.x -= this.xSpeed;
        if (this.y + this.size / 2 > CANVAS_HEIGHT) {
            this.y = 0;
            // SnowDecay(this);
        }
        if (this.x + this.size <= 0) {
            this.x = CANVAS_WIDTH;
        }
    }
}

for (let index = 0; index < SNOW_AMOUNT; index++) {
    snowArray.push(new Snow(Math.random() * canvas.width, Math.random() * canvas.height));
}

function DrawSquare(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function DrawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fill();
    ctx.stroke();
}

function CleanCanvas() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function DrawBackground() {
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function UpdateSnow() {
    snowArray.forEach(x => { x.draw(); x.update(); });
    newSnow.forEach(x => { x.draw(); x.update(); });
}
let canvasResized = true;
let prevW = 0;
let prevH = 0;
function Resize() {
    prevW = CANVAS_WIDTH;
    prevH = CANVAS_HEIGHT;

    CANVAS_WIDTH = canvas.width = window.innerWidth;
    CANVAS_HEIGHT = canvas.height = window.innerHeight;

    if (prevH != CANVAS_HEIGHT || prevW != CANVAS_WIDTH) canvasResized = true;
    else canvasResized = false;
}


let mouseX = 0;
let mouseY = 0;
let clickHold = false;

canvas.addEventListener('mousemove', HandleMouseEvents);
canvas.addEventListener('mousedown', HandleMouseEvents);
canvas.addEventListener('mouseup', HandleMouseEvents);

function HandleMouseEvents(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;

    if (event.type === 'mousedown') {
        clickHold = true;
    }
    else if (event.type === 'mouseup') {
        clickHold = false;
    }
}

let newSnow = []
function SpawnSnow() {
    if (!clickHold) return;

    for (let index = 0; index < 1; index++) {
        newSnow.push(new Snow(mouseX + Math.random() * 5, mouseY));
        if (newSnow.length > 200) newSnow.shift();
    }
}



class Menu {
    constructor() {
        this.width = CANVAS_WIDTH * 0.8;
        this.height = CANVAS_HEIGHT * 3;
        this.centerX = (CANVAS_WIDTH / 2) - (this.width / 2);
        this.centerY = (CANVAS_HEIGHT / 2) - (this.height / 2);
        this.color = MENU_BG_COLOR;
    }
    updateValues() {
        this.width = CANVAS_WIDTH * 0.8;
        this.height = CANVAS_HEIGHT * 3;
        this.centerX = (CANVAS_WIDTH / 2) - (this.width / 2);
        this.centerY = (CANVAS_HEIGHT / 2) - (this.height / 2);
    }
    draw() {
        DrawSquare(this.centerX, this.centerY, this.width, this.height, this.color);
    }

}


class MenuButton {
    constructor(posX, posY, width, height) {
        this.x = posX;
        this.y = posY;
        this.width = width;
        this.height = height;
        this.color = BUTTON_COLOR;
    }
    draw() {
        DrawSquare(this.x, this.y, this.width, this.height, this.color);
    }
    updateValues(posX, posY, width, height) {
        this.x = posX;
        this.y = posY;
        this.width = width;
        this.height = height;
    }
}

var menu = new Menu();
/*var buttons = [];

const BUTTON_PADDING = 5 / 100;

function CreateButtons() {

    let startPosX = menu.centerX;
    let startPosY = menu.centerY;
    let padding = (menu.width * BUTTON_PADDING);
    let w = (menu.width - padding * 3) / 2;
    let h = (menu.height - (padding * 4)) / 3;
    let posX = startPosX + padding;
    let posY = startPosY + padding;


    for (let x = 0; x < 2; x++) {
        buttons[x] = [];
        for (let y = 0; y < 3; y++) {
            let pX = posX + (w + padding) * x;
            let pY = posY + (h + padding) * y;
            buttons[x][y] = new MenuButton(pX, pY, w, h);
            //buttons[x, y].updateValues(pX, pY, w, h);
        }
    }
}

menu.updateValues();
CreateButtons();*/


function DrawMenuBackground() {

    if (canvasResized) {
        menu.updateValues();
        //CreateButtons();
    }
    menu.draw();
    //buttons.forEach(row => row.forEach(x => x.draw()));
}

function HandleMenu() {
    DrawMenuBackground();
}


function Update() {

    Resize();
    CleanCanvas();
    DrawBackground();
    UpdateSnow();
    DrawCircle(mouseX, mouseY, clickHold ? 15 : 0);
    HandleMenu();
    SpawnSnow();

    requestAnimationFrame(Update);
}

Update();

