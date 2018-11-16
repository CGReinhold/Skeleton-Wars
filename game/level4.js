var level4State = {
  create: function create() {
    createVariables();
    this.add.image(600, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'bigGround').setScale(2).refreshBody();
    platforms.create(80, 140, 'halfGround');
    platforms.create(300, 280, 'halfGround');
    platforms.create(390, 280, 'halfGround');
    platforms.create(15, 420, 'halfGround');
    platforms.create(650, 440, 'halfGround');
    platforms.create(700, 360, 'halfGround');
    platforms.create(650, 190, 'halfGround');
    platforms.create(1150, 390, 'quarterGround');
    platforms.create(950, 304, 'quarterGround');
    platforms.create(1150, 240, 'quarterGround');
    platforms.create(400, 90, 'wall');
    platforms.create(650, 340, 'wall');
    platforms.create(900, 120, 'wall');
    platforms.create(230, 670, 'wall');
    platforms.create(430, 670, 'wall');
    platforms.create(830, 670, 'wall');
    platforms.create(1000, 670, 'wall');
    platforms.create(1200, 370, 'wall');

    door = this.physics.add.image(1250, 505, 'door');

    this.player = this.physics.add.sprite(30, 80, 'mainWait');

    var enemy1 = this.physics.add.sprite(270, 180, 'enemyWait');
    enemy1.identifier = 'primeiro';
    enemies.push(enemy1);
    
    espinhos.push(this.physics.add.group({ key: 'espinhos', repeat: 4, setXY: { x: 20, y: 505, stepX: 43 } }));
    espinhos.push(this.physics.add.group({ key: 'espinhos', repeat: 3, setXY: { x: 270, y: 505, stepX: 40 } }));
    espinhos.push(this.physics.add.group({ key: 'espinhos', repeat: 3, setXY: { x: 470, y: 505, stepX: 45 } }));
    espinhos.push(this.physics.add.group({ key: 'espinhos', repeat: 2, setXY: { x: 690, y: 505, stepX: 50 } }));
    espinhos.push(this.physics.add.group({ key: 'espinhos', repeat: 2, setXY: { x: 870, y: 505, stepX: 45 } }));
    espinhos.push(this.physics.add.group({ key: 'espinhos', repeat: 2, setXY: { x: 1040, y: 505, stepX: 55 } }));
    
    coins.push(this.physics.add.sprite(30, 320, 'coin'));
    coins.push(this.physics.add.sprite(700, 250, 'coin'));
    coins.push(this.physics.add.sprite(1200, 130, 'coin'));

    addAnimations(this.anims);
    addEvents(this, 'level4', 'level5');
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