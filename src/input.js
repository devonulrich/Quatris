import { activePiece } from "./game";

let left;
let right;
let up;
let down;
let space;

export function initInput() {
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    left = new Key();
    right = new Key();
    up = new Key();
    down = new Key();
    space = new Key();
}

export function updateInput() {
    if(left.query()) activePiece.moveSideways(-1);
    if(right.query()) activePiece.moveSideways(1);
    if(up.query()) activePiece.rotate();
    if(down.query()) activePiece.moveDown();
    if(space.query()) activePiece.dropFull();
}

class Key {
    constructor() {
        this.pressed = false;
        this.timeout = 0;
    }

    setPressed(val) {
        this.pressed = val;
        this.timeout = 0;
    }

    query() {
        if(!this.pressed) return false;

        if(new Date().getTime() - this.timeout >= 150) {
            this.timeout = new Date().getTime();
            return true;
        } else {
            return false;
        }
    }
}

function keyDown(event) {
    switch(event.key) {
    case "ArrowLeft":
        left.setPressed(true);
        return;
    case "ArrowRight":
        right.setPressed(true);
        return;
    case "ArrowUp":
        up.setPressed(true);
        return;
    case "ArrowDown":
        down.setPressed(true);
        return;
    case " ":
        space.setPressed(true);
        return;
    }
}

function keyUp(event) {
    switch(event.key) {
    case "ArrowLeft":
        left.setPressed(false);
        return;
    case "ArrowRight":
        right.setPressed(false);
        return;
    case "ArrowUp":
        up.setPressed(false);
        return;
    case "ArrowDown":
        down.setPressed(false);
        return;
    case " ":
        space.setPressed(false);
        return;
    }
}

