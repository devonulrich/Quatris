import { joinGame, hostStartGame } from "./networking";
import { startPlaying } from "./game";
import { getNumOpponents } from "./opponents";
import { S_SIZE } from "./render";

let nameScreen;
let nameInput;
let nameSubmit;

let hostScreen;
let hostStart;

let opponentCanvas;

let isHost = false;
let isJoined = false;

export function initUI() {
    nameScreen = document.getElementById("nameScreen");
    nameInput = document.getElementById("nameInput");
    nameSubmit = document.getElementById("nameSubmit");

    hostScreen = document.getElementById("hostScreen");
    hostStart = document.getElementById("hostStart");

    opponentCanvas = document.getElementById("opponentCanvas");
    updateOpponentWidth();

    nameSubmit.addEventListener("click", nameSubmitClick);
    hostStart.addEventListener("click", hostStartClick);
}

function nameSubmitClick() {
    nameScreen.classList.add("invisible");
    joinGame(nameInput.value);
    isJoined = true;
    if(isHost) {
        showHostScreen();
    }
}

export function setHost() {
    console.log("You are now the host");
    isHost = true;
    if(isJoined) showHostScreen();
}

function showHostScreen() {
    hostScreen.classList.remove("invisible");
}

function hostStartClick() {
    hostScreen.classList.add("invisible");
    hostStartGame();
}

export function handleEnterPress() {
    // TODO: replace with a better state representation
    if(!isJoined) nameSubmitClick();
    else if(!hostScreen.classList.contains("invisible")) hostStartClick();
}

export function updateOpponentWidth() {
    let cols = Math.ceil(getNumOpponents() / 2);
    cols = Math.max(cols, 1);
    //console.log(cols + " " + getNumOpponents());
    opponentCanvas.width = (10 + cols * (S_SIZE * 10 + 10));
}
