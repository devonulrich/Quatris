import "./index.css";

import { activePiece, initTable, updateGame } from "./game";
import { getImages } from "./render";
import { initInput } from "./input";
import { initNetworking } from "./networking";
import { initUI } from "./ui";

import io from "socket.io-client";

const AUTO_DROP_INTERVAL = 1000;

//init sequence
getImages();
initTable();
initInput();
initNetworking();
initUI();

//correct the opponent canvas if necessary
let oppCanvas = document.getElementById("opponentCanvas");
if(oppCanvas.width != oppCanvas.clientWidth) {
    oppCanvas.width = oppCanvas.clientWidth;
}

//start game loop
setInterval(updateGame, 1000 / 60);
