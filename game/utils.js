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
}
