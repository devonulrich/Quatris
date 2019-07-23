//this code is in charge of the game logic and board for the player
import { render } from "./render";

let table;
export let activePiece;

const AUTO_DROP_INTERVAL = 1000;
let lastDropTime = new Date().getTime();

export function initTable() {
    table = new Array(10);
    for(let x = 0; x < 10; x++) {
        table[x] = new Array(20).fill(0);
    }

    activePiece = new ActivePiece();
}

export function getTable() {
    return table;
}

export function updateGame() {
    render();

    let currTime = new Date().getTime();
    if(currTime - lastDropTime >= AUTO_DROP_INTERVAL) {
        activePiece.moveDown();
    }
}

class ActivePiece {
    constructor() {
        this.type = Math.floor(Math.random() * 7 + 1);
        this.blocks = getPieceCoords(this.type);

        lastDropTime = new Date().getTime();
    }

    //direction: 1 = to the right, -1 = to the left
    moveSideways(direction) {
        for(let i = 0; i < 4; i++) {
            let newPos = this.blocks[i].x + direction;
            if(newPos < 0 || newPos >= 10) return;
            if(table[newPos][this.blocks[i].y] != 0) return;
        }

        for(let i = 0; i < 4; i++) {
            this.blocks[i].x += direction;
        }
    }

    //returns true if the piece successfully moved down
    //returns false if something blocked the piece from moving (and finalize() was called)
    moveDown() {
        for(let i = 0; i < 4; i++) {
            let newPos = this.blocks[i].y + 1;
            if(newPos == 20 || table[this.blocks[i].x][newPos] != 0) {
                //block below is either past the bottom or occupied
                this.finalize();
                return false;
            }
        }

        for(let i = 0; i < 4; i++) {
            this.blocks[i].y++;
        }
        
        //reset the auto drop interval
        lastDropTime = new Date().getTime();
        return true;
    }

    drop() {
        //lower the piece as far as it will go

        //this will also automatically generate the new piece
        //by calling finalize
        while(this.moveDown()) {}
    }

    finalize() {
        //sets the current active piece into place
        //and generates a new active piece
        for(let i = 0; i < 4; i++) {
            let x = this.blocks[i].x;
            let y = this.blocks[i].y;
            table[x][y] = this.type;
        }

        activePiece = new ActivePiece();
    }
}

function getPieceCoords(type) {
    switch(type) {
    case 1:
        return [{x: 3, y: 1},
                {x: 4, y: 1},
                {x: 4, y: 0},
                {x: 5, y: 0}];
    case 2:
        return [{x: 3, y: 0},
                {x: 4, y: 0},
                {x: 4, y: 1},
                {x: 5, y: 1}];
    case 3:
        return [{x: 3, y: 1},
                {x: 4, y: 1},
                {x: 5, y: 1},
                {x: 5, y: 0}];
	case 4:
		return [{x: 3, y: 0},
                {x: 3, y: 1},
                {x: 4, y: 1},
                {x: 5, y: 1}];
	case 5:
        return [{x: 3, y: 0},
                {x: 4, y: 0},
                {x: 5, y: 0},
                {x: 6, y: 0}];
    case 6:
        return [{x: 3, y: 1},
                {x: 4, y: 0},
                {x: 4, y: 1},
                {x: 5, y: 1}];
    default:
    case 7:
        return [{x: 4, y: 0},
                {x: 4, y: 1},
                {x: 5, y: 0},
                {x: 5, y: 1}];
    }
}
