import { getTable, activePiece } from "./game";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let interval;

export function render() {
    //render the table
    let table = getTable();
    for(let x = 0; x < 10; x++) {
        for(let y = 0; y < 20; y++) {
            //add each block with it's corresponding color
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = getColor(table[x][y]);
            ctx.fillRect(x * 30, y * 30, 30, 30);
            ctx.strokeRect(x * 30, y * 30, 30, 30);
        }
    }

    //render the active piece
    ctx.fillStyle = getColor(activePiece.type);
    for(let i = 0; i < 4; i++) {
        let block = activePiece.blocks[i];
        ctx.fillRect(block.x * 30, block.y * 30, 30, 30);
        ctx.strokeRect(block.x * 30, block.y * 30, 30, 30);
    }
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
