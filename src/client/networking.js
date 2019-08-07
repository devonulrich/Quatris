import io from "socket.io-client";

let socket;

export function initNetworking() {
    socket = io();
    console.log("connected to server");
    socket.on("UPDATE", update);
}

function update(data) {
    console.log("received update: " + data[1][1]);
}
