var level7State = {
  create: function create() {
    createVariables();
    this.add.image(600, 300, 'day7');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'bigGround').setScale(2).refreshBody();
    platforms.create(100, 150, 'ground');
    platforms.create(400, 150, 'ground');
    platforms.create(900, 150, 'ground');
    platforms.create(1200, 150, 'ground');
    platforms.create(100, 250, 'ground');
    platforms.create(400, 250, 'ground');
    platforms.create(900, 250, 'ground');
    platforms.create(1200, 250, 'ground');
    platforms.create(100, 350, 'ground');
    platforms.create(400, 350, 'ground');
    platforms.create(900, 350, 'ground');
    platforms.create(1200, 350, 'ground');
    platforms.create(100, 450, 'ground');
    platforms.create(400, 450, 'ground');
    platforms.create(900, 450, 'ground');
    platforms.create(1200, 450, 'ground');

    door = this.physics.add.image(1250, 405, 'door');

    this.player = this.physics.add.sprite(40, 100, 'mainWait');

    var enemy1 = this.physics.add.sprite(100, 150, 'enemyWait');
    enemy1.identifier = 'primeiro';
    enemies.push(enemy1);
    var enemy2 = this.physics.add.sprite(400, 150, 'enemyWait');
    enemy2.identifier = 'segundo';
    enemies.push(enemy2);
    var enemy3 = this.physics.add.sprite(800, 150, 'enemyWait');
    enemy3.identifier = 'terceiro';
    enemies.push(enemy3);
    var enemy4 = this.physics.add.sprite(1100, 150, 'enemyWait');
    enemy4.identifier = 'quarto';
    enemies.push(enemy4);
    var enemy5 = this.physics.add.sprite(800, 50, 'enemyWait');
    enemy5.identifier = 'quinto';
    enemies.push(enemy5);
    var enemy6 = this.physics.add.sprite(1100, 50, 'enemyWait');
    enemy6.identifier = 'sexto';
    enemies.push(enemy6);
    var enemy7 = this.physics.add.sprite(100, 250, 'enemyWait');
    enemy7.identifier = 'setimo';
    enemies.push(enemy7);
    var enemy8 = this.physics.add.sprite(400, 250, 'enemyWait');
    enemy8.identifier = 'oitavo';
    enemies.push(enemy8);
    var enemy9 = this.physics.add.sprite(800, 250, 'enemyWait');
    enemy9.identifier = 'nono';
    enemies.push(enemy9);
    var enemy10 = this.physics.add.sprite(1100, 250, 'enemyWait');
    enemy10.identifier = 'decimo';
    enemies.push(enemy10);
    var enemy11 = this.physics.add.sprite(100, 350, 'enemyWait');
    enemy11.identifier = 'decimoprimeiro';
    enemies.push(enemy11);
    var enemy12 = this.physics.add.sprite(400, 350, 'enemyWait');
    enemy12.identifier = 'decimosegundo';
    enemies.push(enemy12);
    var enemy13 = this.physics.add.sprite(100, 350, 'enemyWait');
    enemy13.identifier = 'decimoterceiro';
    enemies.push(enemy13);
    var enemy14 = this.physics.add.sprite(400, 350, 'enemyWait');
    enemy14.identifier = 'decimoquarto';
    enemies.push(enemy14);

    espinhos.push(this.physics.add.group({ key: 'espinhos', repeat: 30, setXY: { x: 30, y: 515, stepX: 45 } }));

    coins.push(this.physics.add.group({ key: 'coin', repeat: 15, setXY: { x: 740, y: 50, stepX: 45 } }));
    coins.push(this.physics.add.group({ key: 'coin', repeat: 15, setXY: { x: 740, y: 150, stepX: 45 } }));
    coins.push(this.physics.add.group({ key: 'coin', repeat: 15, setXY: { x: 740, y: 250, stepX: 45 } }));
    coins.push(this.physics.add.group({ key: 'coin', repeat: 12, setXY: { x: 20, y: 150, stepX: 45 } }));
    coins.push(this.physics.add.group({ key: 'coin', repeat: 12, setXY: { x: 20, y: 250, stepX: 45 } }));
    coins.push(this.physics.add.group({ key: 'coin', repeat: 12, setXY: { x: 20, y: 350, stepX: 45 } }));

    addAnimations(this.anims);
    addEvents(this, 'level7', 'level8');
  },

  update: function update() {
    updateScene(this);
  },

  paused: function paused() { },

  resumed: function resumed() { },

  shutdown: function shutdown() {
    this.pausedIndicator.destroy();
  },
  
  // Restart is shutdown -> init -> preload -> create, etc.
  restart: function restart() {
    console.log('Restart');
    this.scene.restart();
  },

  quit: function quit() {
    console.log('Quit');
    this.scene.start('menu');
  }
};