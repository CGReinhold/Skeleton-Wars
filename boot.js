var bootState = {
  // Within every state callback, `this` is the current state and `this.game` is the game.

  init: function init() {
    // Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    // this.game.renderer.renderSession.roundPixels = true;
  },

  // The loader starts automatically after `preload`.

  preload: function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('day1', 'assets/day1.png');
    this.load.image('day2', 'assets/day2.png');
    this.load.image('day3', 'assets/day3.png');
    this.load.image('day4', 'assets/day4.png');
    this.load.image('day5', 'assets/day5.png');
    this.load.image('day6', 'assets/day6.png');
    this.load.image('day7', 'assets/day7.png');
    this.load.image('day8', 'assets/day8.png');
    this.load.image('wall', 'assets/wall.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('halfGround', 'assets/halfPlatform.png');
    this.load.image('quarterGround', 'assets/quarterPlatform.png');
    this.load.image('bigGround', 'assets/bigPlatform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('door', 'assets/door.png');
    this.load.image('espinhos', 'assets/espinhos.png');
    this.load.image('coin', 'assets/moeda.png');
    this.load.spritesheet('mainWalk', 'assets/mainWalk.png', { frameWidth: 42, frameHeight: 48 });
    this.load.spritesheet('mainWait', 'assets/mainWait.png', { frameWidth: 42, frameHeight: 48 });
    this.load.spritesheet('mainDie', 'assets/mainDie.png', { frameWidth: 60, frameHeight: 48 });
    this.load.spritesheet('attack', 'assets/attack.png', { frameWidth: 58, frameHeight: 48 });
    this.load.spritesheet('enemyWait', 'assets/enemyWait.png', { frameWidth: 33, frameHeight: 48 });
    this.load.spritesheet('bigEnemyWait', 'assets/bigEnemyWait.png', { frameWidth: 165, frameHeight: 240 });

    this.load.audio('sword', 'assets/sword.wav');
    this.load.audio('death', 'assets/death.mp3');
    this.load.audio('doorSound', 'assets/doorSound.wav');
    this.load.audio('coinSound', 'assets/coinSound.wav');
    this.load.audio('music', 'assets/music.mp3');
  },

  // `loadUpdate` runs while the loader is loading.
  // `setPreloadSprite` updates the loading bar automatically, so we don't need to do anything else.
  // We'll just print the loader progress.

  loadUpdate: function loadUpdate() {
    console.info('load.hasLoaded', this.load.hasLoaded);
    console.info('load.progress', this.load.progress);
  },

  // `loadRender` runs while the loader is loading.

  loadRender: function loadRender() {
    this.game.debug.text('Loading: ' + this.load.progress, 20, 20);
  },

  // `create` runs once the loader has finished.
  // All we need to do is start the next state.

  create: function create() {
    this.scene.start('menu');
  },

  // Our handler for the `game.state.onStateChange` signal:

  onStateChange: function onStateChange(newState, oldState) {
    console.info('Changed state from "%s" to "%s"', oldState || '[none]', newState);
  }
};