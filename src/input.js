import { activePiece } from "./game";

export function initInput() {
    window.addEventListener("keydown", handleKeyEvent);
}

function handleKeyEvent(event) {
    if(event.key == "ArrowLeft") {
        activePiece.moveSideways(-1);
    } else if(event.key == "ArrowRight") {
        activePiece.moveSideways(1);
    } else if(event.key == "ArrowDown") {
        activePiece.moveDown();
    } else if(event.key == ' ') {
        activePiece.drop();
    }
}
