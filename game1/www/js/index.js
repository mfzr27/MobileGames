var player, monster, cursors, txtScore, score;

var game = new Phaser.Game(
  '100%',
  '100%',
  Phaser.CANVAS,
  'Game Demo',
  { preload: preload, create: create, update: update }
);

function preload() {
  game.load.spritesheet('player', 'img/player.png', 32, 48);
  game.load.image('player', 'img/player.jpg');
  game.load.image('monster', 'img/monster.jpg');
  game.load.image('background', 'img/bg.jpg');

  game.load.audio('music', 'music/music1.mp3');
  game.load.audio('ping', 'sound/ping.mp3');
}

function create() {
  var music = game.sound.play('music');
  music.volume = 0.5;
  music.loopFull();

  game.world.resize(2000, 2000);

  game.add.sprite(0,0,'background');

  player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
  game.camera.follow(player);
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.animations.add('walkDown', [0, 1, 2, 3]);
  player.animations.add('walkLeft', [4, 5, 6, 7]);
  player.animations.add('walkRight', [8, 9, 10, 11]);
  player.animations.add('walkUp', [12, 13, 14, 15]);

  monster = game.add.sprite(game.world.randomX, game.world.randomY, 'monster');  
  game.physics.enable(monster, Phaser.Physics.ARCADE);

  score = 0;
  var style = { font: '20px Arial', fill: '#bddb28' };
  txtScore = game.add.text(10, 10, score.toString(), style);
  txtScore.fixedToCamera = true;
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown) {
    player.animations.play('walkLeft', 5, true);
    player.x -= 2;
  }
  if (cursors.right.isDown) {
    player.animations.play('walkRight', 5, true);
    player.x += 2;
  }
  if (cursors.up.isDown) {
    player.animations.play('walkUp', 5, true);
    player.y -= 2;
  }
  if (cursors.down.isDown) {
    player.animations.play('walkDown', 5, true);
    player.y += 2;
  }
  game.physics.arcade.overlap(player, monster, monsterHitHandler);
  if (!cursors.down.isDown && !cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown) {
    player.animations.stop();
  }
}

function monsterHitHandler(playerObject, monsterObject) {
  monsterObject.x = Math.random() * game.width;
  monsterObject.y = Math.random() * game.height;
  score++;
  txtScore.setText(score.toString());
  var ping = game.sound.play('ping');
}
