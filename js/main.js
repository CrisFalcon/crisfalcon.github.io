import Snow from './snow.js';
import Menu from './menu.js';
import Inputs from './input.js';

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var CANVAS_WIDTH = canvas.width = window.innerWidth;
var CANVAS_HEIGHT = canvas.height = window.innerHeight;
var canvasResized = true;

const SNOW_AMOUNT = 200;
const SNOW_COLOR = `rgb(130, 130, 150)`
const snowArray = [];
const newSnow = []
const MAX_SNOW = 500;

const BACKGROUND_COLOR = `rgb(83, 79, 104)`;
const MENU_BG_COLOR = 'rgba(0,0,0,0.23)';
const BUTTON_COLOR = `rgb(255, 255, 255)`;

const input = new Inputs(canvas);
canvas.addEventListener('mousemove', input.mouseEvents.bind(input));
canvas.addEventListener('mousedown', input.mouseEvents.bind(input));
canvas.addEventListener('mouseup', input.mouseEvents.bind(input));

//#region Snow❄️
for (let index = 0; index < SNOW_AMOUNT; index++) {
    snowArray.push(new Snow(Math.random() * canvas.width, Math.random() * canvas.height, SNOW_COLOR));
}

function UpdateSnow() {
    snowArray.forEach(x => { x.draw(ctx); x.update(CANVAS_HEIGHT, CANVAS_WIDTH); });
    newSnow.forEach(x => { x.draw(ctx); x.update(CANVAS_HEIGHT, CANVAS_WIDTH); });
}


function SpawnSnow() {
    if (!input.mouse.hold) return;
    for (let index = 0; index < 1; index++) {
        newSnow.push(new Snow(input.mouse.x + Math.random() * 5, input.mouse.y));
        if (newSnow.length > 200) newSnow.shift();
    }
}
//#endregion

//#region  menu
var menu = new Menu(CANVAS_WIDTH, CANVAS_HEIGHT, MENU_BG_COLOR);
function DrawMenuBackground() {
    if (canvasResized) menu.updateValues(CANVAS_WIDTH, CANVAS_HEIGHT);
    menu.draw(ctx);
}

function HandleMenu() {
    DrawMenuBackground();
}
//#endregion

function DrawBackground() {
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function DrawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fill();
    ctx.stroke();
}

function Update() {
    Resize();
    CleanCanvas();
    DrawBackground();
    UpdateSnow();
    DrawCircle(input.mouse.x, input.mouse.y, input.mouse.hold ? 15 : 0);
    
    HandleMenu();
    SpawnSnow();

    requestAnimationFrame(Update);
}

Update();

function CleanCanvas() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function Resize() {
    const prevW = CANVAS_WIDTH;
    const prevH = CANVAS_HEIGHT;

    CANVAS_WIDTH = canvas.width = window.innerWidth;
    CANVAS_HEIGHT = canvas.height = window.innerHeight;

    if (prevH != CANVAS_HEIGHT || prevW != CANVAS_WIDTH) canvasResized = true;
    else canvasResized = false;
}
