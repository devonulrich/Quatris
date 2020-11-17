# Quatris!
![Demo Img](/media/quatris.png)

An open source Tetris-like game, built for live multiplayer battles with up to 10 players.

The codebase is super lightweight and is built with HTML/CSS/JS, Express, and socket.io. 
Installing & running is fairly simple: just clone the repository, run `npm install` to get
the environment set up, and start the dev server with `node src/server/app.js`!

**Note**: Unfortunately I don't have a good space to host the Quatris server right now,
so the only way to play it is to download the source code yourself and self-host a private server.

## Playing
The multiplayer room will always have a host who gets to choose when to start a round of
Quatris. When the game starts, everyone will be given the same random sequence of
pieces, and each player's goal is to survive for as long as possible.

Controls:
* Arrow keys for moving your piece
* Spacebar for hard dropping the current piece into place
* C for saving the current piece
