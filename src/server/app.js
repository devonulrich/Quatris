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
    console.log("connected: " + socket.id);

    gamedata.set(socket.id, []);

    socket.on('disconnect', function() {
        console.log("disconnected: " + socket.id);
        gamedata.delete(socket.id);
    });

    socket.on("CL_UPDATE", function(data) {
        console.log(socket.id + " sent update");
        gamedata.set(socket.id, data);
        console.log(gamedata.get(socket.id));
    });
});

setInterval(sendUpdate, 1000 / 30);

function sendUpdate() {
    io.emit("UPDATE", "test");
}
