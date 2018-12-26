var level8State = {
  create: function create() {
    createVariables();
    var enemyHits = 0;
    this.add.image(600, 300, 'day8');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'bigGround').setScale(2).refreshBody();
    platforms.create(100, 150, 'ground');
    
    door = this.physics.add.image(1250, 505, 'door');

    this.player = this.physics.add.sprite(40, 100, 'mainWait');

    var enemy1 = this.physics.add.sprite(80, 350, 'bigEnemyWait');
    enemy1.identifier = '1';
    enemies.push(enemy1);
    var enemy2 = this.physics.add.sprite(300, 350, 'bigEnemyWait');
    enemy2.identifier = '2';
    enemies.push(enemy2);
    var enemy3 = this.physics.add.sprite(530, 350, 'bigEnemyWait');
    enemy3.identifier = '3';
    enemies.push(enemy3);
    var enemy4 = this.physics.add.sprite(780, 350, 'bigEnemyWait');
    enemy4.identifier = '4';
    enemies.push(enemy4);
    var enemy5 = this.physics.add.sprite(990, 350, 'bigEnemyWait');
    enemy5.identifier = '5';
    enemies.push(enemy5);

    addAnimations(this.anims);
    sword = this.sound.add('sword');
    death = this.sound.add('death');
    coinSound = this.sound.add('coinSound');
    music = this.sound.add('music');
    // music.play();
    // setInterval(() => {
    //   music.play()
    // }, 3500);
    
    door.setCollideWorldBounds(true);

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
    //  The score
    scoreText = this.add.text(16, 16, 'Pontuação: ' + score, { fontSize: '32px', fill: '#FFF' });
    deathText = this.add.text(16, 46, 'Mortes: ' + deaths, { fontSize: '32px', fill: '#FFF' });

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(door, platforms);

    enemies.forEach(e => {
      e.setBounce(0.2);
      e.setCollideWorldBounds(true);
      this.physics.add.collider(e, platforms);
      this.physics.add.collider(this.player, e, (p, enemy) => {
        death.play();
        if (!isAttacking) {
          if (deaths < MAX_DEATHS - 1) {
            deaths++;
            deathText.setText('Mortes: ' + deaths);
            this.scene.start('level8')
          } else {
            this.physics.pause();
            p.setTint(0xff0000);
            p.anims.play('die', false);
            gameOver = true;
            this.scene.start('lose')
          }
        } else {
          if (enemyHits < 5) {
            console.log('hit')
            enemyHits++;
          } else {
            enemy.destroy();
          }
        }
      }, null, this);
      enemiesMovement.push({ identifier: e.identifier, right: true });
      e.anims.play('bigEnemyRight', true);
      e.setVelocityX(120);

      setInterval(() => {
        var myEnemy = enemiesMovement.find(enemy => enemy.identifier === e.identifier);
        if (myEnemy) { 
          if (myEnemy.right) {
            e.anims.play('bigEnemyRight', true);
            e.setVelocityX(120);
            myEnemy.right = false;
          } else {
            e.anims.play('bigEnemyLeft', true);
            e.setVelocityX(-120);
            myEnemy.right = true;
          }
        }
      }, 1000);
    });
  
    this.physics.add.overlap(this.player, door, () => this.scene.start('win'), null, this);
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