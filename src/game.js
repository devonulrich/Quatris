//this code is in charge of the game logic and board for the player
import { render } from "./render";

let table;
export let activePiece;

const AUTO_DROP_INTERVAL = 1000;

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
    if(currTime - activePiece.lastDropTime >= AUTO_DROP_INTERVAL) {
        activePiece.drop();
    }
}

class ActivePiece {
    constructor() {
        this.type = Math.floor(Math.random() * 7 + 1);
        this.blocks = getPieceCoords(this.type);
        this.lastDropTime = new Date().getTime();
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

    rotate() {
        //get average coordinates for piece
        //and use it as a pivot point
        var centerX = 0;
        var centerY = 0;
        for(let i = 0; i < 4; i++) {
            centerX += this.blocks[i].x;
            centerY += this.blocks[i].y;
        }
        centerX = Math.round(centerX / 4.0);
        centerY = Math.round(centerY / 4.0);

        for(let i = 0; i < 4; i++) {
            let tmp = this.blocks[i].x;
            this.blocks[i].x = centerX - (this.blocks[i].y - centerY);
            this.blocks[i].y = centerY + (tmp - centerX);
        }
    }

    //tries to move the piece one space downwards
    //returns true if the piece successfully moved down
    //returns false if something blocked the piece from moving
    moveDown() {
        for(let i = 0; i < 4; i++) {
            let newPos = this.blocks[i].y + 1;
            if(newPos == 20 || table[this.blocks[i].x][newPos] != 0) {
                //block below is either past the bottom or occupied
                return false;
            }
        }

        for(let i = 0; i < 4; i++) {
            this.blocks[i].y++;
        }
        
        //reset the auto drop interval
        this.lastDropTime = new Date().getTime();
        return true;
    }

    //same thing as moveDown(), but automatically finalizes the piece if needed
    drop() {
        if(!this.moveDown()) {
            this.finalize();
            return false;
        }

        return true;
    }

    //drop the piece as far down as possible
    dropFull() {
        //this will also automatically generate the new piece
        //by calling finalize
        while(this.drop()) {}
    }

    //return a new Active Piece object that has been dropped all the way down
    //used for rendering the shadow piece in the game
    getDroppedObj() {
        let newObj = new ActivePiece();
        newObj.type = this.type;
        newObj.blocks = [];
        for(let i = 0; i < 4; i++) {
            //copy coordinate object
            newObj.blocks.push(Object.assign({}, this.blocks[i]));
        }

        while(newObj.moveDown()) {}
        return newObj;
    }

    //set the current active piece into place
    //and generates a new active piece
    finalize() {
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
