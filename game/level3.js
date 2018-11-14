var level3State = {
  create: function create() {
    createVariables();
    this.add.image(600, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'bigGround').setScale(2).refreshBody();
    platforms.create(600, 450, 'ground');
    platforms.create(50, 400, 'ground');
    platforms.create(400, 280, 'halfGround');
    platforms.create(630, 360, 'halfGround');
    platforms.create(790, 410, 'wall');
    platforms.create(750, 220, 'ground');

    door = this.physics.add.image(865, 505, 'door');
    door.setCollideWorldBounds(true);

    this.player = this.physics.add.sprite(118, 450, 'mainWait');

    var enemy1 = this.physics.add.sprite(300, 450, 'enemyWait');
    enemy1.identifier = 'primeiro';
    enemies.push(enemy1);
    var enemy2 = this.physics.add.sprite(700, 400, 'enemyWait');
    enemy2.identifier = 'segundo';
    enemies.push(enemy2);
    var enemy3 = this.physics.add.sprite(100, 150, 'enemyWait');
    enemy3.identifier = 'terceiro';
    enemies.push(enemy3);
    var enemy4 = this.physics.add.sprite(600, 50, 'enemyWait');
    enemy4.identifier = 'quarto';
    enemies.push(enemy4);

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    addAnimations(this.anims);

    var coin1 = this.physics.add.sprite(30, 320, 'coin');
    coins.push(coin1);
    var coin2 = this.physics.add.sprite(750, 350, 'coin');
    coins.push(coin2);
    var coin3 = this.physics.add.sprite(900, 130, 'coin');
    coins.push(coin3);

    addEvents(this, 'level3', 'level4');
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