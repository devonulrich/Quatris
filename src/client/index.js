import { activePiece, initTable, updateGame } from "./game";
import { getImages } from "./render";
import { initInput } from "./input";

import io from "socket.io-client";

const AUTO_DROP_INTERVAL = 1000;

//init sequence
getImages();
initTable();
initInput();

//TEST CODE
//start socket.io connection
let socket = io();
socket.on("connect", function() { console.log("connected!") });

//start game loop
setInterval(updateGame, 1000 / 60);
