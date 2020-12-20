const app = require('express')();

const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');
const middleware = require('webpack-dev-middleware');

// webserver setup
let compiler = webpack(webpackConfig);
app.use(middleware(compiler));
let server = app.listen(3000, () => console.log("running"));

// game controller setup
let io = require('socket.io')(server);

let gamedata = new Map();
let host = undefined;

io.on('connection', (socket) => {
    console.log("connected: " + socket.id + ", host is " + host);

    let client = new Client(socket.id);
    gamedata.set(socket.id, client);

    if(host == undefined) {
        host = socket.id;
        client.currState = State.HOST_JOIN;
        socket.emit("HOST", true);
    } else {
        for(let id of gamedata.keys()) {
            if(id == socket.id) continue;

            let cl = gamedata.get(id);
            if(State.isJoined(cl.currState)) socket.emit("JOIN", cl);
        }
    }

    socket.on('disconnect', () => {
        console.log("disconnected: " + socket.id);
        gamedata.delete(socket.id);

        if(State.isHost(client.currState)) {
            // must replace host
            if(gamedata.size == 0) {
                host = undefined;
            } else {
                host = gamedata.keys().next().value;
                gamedata.get(host).isHost = true;
                let hostCl = gamedata.get(host);

                // TODO: add a makeHost() function in State
                if(State.isJoined(hostCl.currState)) {
                    hostCl.currState = State.HOST_START;
                } else {
                    hostCl.currState = State.HOST_JOIN;
                }
                io.to(host).emit("HOST", true);
            }
        }

        if(State.isJoined(client.currState)) 
            socket.broadcast.emit("LEAVE", socket.id);
    });

    socket.on("NAME", (name) => {
        //properties of client change in the map too
        client.name = name;
        if(State.isHost(client.currState)) client.currState = State.HOST_START;
        else client.currState = State.REG_START;

        socket.broadcast.emit("JOIN", client);
        socket.join("playingRoom");
        console.log(name + " joined");
    });

    socket.on("HOST_START", () => {
        io.to("playingRoom").emit("START", Math.random());
        console.log("game started");
    });

    socket.on("CL_UPDATE", (data) => {
        client.data = data;
        socket.broadcast.emit("UPDATE", client);
    });
});

const State = {
    HOST_JOIN: 1,
    REG_JOIN: 2,
    HOST_START: 3,
    REG_START: 4,
    HOST_PLAYING: 5,
    REG_PLAYING: 6,

    isJoined(state) {
        return state != State.HOST_JOIN && state != State.REG_JOIN;
    },

    isHost(state) {
        return state == State.HOST_JOIN || state == State.HOST_START ||
            state == State.HOST_PLAYING;
    },
};

class Client {
    constructor(id) {
        this.id = id;
        this.name = undefined;
        this.currState = State.REG_JOIN;
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
