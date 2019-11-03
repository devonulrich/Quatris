import { joinGame } from "./networking";
import { startPlaying } from "./game";
import { getNumOpponents } from "./opponents";
import { S_SIZE } from "./render";

let nameScreen;
let nameInput;
let nameSubmit;

let opponentCanvas;

export function initUI() {
    nameScreen = document.getElementById("nameScreen");
    nameInput = document.getElementById("nameInput");
    nameSubmit = document.getElementById("nameSubmit");

    opponentCanvas = document.getElementById("opponentCanvas");
    updateOpponentWidth();

    nameSubmit.addEventListener("click", nameSubmitClick);
}

function nameSubmitClick() {
    nameScreen.classList.add("invisible");
    joinGame(nameInput.value);
    startPlaying();
}

export function updateOpponentWidth() {
    let cols = Math.ceil(getNumOpponents() / 2);
    cols = Math.max(cols, 1);
    console.log(cols + " " + getNumOpponents());
    opponentCanvas.width = (10 + cols * (S_SIZE * 10 + 10));
}
