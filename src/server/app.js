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

//create new data structure?
let gamedata = new Map();

let host = undefined;

//TODO: split up into separate functions
io.on('connection', function(socket) {
    console.log("connected: " + socket.id + ", host is " + host);

    let client = new Client(socket.id);
    gamedata.set(socket.id, client);

    //console.log(JSON.stringify(client));

    if(host == undefined) {
        host = socket.id;
        client.isHost = true;
        socket.emit("HOST", true);
    } else {
        for(let id of gamedata.keys()) {
            if(id == socket.id) continue;

            let cl = gamedata.get(id);
            if(cl.isPlaying) socket.emit("JOIN", cl);
        }
    }

    socket.on('disconnect', function() {
        console.log("disconnected: " + socket.id);
        gamedata.delete(socket.id);

        if(client.isHost) {
            // must replace host
            if(gamedata.size == 0) {
                host = undefined;
            } else {
                host = gamedata.keys().next().value;
                io.to(host).emit("HOST", true);
            }
        }

        if(client.isPlaying) socket.broadcast.emit("LEAVE", socket.id);
    });

    socket.on("NAME", function(name) {
        //properties of client change in the map too
        client.name = name;
        client.isPlaying = true;
        socket.broadcast.emit("JOIN", client);

        console.log(name + " joined");
    });

    socket.on("HOST_START", function() {
        io.emit("START", Math.random());
        console.log("game started");
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
        this.isHost = false;
        this.data = this.emptyTable();
    }

    emptyTable() {
        let table = new Array(10);
        for(let x = 0; x < 10; x++) {
            table[x] = new Array(20).fill(0);
        }
        return table;
    }
}
