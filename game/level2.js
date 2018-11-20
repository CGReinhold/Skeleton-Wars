var level2State = {
  create: function create() {
    createVariables();
    this.add.image(600, 300, 'day2');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'bigGround').setScale(2).refreshBody();
    platforms.create(100, 650, 'wall');
    platforms.create(250, 600, 'wall');
    platforms.create(400, 550, 'wall');
    platforms.create(550, 500, 'wall');
    platforms.create(700, 450, 'wall');
    platforms.create(850, 400, 'wall');
    platforms.create(1000, 450, 'wall');
    platforms.create(1150, 500, 'wall');
    platforms.create(810, 360, 'quarterGround');
    platforms.create(735, 460, 'quarterGround');

    door = this.physics.add.image(1250, 505, 'door');

    espinhos.push(this.physics.add.group({ key: 'espinhos', repeat: 2, setXY: { x: 135, y: 505, stepX: 40 } }));
    espinhos.push(this.physics.add.group({ key: 'espinhos', repeat: 2, setXY: { x: 285, y: 505, stepX: 40 } }));
    espinhos.push(this.physics.add.group({ key: 'espinhos', repeat: 2, setXY: { x: 435, y: 505, stepX: 40 } }));
    espinhos.push(this.physics.add.group({ key: 'espinhos', repeat: 2, setXY: { x: 585, y: 505, stepX: 40 } }));
    espinhos.push(this.physics.add.group({ key: 'espinhos', repeat: 2, setXY: { x: 735, y: 505, stepX: 40 } }));
    espinhos.push(this.physics.add.group({ key: 'espinhos', repeat: 2, setXY: { x: 885, y: 505, stepX: 40 } }));
    espinhos.push(this.physics.add.group({ key: 'espinhos', repeat: 2, setXY: { x: 1035, y: 505, stepX: 40 } }));

    this.player = this.physics.add.sprite(50, 450, 'mainWait');

    coins.push(this.physics.add.sprite(750, 350, 'coin'));

    addAnimations(this.anims);
    addEvents(this, 'level2', 'level3');
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