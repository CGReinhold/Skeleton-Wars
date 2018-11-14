var level5State = {
  create: function create() {
    createVariables();
    this.add.image(600, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'bigGround').setScale(2).refreshBody();
    platforms.create(60, 270, 'halfGround');
    platforms.create(260, 370, 'halfGround');
    platforms.create(460, 270, 'halfGround');
    platforms.create(460, 470, 'halfGround');
    platforms.create(660, 170, 'halfGround');
    platforms.create(660, 370, 'halfGround');
    platforms.create(960, 370, 'halfGround');
    platforms.create(1230, 290, 'halfGround');
    platforms.create(744, 370, 'wall');
    platforms.create(944, 170, 'wall');
    platforms.create(1150, 660, 'wall');
    platforms.create(1150, 450, 'halfGround');
    
    door = this.physics.add.image(1200, 505, 'door');
    door.setCollideWorldBounds(true);

    this.player = this.physics.add.sprite(40, 220, 'mainWait');

    var enemy1 = this.physics.add.sprite(800, 450, 'enemyWait');
    enemy1.identifier = 'primeiro';
    enemies.push(enemy1);
    var enemy2 = this.physics.add.sprite(960, 400, 'enemyWait');
    enemy2.identifier = 'segundo';
    enemies.push(enemy2);
    
    var coin1 = this.physics.add.sprite(500, 430, 'coin');
    coins.push(coin1);
    var coin2 = this.physics.add.sprite(400, 430, 'coin');
    coins.push(coin2);
    var coin3 = this.physics.add.sprite(1200, 230, 'coin');
    coins.push(coin3);

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    addAnimations(this.anims);
    
    var espinho = this.physics.add.group({ key: 'espinhos', repeat: 15, setXY: { x: 30, y: 515, stepX: 45 } });
    espinhos.push(espinho);
    
    addEvents(this, 'level5', 'level6');
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