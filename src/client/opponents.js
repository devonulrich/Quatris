//handles storage and updating of the opponent boards

let tables = new Map();

export function playerJoin(id) {
    tables.set(id, emptyTable());
}

export function playerLeave(id) {
    tables.delete(id);
}

export function playerUpdate(id, data) {
    tables.set(id, data);
}

//returns an iterator for the tables (not an array)
export function getOpponentTables() {
    return tables.values();
}

function emptyTable() {
    let table = new Array(10);
    for(let x = 0; x < 10; x++) {
        table[x] = new Array(20).fill(0);
    }
    return table;
}
