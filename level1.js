var level1State = {
  create: function create() {
    createVariables();
    this.add.image(600, 300, 'day1');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'bigGround').setScale(2).refreshBody();
    platforms.create(100, 150, 'ground');
    platforms.create(400, 150, 'ground');
    platforms.create(700, 150, 'ground');
    platforms.create(1000, 150, 'ground');
    platforms.create(300, 250, 'ground');
    platforms.create(500, 250, 'ground');
    platforms.create(800, 250, 'ground');
    platforms.create(1100, 250, 'ground');
    platforms.create(100, 350, 'ground');
    platforms.create(400, 350, 'ground');
    platforms.create(700, 350, 'ground');
    platforms.create(1000, 350, 'ground');
    platforms.create(300, 450, 'ground');
    platforms.create(500, 450, 'ground');
    platforms.create(800, 450, 'ground');
    platforms.create(1100, 450, 'ground');

    door = this.physics.add.image(1250, 505, 'door');
    
    this.player = this.physics.add.sprite(40, 100, 'mainWait');

    var enemy1 = this.physics.add.sprite(400, 450, 'enemyWait');
    enemy1.identifier = 'primeiro';
    enemies.push(enemy1);
    var enemy2 = this.physics.add.sprite(800, 400, 'enemyWait');
    enemy2.identifier = 'segundo';
    enemies.push(enemy2);
    var enemy3 = this.physics.add.sprite(200, 150, 'enemyWait');
    enemy3.identifier = 'terceiro';
    enemies.push(enemy3);
    var enemy4 = this.physics.add.sprite(700, 50, 'enemyWait');
    enemy4.identifier = 'quarto';
    enemies.push(enemy4);
    
    coins.push(this.physics.add.sprite(30, 320, 'coin'));
    coins.push(this.physics.add.sprite(750, 350, 'coin'));
    coins.push(this.physics.add.sprite(900, 130, 'coin'));

    addAnimations(this.anims);
    addEvents(this, 'level1', 'level2');
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