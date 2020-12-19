import { getTable, activePiece, reservedPieceType, upcomingTypes } from "./game";
import { getOpponentTables } from "./opponents";

const imgPath = require.context("./assets");

const F_SIZE = 30;//full square side length
export const S_SIZE = 13;//small square side length
//S_SIZE is needed in ui.js for resizing the opponent canvas

const SIDEBAR_BG_CLR = "#414848";
const OPPONENT_BG_CLR = "#DDDDDD";
const TEXT_CLR = "#112233";
const BLACK_CLR = "#000000";

const RED_CLR = "#FF5555";
const GREEN_CLR = "#00FF99";
const BLUE_CLR = "#0099FF";
const ORANGE_CLR = "#FFAA44";
const CYAN_CLR = "#66FFFF";
const PINK_CLR = "#FF66FF";
const YELLOW_CLR = "#FFFF66";
const BG_CLR = "#303535";

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
    rCtx.fillStyle = SIDEBAR_BG_CLR;
    rCtx.fillRect(0, 0, 140, 140);
    if(reservedPieceType != -1) {
         rCtx.drawImage(images[reservedPieceType], 0, 0);
    }

    if(upcomingTypes.length != 5) return;

    //render the upcoming pieces
    uCtx.fillStyle = SIDEBAR_BG_CLR;
    uCtx.fillRect(0, 0, 140, 600);
    for(let n = 0; n < 5; n++) {
        uCtx.drawImage(images[upcomingTypes[n]], 0, 120 * n - 15);
    }
}

function renderOpponents() {
    oCtx.fillStyle = OPPONENT_BG_CLR;
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
    oCtx.strokeStyle = BLACK_CLR;
    oCtx.lineWidth = "1";
    for(let x = 0; x < 10; x++) {
        for(let y = 0; y < 20; y++) {
            drawBlock(oCtx, x, y, S_SIZE, getColor(table[x][y]), startX, startY);
        }
    }
}

function drawOpponentText(x, y, text) {
    oCtx.font = "15px Arial";
    oCtx.textAlign = "center";
    oCtx.fillStyle = TEXT_CLR;
    oCtx.fillText(text, x, y);
}

//x and y are the grid coordinates (not canvas coordinates)
//xOff and yOff are the offsets of the entire grid
function drawBlock(ctx, x, y, size, color, xOff = 0, yOff = 0) {
    ctx.strokeStyle = BLACK_CLR;
    ctx.fillStyle = color;
    ctx.fillRect(x * size + xOff, y * size + yOff, size, size);
    ctx.strokeRect(x * size + xOff, y * size + yOff, size, size);

    // block shading
    if(color != "#303535") {
        ctx.fillStyle = "#00000080";
        ctx.fillRect(x * size + xOff, y * size + yOff + size*5/6, size, size*1/6);
        ctx.fillRect(x * size + xOff + size*5/6, y * size + yOff, size*1/6, size*5/6);
        
        ctx.fillStyle = "#FFFFFF80";
        ctx.fillRect(x * size + xOff, y * size + yOff, size*5/6, size*1/6);
        ctx.fillRect(x * size + xOff, y * size + yOff + size*1/6, size*1/6, size*4/6);
    }
}

function getColor(type) {
    /* NOTE: color strings must be in full 6-digit form.
     * This is so the shadow pieces can be drawn with a new
     * opacity appended onto the strings */
    if(type == 1) return RED_CLR;
    if(type == 2) return GREEN_CLR;
    if(type == 3) return BLUE_CLR;
    if(type == 4) return ORANGE_CLR;
    if(type == 5) return CYAN_CLR;
    if(type == 6) return PINK_CLR;
    if(type == 7) return YELLOW_CLR;
    return BG_CLR;
}
