var loseState = {
  create: function create() {
    this.title = this.add.text(450, 100, 'Skeleton War', { fill: 'white', font: '96px serif', strokeThickness: 3 });
    this.result = this.add.text(560, 230, 'Você morreu!', { fill: 'white', font: '50px serif', strokeThickness: 3 });
    this.point = this.add.text(590, 320, 'Pontuação: ' + score, { fill: 'white', font: '40px serif', strokeThickness: 3 });
    this.subtitle = this.add.text(650, 400, 'Iniciar', { fill: 'yellow', font: '32px sans-serif' });
    this.input.on('pointerdown', function () { this.scene.start('level1'); }, this);
  }
};