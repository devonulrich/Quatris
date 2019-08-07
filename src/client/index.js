import { activePiece, initTable, updateGame } from "./game";
import { getImages } from "./render";
import { initInput } from "./input";
import { initNetworking } from "./networking";

import io from "socket.io-client";

const AUTO_DROP_INTERVAL = 1000;

//init sequence
getImages();
initTable();
initInput();
initNetworking();

//start game loop
setInterval(updateGame, 1000 / 60);
