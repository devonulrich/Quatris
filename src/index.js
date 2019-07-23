import { activePiece, initTable, updateGame } from "./game";
import { render } from "./render";
import { initInput } from "./input";

const AUTO_DROP_INTERVAL = 1000;

initTable();
initInput();

setInterval(updateGame, 1000 / 60);
