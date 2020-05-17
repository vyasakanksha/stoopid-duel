const socket = io.connect();

let players = [];

const width = window.innerWidth;
const height = window.innerHeight;

socket.on("heartbeat", players => updatePlayers(players));
socket.on("disconnect", playerId => removePlayer(playerId));
socket.on("dealt", player => deal(player));
socket.on("played", data => played(data));

function setup() {
  createCanvas(width, height);

  input = createInput();
  input.position(200, 580);
  button = createButton('deal');
  button.position(300, 580);
  button.size(100,40);
  button.style("background-color","red");

  button.mousePressed(requestDeal);

  button = createButton('reset');
  button.position(width - 100, 10);
  button.size(100,40);
  button.style("background-color","red");
  button.mousePressed(empty);

  fill(220);
  fill(220);
  rect(0, 0, width/2, height/2);
  fill(245, 245, 220);
  rect(0, height/2, width/2, height/2);
}

function draw() {
  players.forEach(player => player.draw());
}

// GamePlay
function updatePlayers(serverPlayers) {
  for (let i = 0; i < serverPlayers.length; i++) {
    let playerFromServer = serverPlayers[i];
    if (!playerExists(playerFromServer)) {
      players.push(new Player(playerFromServer));
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
}

function requestDeal() {
  const count = input.value();
  let data = {
    playerID: socket.id,
    count: count
  }
  socket.emit('deal', data);
}

function deal(player) {
  for(p of players) {
    if(p.id == player.id) {
      p.drawCards(player)
      return true;
    }
  }
}

function played(player) {
  redraw();
  fill(player.rgb.r, player.rgb.g, player.rgb.b);
  showPlayedWords(player.play)
}

function showPlayedWords(word) {
  textFont("Fjalla One");
  this.x = Math.random() * 600 + 300
  this.y = Math.random() * 800 + 20
  textSize(48);
  text(word,x,y);
}

function empty() {
  fill(255);
  rect(400, 0, 1000, 800);
}
