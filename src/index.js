import { initTable, getTable } from "./game";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

initTable();

console.log(getTable());

ctx.fillStyle = "#000";
ctx.fillRect(0, 0, 270, 600);
