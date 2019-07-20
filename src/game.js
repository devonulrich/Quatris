//this code is in charge of the game logic and board for the player

let table;

export function initTable() {
    table = new Array(9);
    for(let x = 0; x < 9; x++) {
        table[x] = new Array(20).fill(0);
    }
}

export function getTable() {
    return table;
}
