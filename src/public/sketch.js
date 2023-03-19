const socket = io.connect();

let players = [];

const width = window.innerWidth;
const height = window.innerHeight;

socket.on("heartbeat", players => updatePlayers(players));
socket.on("disconnect", playerId => removePlayer(playerId));

function setup() {
  createCanvas(width, height);
}

function draw() {
  players.forEach(player => player.draw());
  console.log(players)
}

// GamePlay - Players
function updatePlayers(serverPlayers) {
  for (let i = 0; i < serverPlayers.length; i++) {
    let playerFromServer = serverPlayers[i];
    if (!playerExists(playerFromServer)) {
      player = new Player(playerFromServer)
      players.push(player);
    }
  }
}

function playerExists(playerFromServer) {
  for (let i = 0; i < players.length; i++) {
    if (players[i].id === playerFromServer.id) {
      return true;
    }
  }
  return false;
}

function removePlayer(playerId) {
  players = players.filter(player => player.id !== playerId);
  clear()
}