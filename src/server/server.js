const express = require("express");
const socket = require('socket.io');
const app = express();
let Player = require("./Player");
const csv = require('csv-parser')
const fs = require('fs')
let server = app.listen(80);
app.use(express.static("public"));


let io = socket(server);
let players = [];
const words = [];
preloadWords()

setInterval(updateGame, 16);

io.sockets.on("connection", socket => {
  console.log("lengthofwords", words.length)
  console.log(`New connection ${socket.id}`);
  players.push(new Player(socket.id));
  deal(socket.id)

  socket.on("disconnect", () => {
    io.sockets.emit("disconnect", socket.id);
    players = players.filter(player => player.id !== socket.id);
  });

  socket.on("deal", data => {
    console.log("deal", data)
    deal(data.playerID, data.Count)
  });

  socket.on("play", data => {
    console.log("play", data)
    play(data.playerID, data.playedWords)
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


function getDealtWords(count) {
  dealtWords = []
  for (let i = 0; i < count; i++) {
    j = Math.floor(Math.random()*words.length)
    dealtWords.push(words[j])
    words.splice(j, 1);
  }
  return dealtWords
}

function deal(playedID, count = 5) {
  var currentPlayer = players.filter(function(player) {
    return player.id === playedID;
  })[0];
  let dealtWords = getDealtWords(count)
  console.log("before", currentPlayer.words)
  currentPlayer.deal(dealtWords)
  console.log("after", currentPlayer.words)
  io.sockets.emit("dealt", currentPlayer);
}

function play(playedID, words) {
  var currentPlayer = players.filter(function(player) {
    return player.id === playedID;
  })[0];
  data = {}
  data.player = currentPlayer
  data.words = words
  io.sockets.emit("played", data);
}








