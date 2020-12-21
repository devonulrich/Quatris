import { joinGame, hostStartGame } from "./networking";
import { startPlaying, State } from "./game";
import { getNumOpponents } from "./opponents";
import { S_SIZE } from "./render";

let nameScreen;
let nameInput;
let nameSubmit;

let hostScreen;
let hostStart;

let lostScreen;

let opponentCanvas;

export function initUI() {
    nameScreen = document.getElementById("nameScreen");
    nameInput = document.getElementById("nameInput");
    nameSubmit = document.getElementById("nameSubmit");

    hostScreen = document.getElementById("hostScreen");
    hostStart = document.getElementById("hostStart");

    lostScreen = document.getElementById("lostScreen");

    opponentCanvas = document.getElementById("opponentCanvas");
    updateOpponentWidth();

    nameSubmit.addEventListener("click", nameSubmitClick);
    hostStart.addEventListener("click", hostStartClick);
}

function nameSubmitClick() {
    nameScreen.classList.add("invisible");
    joinGame(nameInput.value);

    State.currState = State.START;
    if(State.isHost) showHostScreen();
}

export function setHost() {
    console.log("You are now the host");
    State.isHost = true;

    if(State.currState == State.START) {
        showHostScreen();
    }
}

function showHostScreen() {
    hostScreen.classList.remove("invisible");
}

function hostStartClick() {
    hostScreen.classList.add("invisible");
    hostStartGame();
}

export function showLostScreen() {
    lostScreen.classList.remove("invisible");
}

export function handleEnterPress() {
    if(State.currState == State.JOIN) nameSubmitClick();
    else if(State.currState == State.START && State.isHost) hostStartClick();
}

export function updateOpponentWidth() {
    let cols = Math.ceil(getNumOpponents() / 2);
    cols = Math.max(cols, 1);
    //console.log(cols + " " + getNumOpponents());
    opponentCanvas.width = (10 + cols * (S_SIZE * 10 + 10));
}
