import { activePiece, initTable, updateGame } from "./game";
import { getImages } from "./render";
import { initInput } from "./input";

const AUTO_DROP_INTERVAL = 1000;

//init sequence
getImages();
initTable();
initInput();

//start game loop
setInterval(updateGame, 1000 / 60);
