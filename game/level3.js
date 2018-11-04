var level3State = {
  gameOver: false,
  lado: true,

  create: function create() {
    var enemiesMovement = [];
    var enemies = [];
    var door;
    var stars;
    var platforms;
    var cursors;
    var score = 0;
    var scoreText;
    
    //  A simple background for our game
    this.add.image(600, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'bigGround').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 450, 'ground');
    platforms.create(50, 400, 'ground');
    platforms.create(400, 280, 'halfGround');
    platforms.create(630, 360, 'halfGround');
    platforms.create(790, 410, 'wall');
    platforms.create(750, 220, 'ground');

    door = this.physics.add.image(865, 505, 'door');
    door.setCollideWorldBounds(true);

    // The player and its settings
    this.player = this.physics.add.sprite(118, 450, 'dude');

    // The enemy and its settings
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

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    //  Enemy physics properties. Give the little guy a slight bounce.
    enemies.forEach(e => {
      e.setBounce(0.2);
      e.setCollideWorldBounds(true);
    })
    
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('mainWalk', { start: 39, end: 75 }),
      frameRate: 50,
      repeat: -1
    });

    this.anims.create({
      key: 'turnRight',
      frames: this.anims.generateFrameNumbers('mainWait', { start: 0, end: 37 }),
      frameRate: 50,
      repeat: -1
    });

    this.anims.create({
      key: 'turnLeft',
      frames: this.anims.generateFrameNumbers('mainWait', { start: 39, end: 75 }),
      frameRate: 50,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('mainWalk', { start: 0, end: 37 }),
      frameRate: 50,
      repeat: -1
    });

    this.anims.create({
      key: 'die',
      frames: this.anims.generateFrameNumbers('mainDie', { start: 0, end: 37 }),
      frameRate: 50,
      repeat: 0
    });

    this.anims.create({
      key: 'waitEnemy',
      frames: this.anims.generateFrameNumbers('enemyWait', { start: 0, end: 25 }),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: 'waitLeft',
      frames: this.anims.generateFrameNumbers('enemyWait', { start: 26, end: 50 }),
      frameRate: 20,
      repeat: -1
    });

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({ key: 'star', repeat: 18, setXY: { x: 12, y: 0, stepX: 70 } });

    //  Give each star a slightly different bounce
    stars.children.iterate(child => child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)));

    //  The score
    scoreText = this.add.text(16, 16, 'Pontuação: 0', { fontSize: '32px', fill: '#FFF' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(door, platforms);
    enemies.forEach(e => {
      this.physics.add.collider(e, platforms);
      this.physics.add.collider(this.player, e, (player, enemy) => {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('die', false);
        this.gameOver = true;
      }, null, this);
      enemiesMovement.push({ identifier: e.identifier, right: true });
      setInterval(() => {
        var myEnemy = enemiesMovement.find(enemy => enemy.identifier === e.identifier);
        if (myEnemy.right) {
          e.anims.play('waitEnemy', true);
          e.setVelocityX(120);
          myEnemy.right = false;
        } else {
          e.anims.play('waitLeft', true);
          e.setVelocityX(-120);
          myEnemy.right = true;
        }
      }, 1200);
    });
    
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(this.player, stars, (player, star) => {
      star.disableBody(true, true);
      score += 10;
      scoreText.setText('Pontuação: ' + score);
    }, null, this);

    this.physics.add.overlap(this.player, door, () => this.scene.start('level4'), null, this);
  },

  update: function update() {
    if (this.gameOver) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.lado = false;
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.lado = true;
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      if (this.lado) {
        this.player.anims.play('turnRight', true);
      } else {
        this.player.anims.play('turnLeft', true);
      }
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-320);
    }
  },

  paused: function paused() {
    // this.pausedIndicator.exists = true;
    // this.world.alpha = 0.5;
  },

  resumed: function resumed() {
    // this.pausedIndicator.exists = false;
    // this.world.alpha = 1;
  },

  shutdown: function shutdown() {
    // During state shutdown, the World is emptied but the Stage is not.
    // So we remove the pause indicator ourselves.
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