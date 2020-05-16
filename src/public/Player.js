class Player {
  constructor(player) {
    this.x = player.x;
    this.y = player.y;
    this.id = player.id;
    this.rgb = player.rgb;
    this.words = player.words;
    this.play = []
  }

  draw() {
    fill(this.rgb.r, this.rgb.g, this.rgb.b);
    circle(this.x, this.y, 20);
    this.displayCards()
  }

  drawCards(player) {
    this.play = []
    this.words = player.words;
    console.log(this.id, this.words)
    this.displayCards()
  }

  displayCards() {
    for (let i = 0; i < this.words.length; i++) {
      button = createButton(this.words[i]);
      button.position(0, 400+(40*i));
      button.size(100,40);
      button.style("background-color","#ffd9cc");
      button.mousePressed(() => {
        this.play.push(this.words[i])
        button.style("background-color","red");
      });
    }
  }
}