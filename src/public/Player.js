class Player {
  constructor(player) {
    this.x = player.x;
    this.y = player.y;
    this.id = player.id;
    this.rgb = player.rgb;
    this.words = player.words;
    this.play = ""
  }

  draw() {
    fill(this.rgb.r, this.rgb.g, this.rgb.b);
    ellipse(this.x, this.y, 20, 20)
  }

  drawCards(player) {
    this.words = player.words;
  }
}


