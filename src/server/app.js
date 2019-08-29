const express = require('express');
const app = express();
const socketio = require('socket.io');

const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');
const middleware = require('webpack-dev-middleware');

let compiler = webpack(webpackConfig);
app.use(middleware(compiler));
let server = app.listen(8080, () => console.log("running"));

let io = socketio(server);

let gamedata = new Map();

io.on('connection', function(socket) {
    //console.log("connected: " + socket.id);

    let client = new Client(socket.id);
    gamedata.set(socket.id, client);

    for(let id of gamedata.keys()) {
        if(id == socket.id) continue;

        let cl = gamedata.get(id);
        if(cl.isPlaying) socket.emit("JOIN", cl);
    }

    socket.on('disconnect', function() {
        //console.log("disconnected: " + socket.id);
        gamedata.delete(socket.id);

        socket.broadcast.emit("LEAVE", socket.id);
    });

    socket.on("NAME", function(name) {
        client.name = name;
        client.isPlaying = true;
        socket.broadcast.emit("JOIN", client);
    });

    socket.on("CL_UPDATE", function(data) {
        client.data = data;
        socket.broadcast.emit("UPDATE", client);
    });
});

class Client {
    constructor(id) {
        this.id = id;
        this.name = undefined;
        this.isPlaying = false;
        this.data = [];
    }
}
