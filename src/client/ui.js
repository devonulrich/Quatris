import { joinGame } from "./networking";

let nameScreen;
let nameInput;
let nameSubmit;

export function initUI() {
    nameScreen = document.getElementById("nameScreen");
    nameInput = document.getElementById("nameInput");
    nameSubmit = document.getElementById("nameSubmit");

    nameSubmit.addEventListener("click", nameSubmitClick);
}

function nameSubmitClick() {
    nameScreen.classList.add("invisible");
    joinGame(nameInput.value);
}
