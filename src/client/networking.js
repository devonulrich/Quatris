import io from "socket.io-client";
import { getTable } from "./game";
import { playerJoin, playerLeave, playerUpdate } from "./opponents";
import { setHost } from "./ui";

let socket;

export function initNetworking() {
    socket = io();
    console.log("connected to server");
    socket.on("HOST", setHost);
    socket.on("JOIN", playerJoin);
    socket.on("UPDATE", playerUpdate);
    socket.on("LEAVE", playerLeave);
}

export function joinGame(username) {
    socket.emit("NAME", username);
}

export function sendUpdate() {
    socket.emit("CL_UPDATE", getTable());
}
