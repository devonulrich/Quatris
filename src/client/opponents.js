//handles storage and updating of the opponent boards

let opponents = new Map();

export function playerJoin(player) {
    opponents.set(player.id, player);
}

export function playerLeave(id) {
    opponents.delete(id);
}

export function playerUpdate(player) {
    opponents.set(player.id, player);
    console.log("update from " + player.name);
}

//returns an iterator for the tables (not an array)
export function getOpponentTables() {
    return opponents.values();
}

/*function emptyTable() {
    let table = new Array(10);
    for(let x = 0; x < 10; x++) {
        table[x] = new Array(20).fill(0);
    }
    return table;
}*/
