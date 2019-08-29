//handles storage and updating of the opponent boards

import { updateOpponentWidth } from "./ui";

let opponents = new Map();

let numOpponents = 0;

export function playerJoin(player) {
    opponents.set(player.id, player);
    numOpponents++;
    updateOpponentWidth();
}

export function playerLeave(id) {
    opponents.delete(id);
    numOpponents--;
    updateOpponentWidth();
}

export function playerUpdate(player) {
    opponents.set(player.id, player);
    console.log("update from " + player.name);
}

//returns an iterator for the tables (not an array)
export function getOpponentTables() {
    return opponents.values();
}

export function getNumOpponents() {
    return numOpponents;
}

/*function emptyTable() {
    let table = new Array(10);
    for(let x = 0; x < 10; x++) {
        table[x] = new Array(20).fill(0);
    }
    return table;
}*/
