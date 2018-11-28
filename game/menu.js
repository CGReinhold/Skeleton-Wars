var menuState = {
  create: function create() {
    this.title = this.add.text(450, 200, 'Skeleton War', { fill: 'white', font: '96px serif', strokeThickness: 3 });
    this.subtitle = this.add.text(650, 320, 'Iniciar', { fill: 'yellow', font: '32px sans-serif' });
    this.input.on('pointerdown', function () { this.scene.start('level3'); }, this);
  }
};