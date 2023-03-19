const express = require("express");
const socket = require('socket.io');
const app = express();
let Player = require("./Player");
const fs = require('fs')
let server = app.listen(3000);
app.use(express.static("public"));

let io = socket(server);
let players = [];
const words = [];
preloadWords()

setInterval(updateGame, 16);

io.sockets.on("connection", socket => {
  console.log(`New connection ${socket.id}`);
  players.push(new Player(socket.id));
  deal(socket.id, 7)

  socket.on("disconnect", () => {
    io.sockets.emit("disconnect", socket.id);
    players = players.filter(player => player.id !== socket.id);
  });
});


io.sockets.on("disconnect", socket => {
  io.sockets.emit("disconnect", socket.id);

  players = players.filter(player.id !== socket.id);
});

function updateGame() {
  io.sockets.emit("heartbeat", players);
}

function preloadWords() {
  var array = fs.readFileSync('SD.txt').toString().split("\n");
  for(i in array) {
    words.push(array[i])
  }
  return words;
}