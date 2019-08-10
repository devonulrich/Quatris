import io from "socket.io-client";
import { getTable } from "./game";
import { playerJoin, playerLeave, playerUpdate } from "./opponents";

let socket;

export function initNetworking() {
    socket = io();
    console.log("connected to server");
    socket.on("JOIN", playerJoin);
    socket.on("UPDATE", data => playerUpdate(data[0], data[1]));
    socket.on("LEAVE", playerLeave);
}

export function sendUpdate() {
    socket.emit("CL_UPDATE", getTable());
}

function update(data) {
    console.log("received update: " + data[1][1][19]);
}
