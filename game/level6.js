var level6State = {
  create: function create() {
    createVariables();
    this.add.image(600, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'bigGround').setScale(2).refreshBody();
    platforms.create(100, 640, 'wall');
    platforms.create(300, 640, 'wall');
    platforms.create(700, 640, 'wall');
    platforms.create(500, 370, 'halfGround');
    platforms.create(800, 300, 'halfGround');
    platforms.create(1350, 370, 'halfGround');
    platforms.create(900, 390, 'wall');
    platforms.create(1150, 100, 'wall');
    platforms.create(1050, 640, 'wall');
    platforms.create(1200, 640, 'wall');

    door = this.physics.add.image(1250, 505, 'door');
    door.setCollideWorldBounds(true);

    this.player = this.physics.add.sprite(30, 450, 'mainWait');

    var enemy1 = this.physics.add.sprite(430, 250, 'enemyWait');
    enemy1.identifier = 'primeiro';
    enemies.push(enemy1);
    var enemy2 = this.physics.add.sprite(740, 200, 'enemyWait');
    enemy2.identifier = 'segundo';
    enemies.push(enemy2);
    
    var espinhos1 = this.physics.add.group({ key: 'espinhos', repeat: 2, setXY: { x: 140, y: 505, stepX: 55 } });
    espinhos.push(espinhos1);
    var espinhos2 = this.physics.add.group({ key: 'espinhos', repeat: 7, setXY: { x: 340, y: 505, stepX: 45 } });
    espinhos.push(espinhos2);
    var espinhos3 = this.physics.add.group({ key: 'espinhos', repeat: 2, setXY: { x: 750, y: 505, stepX: 55 } });
    espinhos.push(espinhos3);
    var espinhos4 = this.physics.add.group({ key: 'espinhos', repeat: 1, setXY: { x: 950, y: 505, stepX: 55 } });
    espinhos.push(espinhos4);
    var espinhos5 = this.physics.add.group({ key: 'espinhos', repeat: 1, setXY: { x: 1100, y: 505, stepX: 55 } });
    espinhos.push(espinhos5);

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    addAnimations(this.anims);

    var coin1 = this.physics.add.sprite(1280, 320, 'coin');
    coins.push(coin1);
    var coin2 = this.physics.add.sprite(700, 350, 'coin');
    coins.push(coin2);
    var coin3 = this.physics.add.sprite(900, 130, 'coin');
    coins.push(coin3);

    addEvents(this, 'level6', 'level7');
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