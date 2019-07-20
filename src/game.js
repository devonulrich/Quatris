//this code is in charge of the game logic and board for the player

let table;
export let activePiece;

export function initTable() {
    table = new Array(10);
    for(let x = 0; x < 10; x++) {
        table[x] = new Array(20).fill(0);
    }

    activePiece = new ActivePiece();
    console.log(activePiece.blocks[0]);
}

export function getTable() {
    return table;
}

class ActivePiece {
    constructor() {
        this.type = Math.floor(Math.random() * 7 + 1);
        this.blocks = getPieceCoords(this.type);
    }

    moveSideways(direction) {
        let doMove = true;
        for(let i = 0; i < 4; i++) {
            let newPos = this.blocks[i].x + direction;
            if(newPos < 0 || newPos >= 10) doMove = false;
        }

        if(!doMove) return;

        for(let i = 0; i < 4; i++) {
            this.blocks[i].x += direction;
        }
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
