import { joinGame, hostStartGame } from "./networking";
import { startPlaying, State } from "./game";
import { getNumOpponents } from "./opponents";
import { S_SIZE } from "./render";

let nameScreen;
let nameInput;
let nameSubmit;

let hostScreen;
let hostStart;

let opponentCanvas;

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
    if(State.currState == State.HOST_JOIN) {
        showHostScreen();
        State.currState = State.HOST_START;
    } else {
        State.currState = State.REG_START;
    }
}

export function setHost() {
    console.log("You are now the host");
    if(State.currState == State.REG_JOIN) {
        State.currState = State.HOST_JOIN;
    } else if(State.currState == State.REG_START) {
        State.currState = State.HOST_START;
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

export function handleEnterPress() {
    if(State.currState == State.HOST_JOIN ||
       State.currState == State.REG_JOIN) nameSubmitClick();
    else if(State.currState == State.HOST_START) hostStartClick();
}

export function updateOpponentWidth() {
    let cols = Math.ceil(getNumOpponents() / 2);
    cols = Math.max(cols, 1);
    //console.log(cols + " " + getNumOpponents());
    opponentCanvas.width = (10 + cols * (S_SIZE * 10 + 10));
}
