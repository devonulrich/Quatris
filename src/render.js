import { getTable, activePiece, reservedPiece } from "./game";

const X_OFF = 150;//x-offset for the grid on the canvas

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let interval;

export function render() {
    //clear the screen
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //render the table
    let table = getTable();
    for(let x = 0; x < 10; x++) {
        for(let y = 0; y < 20; y++) {
            //add each block with its corresponding color
            drawBlock(x, y, table[x][y]);
        }
    }

    //render the active piece's shadow
    ctx.fillStyle = getColor(activePiece.type) + "80";//half opacity
    let copyObj = activePiece.getDroppedObj();
    for(let i = 0; i < 4; i++) {
        let block = copyObj.blocks[i];
        ctx.fillRect(block.x * 30 + X_OFF, block.y * 30, 30, 30);
        ctx.strokeRect(block.x * 30 + X_OFF, block.y * 30, 30, 30);
    }

    //render the active piece
    ctx.fillStyle = getColor(activePiece.type);
    for(let i = 0; i < 4; i++) {
        let block = activePiece.blocks[i];
        ctx.fillRect(block.x * 30 + X_OFF, block.y * 30, 30, 30);
        ctx.strokeRect(block.x * 30 + X_OFF, block.y * 30, 30, 30);
    }

    //render the reserved piece
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, 140, 140);
    let xOff = (140 - reservedPiece.width * 30) / 2;
    let yOff = (140 - reservedPiece.height * 30) / 2;
    ctx.fillStyle = getColor(reservedPiece.type);
    for(let i = 0; i < 4; i++) {
        let block = reservedPiece.blocks[i];
        ctx.fillRect(block.x * 30 + xOff, block.y * 30 + yOff, 30, 30);
        ctx.strokeRect(block.x * 30 + xOff, block.y * 30 + yOff, 30, 30);
    }
}

function drawBlock(x, y, type) {
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = getColor(type);
    ctx.fillRect(x * 30 + X_OFF, y * 30, 30, 30);
    ctx.strokeRect(x * 30 + X_OFF, y * 30, 30, 30);
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
