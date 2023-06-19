import Snow from './snow.js';
import Menu from './menu.js';
import Inputs from './input.js';
import Button from './button.js';
import Title from './title.js';

//min button size = 42
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var CANVAS_WIDTH = canvas.width = window.innerWidth;
var CANVAS_HEIGHT = canvas.height = window.innerHeight;
var currentScale = 1;
var canvasResized = true;
const SMALL_DISPLAY = 900;

const SNOW_AMOUNT = 200;
const SNOW_COLOR = `rgb(130, 130, 150)`
const snowArray = [];
const newSnow = []
const MAX_SNOW = 500;

const BACKGROUND_COLOR = `rgb(83, 79, 104)`;
const MENU_BG_COLOR = 'rgba(0,0,0,0.23)';
const BUTTON_COLOR = `rgb(200, 200, 200)`;
const BUTTON_COLOR_OVER = `rgb(100, 100, 100)`;

const input = new Inputs(canvas);
canvas.addEventListener('mousemove', input.mouseEvents.bind(input));
canvas.addEventListener('mousedown', input.mouseEvents.bind(input));
canvas.addEventListener('mouseup', input.mouseEvents.bind(input));

const allButtonData = [
    { name: "games", url: "https://crisfalcon.itch.io", img: document.getElementById("itchLogo") },
    { name: "twitter", url: "https://twitter.com/crisfalcondev", img: document.getElementById("twitterLogo") },
    { name: "github", url: "https://github.com/CrisFalcon", img: document.getElementById("githubLogo") },
   // { name: "github", url: "https://github.com/CrisFalcon", img: document.getElementById("twitterLogo") }
];
//,{name: "github", url: "https://github.com/CrisFalcon", img: ""}  ]


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

//#region  Menu👽
const menu = new Menu(CANVAS_WIDTH, CANVAS_HEIGHT, MENU_BG_COLOR);
const LOGO_SCALE_BIG = 0.8;
const LOGO_SCALE_SMALL = 0.4;
const logo = new Title(LOGO_SCALE_SMALL);
logo.updateValues(CANVAS_WIDTH, menu);



function DrawMenuBackground() {
    if (canvasResized) menu.updateValues(CANVAS_WIDTH, CANVAS_HEIGHT);
    menu.draw(ctx);
}
function DrawLogo() {
    logo.updateValues(CANVAS_WIDTH, menu);
    logo.draw(ctx);
}

function HandleMenu() {
    DrawMenuBackground();
    DrawLogo();
    logo.scalePercent = CANVAS_WIDTH <= SMALL_DISPLAY? LOGO_SCALE_BIG : LOGO_SCALE_SMALL;
}
//#endregion

//#region buttons⭕
const buttons = [];
const STARTING_BUTTON_SCALE = 0.7;
var buttonScale = STARTING_BUTTON_SCALE;
var buttonSize = logo.width * buttonScale * logo.scale;
function FetchAvailableButtons() {
    for (let index = 0; index < allButtonData.length; index++) {
        buttons.push(new Button(100, 400 * index, buttonSize, BUTTON_COLOR, BUTTON_COLOR_OVER, allButtonData[index]));
    }
}
FetchAvailableButtons();

function ReOrganizeButtons(small) {
    let amountPerLine = small ? 1 : Math.floor((menu.width / buttonSize));
    let pad = (menu.width - (buttonSize * amountPerLine)) / amountPerLine;
    let startPosY = menu.centerY + logo.height * logo.scale + (logo.yPadding * logo.scale);
    let yPad = small ? (buttonSize * 0.55) / 3 : pad;
    let totalRows = Math.ceil(buttons.length / amountPerLine);
    let missingAmount = (amountPerLine * totalRows) - buttons.length;
    let lastLineAmount = amountPerLine - missingAmount;

    let amount = 0;
    let row = 0;

    for (let index = 0; index < buttons.length; index++) {

        if (row === totalRows - 1 && missingAmount != 0) {
            if (lastLineAmount != 2) {
                pad = (menu.width - (buttonSize * lastLineAmount)) / lastLineAmount;
                buttons[index].x = menu.centerX + pad / 2 + (pad + buttonSize) * amount;
            }
            else buttons[index].x = amount === 0 ? (menu.centerX + menu.width / 2) - (buttonSize + pad / 2)
                : (menu.centerX + menu.width / 2) + pad / 2;

        }
        else buttons[index].x = menu.centerX + pad / 2 + (pad + buttonSize) * amount;

        buttons[index].y = startPosY + yPad + (buttonSize * 0.55 + yPad) * row;

        amount++;
        if (amount === amountPerLine) {
            row++;
            amount = 0;
        }
    }
}


function ButtonHandler() {
    var small = CANVAS_WIDTH <= SMALL_DISPLAY;
    buttonScale = small ? 1 : STARTING_BUTTON_SCALE;
    buttonSize = logo.width * buttonScale * logo.scale;
    buttons.forEach(x => {
        x.changeScale(buttonSize);
        x.draw(ctx, input.mouse.x, input.mouse.y);
        if (x.isMouseOver(input.mouse.x, input.mouse.y) && input.mouse.clicked) {
            //window.location.href = x.data.url;
            window.open(x.data.url, "_blank");
        }
    });
    ReOrganizeButtons(small);
}
//#endregion

var timerTest = 0;
function Test() {
    timerTest++;
    if (timerTest >= 0) {
        timerTest = 0;
        menu.centerY -= 10;
    }
}

function Update() {
    input.update();
    Resize();
    CleanCanvas();
    DrawBackground();
    UpdateSnow();
    DrawCircle(input.mouse.x, input.mouse.y, input.mouse.hold ? 15 : 0);
    SpawnSnow();
    HandleMenu();
    ButtonHandler();
    //Test();


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

    currentScale = canvas.height < canvas.width ? canvas.height : canvas.width;

    if (prevH != CANVAS_HEIGHT || prevW != CANVAS_WIDTH) canvasResized = true;
    else canvasResized = false;
}

function DrawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fill();
    ctx.stroke();
}

function DrawBackground() {
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
