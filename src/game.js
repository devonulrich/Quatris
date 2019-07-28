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

//checks the table for any lines that need to be cleared
function checkTable() {
    for(let y = 0; y < 20; y++) {
        let isFullRow = true;
        for(let x = 0; x < 10; x++) {
            if(table[x][y] == 0) {
                isFullRow = false;
                break;
            }
        }

        if(isFullRow) {
            //must clear this line
            clearLine(y);
        }
    }
}

function clearLine(y) {
    for(let x = 0; x < 10; x++) {
        table[x].splice(y, 1);
        table[x].unshift(0);
    }
}

class ActivePiece {
    constructor() {
        this.type = Math.floor(Math.random() * 7 + 1);
        this.blocks = getPiece(this.type);

        this.pivot = getPivot(this.type);
        this.direction = 1;
        this.turns = 0;

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
        this.pivot.x += direction;
    }

    //rotates the piece depending on its pivot and restrictions
    rotate() {
        let centerX = this.pivot.x;
        let centerY = this.pivot.y;

        for(let i = 0; i < 4; i++) {
            let tmp = this.blocks[i].x;
            this.blocks[i].x = Math.floor(centerX - (this.blocks[i].y - centerY)* this.direction);
            this.blocks[i].y = Math.floor(centerY + (tmp - centerX)* this.direction);
        }

        this.turns += this.direction;
        if(this.pivot.limit && this.turns == 1) this.direction = -1;
        if(this.pivot.limit && this.turns == -1) this.direction = 1;
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
        this.pivot.y++;
        
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

        checkTable();

        activePiece = new ActivePiece();
    }
}

function getPiece(type) {
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
        return [{x: 3, y: 0},
                {x: 3, y: 1},
                {x: 4, y: 1},
                {x: 5, y: 1}];
	case 4:
		return [{x: 3, y: 1},
                {x: 4, y: 1},
                {x: 5, y: 1},
                {x: 5, y: 0}];
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

//when limit is true, then the block can only move
//back and forth between two rotations (the rotation button will
//flip between clockwise and counterclockwise). Otherwise,
//the piece will continuously rotate clockwise
function getPivot(type) {
    switch(type) {
    case 1: return {x: 4, y: 1, limit: true};
    case 2: return {x: 4, y: 1, limit: true};
    case 3: return {x: 4, y: 1, limit: false};
    case 4: return {x: 4, y: 1, limit: false};
    case 5: return {x: 4, y: 0, limit: true};
    case 6: return {x: 4, y: 1, limit: false};
    default:
    case 7: return {x: 4.5, y: 0.5, limit: true};
    }
}
