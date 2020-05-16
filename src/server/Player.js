class Player {
  constructor(id) {
    this.x = Math.random() * 400 + 1;
    this.y = Math.random() * 400 + 1;
    this.id = id;
    this.words = []

    this.rgb = {
      r: Math.random() * 255,
      g: Math.random() * 255,
      b: Math.random() * 255,
    }
  }

  deal(dealtWords) {
    this.words = this.words.concat(dealtWords)
  }
}

module.exports = Player;