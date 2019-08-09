import io from "socket.io-client";
import { getTable } from "./game";

let socket;

export function initNetworking() {
    socket = io();
    console.log("connected to server");
    socket.on("UPDATE", update);
}

export function sendUpdate() {
    socket.emit("CL_UPDATE", getTable());
}

function update(data) {
    console.log("received update: " + data.players);
}
