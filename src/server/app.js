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

    gamedata.set(socket.id, []);

    socket.broadcast.emit("JOIN", socket.id);

    socket.on('disconnect', function() {
        //console.log("disconnected: " + socket.id);
        gamedata.delete(socket.id);

        socket.broadcast.emit("LEAVE", socket.id);
    });

    socket.on("CL_UPDATE", function(data) {
        //console.log(socket.id + " sent update");
        gamedata.set(socket.id, data);

        //update all other players
        socket.broadcast.emit("UPDATE", [socket.id, data]);
    });
});

/*setInterval(sendUpdate, 1000 / 30);

function sendUpdate() {
    let packet = {};
    //probably not efficient -- research!
    //maybe use broadcast when a a client sends an update:
    //    just update all other clients with the new table
    packet.players = Array.from(gamedata.keys());
    packet.tables = Array.from(gamedata.values());
    io.emit("UPDATE", packet);
}*/
