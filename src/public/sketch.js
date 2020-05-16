const socket = io.connect('http://localhost');

let players = [];

socket.on("heartbeat", players => updatePlayers(players));
socket.on("disconnect", playerId => removePlayer(playerId));
socket.on("dealt", player => deal(player));
socket.on("played", data => played(data));



function setup() {
  createCanvas(400, 800);
  players.forEach(player => player.drawCards());

  input = createInput();
  input.position(200, 580);
  button = createButton('deal');
  button.position(300, 580);
  button.mousePressed(requestDeal);

  button = createButton('play');
  button.position(300, 600);
  button.mousePressed(play);
}

function requestDeal() {
  const count = input.value();
  let data = {
    playerID: socket.id,
    count: count
  }
  socket.emit('deal', data);
}

function playCard(word) {
  // this.word = word
  console.log("playing", word)
}

function draw() {
  noStroke()
  fill(220);
  rect(0, 0, 400, 400);
  fill(245, 245, 220);
  rect(0, 400, 400, 400);

  fill(20,80,90);
  textFont("Fjalla One");
  textSize(56);
  text("My",200,470);
  text(" Hand",220,510);

  players.forEach(player => player.draw());
}

function updatePlayers(serverPlayers) {
  for (let i = 0; i < serverPlayers.length; i++) {
    let playerFromServer = serverPlayers[i];
    if (!playerExists(playerFromServer)) {
      players.push(new Player(playerFromServer));
    }
  }
}

function deal(player) {
  redraw();
  console.log("hearing")
  console.log(player.id)
  for(p of players) {
    if(p.id == player.id) {
      p.drawCards(player)
      return true;
    }
  }
}

function playerExists(playerFromServer) {
  for (let i = 0; i < players.length; i++) {
    if (players[i].id === playerFromServer) {
      return true;
    }
  }
  return false;
}

function removePlayer(playerId) {
  players = players.filter(player => player.id !== playerId);
}

function play() {
  console.log("play")
  let playedWords = []
  for(p of players) {
    if(p.id == socket.id) {
      playedWords = p.play
    }
  }

  console.log("play", p)

  let data = {
    playerID: socket.id,
    playedWords: playedWords
  }
  socket.emit('play', data);
}

function played(data) {
  redraw();
  console.log("played")
  fill(data.player.rgb.r, data.player.rgb.g, data.player.rgb.b);
  for (let i = 0; i < data.words; i++) {
    showPlayedWords(word[i])
  }
}

function showPlayedWords(word) {
  this.x = Math.random() * 1000 + 400;
  this.y = Math.random() * 800 + 1;
  textSize(48);
  text(word,x,y);
}
