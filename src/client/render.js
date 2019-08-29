import { getTable, activePiece, reservedPieceType, upcomingTypes } from "./game";
import { getOpponentTables } from "./opponents";

const imgPath = require.context("./assets");

const F_SIZE = 30;//full square side length
export const S_SIZE = 13;//small square side length
//S_SIZE is needed in ui.js for resizing the opponent canvas

let gameCanvas = document.getElementById("gameCanvas");
let gCtx = gameCanvas.getContext("2d");

let reservedCanvas = document.getElementById("reservedCanvas");
let rCtx = reservedCanvas.getContext("2d");

let upcomingCanvas = document.getElementById("upcomingCanvas");
let uCtx = upcomingCanvas.getContext("2d");

let opponentCanvas = document.getElementById("opponentCanvas");
let oCtx = opponentCanvas.getContext("2d");

//index 0 is never used
let images = [undefined];

export function getImages() {
    for(let i = 1; i <= 7; i++) {
        images.push(new Image());
        images[i].src = imgPath("./" + i + ".png");
    }
}

export function render() {
    renderMainTable();
    renderSideBars();
    renderOpponents();
}

function renderMainTable() {
    //render the table
    let table = getTable();
    for(let x = 0; x < 10; x++) {
        for(let y = 0; y < 20; y++) {
            //add each block with its corresponding color
            drawBlock(gCtx, x, y, F_SIZE, getColor(table[x][y]));
        }
    }

    if(activePiece == undefined) return;

    //render the active piece's shadow
    let currColor = getColor(activePiece.type) + "80";//half opacity
    let copyObj = activePiece.getDroppedObj();
    for(let i = 0; i < 4; i++) {
        let block = copyObj.blocks[i];
        drawBlock(gCtx, block.x, block.y, F_SIZE, currColor);
    }

    //render the active piece
    currColor = getColor(activePiece.type);
    for(let i = 0; i < 4; i++) {
        let block = activePiece.blocks[i];
        drawBlock(gCtx, block.x, block.y, F_SIZE, currColor);
    }
}

function renderSideBars() {
    //render the reserved piece
    rCtx.fillStyle = "#222";
    rCtx.fillRect(0, 0, 140, 140);
    if(reservedPieceType != -1) {
         rCtx.drawImage(images[reservedPieceType], 0, 0);
    }

    if(upcomingTypes.length != 5) return;

    //render the upcoming pieces
    uCtx.fillStyle = "#222";
    uCtx.fillRect(0, 0, 140, 600);
    for(let n = 0; n < 5; n++) {
        uCtx.drawImage(images[upcomingTypes[n]], 0, 120 * n - 15);
    }
}

function renderOpponents() {
    oCtx.fillStyle = "#234";
    oCtx.fillRect(0, 0, opponentCanvas.width, opponentCanvas.height);

    let opponentIt = getOpponentTables();
    let oppNum = 0;

    for(let opponent of opponentIt) {
        //margin of 10px between each opponent screen
        let x = Math.floor(oppNum / 2) * (S_SIZE * 10 + 10) + 10;
        let y = (oppNum % 2) * 290 + 10;//just two rows
        drawOpponent(x, y, opponent.data);

        let xMid = x + S_SIZE * 5;
        let yBot = y + S_SIZE * 20 + 15;
        drawOpponentText(xMid, yBot, opponent.name);
        oppNum++;
    }
}

function drawOpponent(startX, startY, table) {
    oCtx.strokeStyle = "#000000";
    for(let x = 0; x < 10; x++) {
        for(let y = 0; y < 20; y++) {
            drawBlock(oCtx, x, y, S_SIZE, getColor(table[x][y]), startX, startY);
        }
    }
}

function drawOpponentText(x, y, text) {
    oCtx.font = "15px Arial";
    oCtx.textAlign = "center";
    oCtx.fillStyle = "white";
    oCtx.fillText(text, x, y);
}

//x and y are the grid coordinates (not canvas coordinates)
//xOff and yOff are the offsets of the entire grid
function drawBlock(ctx, x, y, size, color, xOff = 0, yOff = 0) {
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = color;
    ctx.fillRect(x * size + xOff, y * size + yOff, size, size);
    ctx.strokeRect(x * size + xOff, y * size + yOff, size, size);
}

function getColor(type) {
    if(type == 1) return "#FF0000";//red
    if(type == 2) return "#00FF00";//green
    if(type == 3) return "#0000FF";//blue
    if(type == 4) return "#FF7700";//orange
    if(type == 5) return "#00FFFF";//cyan
    if(type == 6) return "#FF00FF";//pink
    if(type == 7) return "#FFFF00";//yellow
    return "#222";//black - default
}
