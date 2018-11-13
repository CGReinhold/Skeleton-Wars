var level6State = {
  gameOver: false,
  lado: true,
  isAttacking: false,

  create: function create() {
    var enemiesMovement = [];
    var enemies = [];
    var coins = [];
    var door;
    var espinhos = [];
    var platforms;
    var scoreText;
    var deathText;
    
    //  A simple background for our game
    this.add.image(600, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
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

    // The player and its settings
    this.player = this.physics.add.sprite(30, 450, 'dude');

    // The enemy and its settings
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

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    addAnimations(this.anims);
    
    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    var coin1 = this.physics.add.sprite(1280, 320, 'coin');
    coins.push(coin1);
    var coin2 = this.physics.add.sprite(700, 350, 'coin');
    coins.push(coin2);
    var coin3 = this.physics.add.sprite(900, 130, 'coin');
    coins.push(coin3);

    //  The score
    scoreText = this.add.text(16, 16, 'Pontuação: ' + score, { fontSize: '32px', fill: '#FFF' });
    deathText = this.add.text(16, 46, 'Mortes: ' + deaths, { fontSize: '32px', fill: '#FFF' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(door, platforms);
    enemies.forEach(e => {
      e.setBounce(0.2);
      e.setCollideWorldBounds(true);
      this.physics.add.collider(e, platforms);
      this.physics.add.collider(this.player, e, (player, enemy) => {
        if (!this.isAttacking) {
          if (deaths < MAX_DEATHS - 1) {
            deaths++;
            deathText.setText('Mortes: ' + deaths);
            this.scene.start('level6')
          } else {
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('die', false);
            this.gameOver = true;
          }
        } else {
          enemy.destroy();
        }
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
    coins.forEach(c => {
      this.physics.add.collider(c, platforms);
      //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
      this.physics.add.overlap(this.player, c, (player, coin) => {
        coin.disableBody(true, true);
        score += 10;
        scoreText.setText('Pontuação: ' + score);
      }, null, this);      
    });
    espinhos.forEach(e => {
      this.physics.add.collider(e, platforms);
      this.physics.add.overlap(this.player, e, () => {
        if (deaths < MAX_DEATHS - 1) {
          deaths++;
          deathText.setText('Mortes: ' + deaths);
          this.scene.start('level6')
        } else {
          this.physics.pause();
          player.setTint(0xff0000);
          player.anims.play('die', false);
          this.gameOver = true;
        }
      }, null, this);
    });

    this.physics.add.overlap(this.player, door, () => this.scene.start('level7'), null, this);
  },

  update: function update() {
    if (this.gameOver) {
      return;
    }

    if (this.cursors.space.isDown) {
      if (this.lado) {
        this.player.anims.play('attack', false);
      } else {
        this.player.anims.play('attackLeft', false);
      }
      this.isAttacking = true;
      setTimeout(() => {
        this.isAttacking = false;
      }, 800);
    } if (this.cursors.left.isDown && !this.isAttacking) {
      this.player.setVelocityX(-160);
      this.lado = false;
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown && !this.isAttacking) {
      this.player.setVelocityX(160);
      this.lado = true;
      this.player.anims.play('right', true);
    } else if (!this.isAttacking){
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

  paused: function paused() { },

  resumed: function resumed() { },

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