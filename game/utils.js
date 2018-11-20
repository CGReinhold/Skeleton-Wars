function addAnimations(anims) {
  //  Our player animations, turning, walking left and walking right.
  anims.create({
    key: 'left',
    frames: anims.generateFrameNumbers('mainWalk', { start: 39, end: 75 }),
    frameRate: 50,
    repeat: -1
  });

  anims.create({
    key: 'turnRight',
    frames: anims.generateFrameNumbers('mainWait', { start: 0, end: 37 }),
    frameRate: 50,
    repeat: -1
  });

  anims.create({
    key: 'turnLeft',
    frames: anims.generateFrameNumbers('mainWait', { start: 39, end: 75 }),
    frameRate: 50,
    repeat: -1
  });

  anims.create({
    key: 'right',
    frames: anims.generateFrameNumbers('mainWalk', { start: 0, end: 37 }),
    frameRate: 50,
    repeat: -1
  });

  anims.create({
    key: 'die',
    frames: anims.generateFrameNumbers('mainDie', { start: 0, end: 37 }),
    frameRate: 50,
    repeat: 0
  });

  anims.create({
    key: 'attack',
    frames: anims.generateFrameNumbers('attack', { start: 0, end: 37 }),
    frameRate: 50,
    repeat: 0
  });

  anims.create({
    key: 'attackLeft',
    frames: anims.generateFrameNumbers('attack', { start: 39, end: 75 }),
    frameRate: 50,
    repeat: 0
  });

  anims.create({
    key: 'waitEnemy',
    frames: anims.generateFrameNumbers('enemyWait', { start: 0, end: 25 }),
    frameRate: 20,
    repeat: -1
  });

  anims.create({
    key: 'waitLeft',
    frames: anims.generateFrameNumbers('enemyWait', { start: 26, end: 50 }),
    frameRate: 20,
    repeat: -1
  });

  anims.create({
    key: 'bigEnemyRight',
    frames: anims.generateFrameNumbers('bigEnemyWait', { start: 0, end: 25 }),
    frameRate: 20,
    repeat: -1
  });

  anims.create({
    key: 'bigEnemyLeft',
    frames: anims.generateFrameNumbers('bigEnemyWait', { start: 26, end: 50 }),
    frameRate: 20,
    repeat: -1
  });
}

function createVariables() {
  gameOver = false;
  lado = true;
  isAttacking = false;
  enemiesMovement = [];
  enemies = [];
  coins = [];
  espinhos = [];
  door = null;
  platforms = null;
  scoreText = null;
  deathText = null;
  sword = null;
  death = null;
  coinSound = null;
  music = null;
  doorSound = null;
}

function addEvents(context, level, nextLevel) {
  sword = context.sound.add('sword');
  death = context.sound.add('death');
  coinSound = context.sound.add('coinSound');
  music = context.sound.add('music');
  doorSound = context.sound.add('doorSound');
  // music.play();
  // setInterval(() => {
  //   music.play()
  // }, 3500);
  
  door.setCollideWorldBounds(true);

  //  Input Events
  context.cursors = context.input.keyboard.createCursorKeys();
  //  The score
  scoreText = context.add.text(16, 16, 'Pontuação: ' + score, { fontSize: '32px', fill: '#FFF' });
  deathText = context.add.text(16, 46, 'Mortes: ' + deaths, { fontSize: '32px', fill: '#FFF' });

  context.player.setBounce(0.2);
  context.player.setCollideWorldBounds(true);

  //  Collide the player and the stars with the platforms
  context.physics.add.collider(context.player, platforms);
  context.physics.add.collider(door, platforms);

  enemies.forEach(e => {
    e.setBounce(0.2);
    e.setCollideWorldBounds(true);
    context.physics.add.collider(e, platforms);
    context.physics.add.collider(context.player, e, (p, enemy) => {
      death.play();
      if (!isAttacking) {
        if (deaths < MAX_DEATHS - 1) {
          deaths++;
          deathText.setText('Mortes: ' + deaths);
          context.scene.start(level)
        } else {
          context.physics.pause();
          p.setTint(0xff0000);
          p.anims.play('die', false);
          gameOver = true;
          context.scene.start('lose')
        }
      } else {
        enemy.destroy();
      }
    }, null, context);
    enemiesMovement.push({ identifier: e.identifier, right: true });
    setInterval(() => {
      var myEnemy = enemiesMovement.find(enemy => enemy.identifier === e.identifier);
      if (myEnemy) { 
        if (myEnemy.right) {
          e.anims.play('waitEnemy', true);
          e.setVelocityX(120);
          myEnemy.right = false;
        } else {
          e.anims.play('waitLeft', true);
          e.setVelocityX(-120);
          myEnemy.right = true;
        }
      }
    }, 1200);
  });
  if (coins) {
    coins.forEach(c => {
      context.physics.add.collider(c, platforms);
      //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
      context.physics.add.overlap(context.player, c, (p, coin) => {
        coinSound.play();
        coin.disableBody(true, true);
        score += 10;
        scoreText.setText('Pontuação: ' + score);
      }, null, context);      
    });
  }
  if (espinhos) {
    espinhos.forEach(e => {
      context.physics.add.collider(e, platforms);
      context.physics.add.overlap(context.player, e, () => {
        death.play();
        if (deaths < MAX_DEATHS - 1) {
          deaths++;
          deathText.setText('Mortes: ' + deaths);
          context.scene.start(level)
        } else {
          context.physics.pause();
          context.player.setTint(0xff0000);
          context.player.anims.play('die', false);
          gameOver = true;
        }
      }, null, context);
    });
  }
  context.physics.add.overlap(context.player, door, () => { doorSound.play(); context.scene.start(nextLevel); }, null, context);
}

function updateScene(context) {
  if (gameOver) {
    return;
  }

  if (context.cursors.space.isDown) {
    sword.play();
    if (context.lado) {
      context.player.anims.play('attack', false);
    } else {
      context.player.anims.play('attackLeft', false);
    }
    isAttacking = true;
    setTimeout(() => {
      isAttacking = false;
    }, 800);
  } if (context.cursors.left.isDown && !isAttacking) {
    context.player.setVelocityX(-160);
    context.lado = false;
    context.player.anims.play('left', true);
  } else if (context.cursors.right.isDown && !isAttacking) {
    context.player.setVelocityX(160);
    context.lado = true;
    context.player.anims.play('right', true);
  } else if (!isAttacking){
    context.player.setVelocityX(0);
    if (context.lado) {
      context.player.anims.play('turnRight', true);
    } else {
      context.player.anims.play('turnLeft', true);
    }
  }

  if (context.cursors.up.isDown && context.player.body.touching.down) {
    context.player.setVelocityY(-320);
  }
}