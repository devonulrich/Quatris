import { getTable, activePiece, reservedPieceType, upcomingTypes } from "./game";
import { getOpponentTables } from "./opponents";

const imgPath = require.context("./assets");

const F_SIZE = 30;//full square side length
const S_SIZE = 9;//small square side length

const X_OFF = 150;//x-offset for the grid on the canvas

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let images = [undefined];

export function getImages() {
    for(let i = 1; i <= 7; i++) {
        images.push(new Image());
        images[i].src = imgPath("./" + i + ".png");
    }
}

export function render() {
    //clear the screen
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
            drawBlock(x, y, X_OFF, 0, F_SIZE, getColor(table[x][y]));
        }
    }

    //render the active piece's shadow
    let currColor = getColor(activePiece.type) + "80";//half opacity
    let copyObj = activePiece.getDroppedObj();
    for(let i = 0; i < 4; i++) {
        let block = copyObj.blocks[i];
        drawBlock(block.x, block.y, X_OFF, 0, F_SIZE, currColor);
    }

    //render the active piece
    currColor = getColor(activePiece.type);
    for(let i = 0; i < 4; i++) {
        let block = activePiece.blocks[i];
        drawBlock(block.x, block.y, X_OFF, 0, F_SIZE, currColor);
    }
}

function renderSideBars() {
    //render the reserved piece
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, 140, 140);
    if(reservedPieceType != -1) {
         ctx.drawImage(images[reservedPieceType], 0, 0);
    }

    //render the upcoming pieces
    ctx.fillRect(X_OFF + 300 + 10, 0, 140, 600);
    for(let n = 0; n < 5; n++) {
        ctx.drawImage(images[upcomingTypes[n]], X_OFF + 300 + 10, 120 * n - 15);
    }
}

function renderOpponents() {
    let opponentIt = getOpponentTables();
    let oppNum = 0;
    for(let opponent of opponentIt) {
        //margin of 10px between each opponent screen
        let x = 610 + (oppNum % 3) * (S_SIZE * 10 + 10);
        let y = Math.floor(oppNum / 3) * (S_SIZE * 20 + 10);
        drawOpponent(x, y, opponent);
        oppNum++;
    }
}

function drawOpponent(startX, startY, table) {
    ctx.strokeStyle = "#000000";
    for(let x = 0; x < 10; x++) {
        for(let y = 0; y < 20; y++) {
            drawBlock(x, y, startX, startY, S_SIZE, getColor(table[x][y]));
        }
    }
}

//x and y are the grid coordinates (not canvas coordinates)
//xOff and yOff are the offsets of the entire grid
function drawBlock(x, y, xOff, yOff, size, color) {
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
