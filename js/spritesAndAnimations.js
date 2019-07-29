function loadSprites(phaser){
    phaser.load.spritesheet('player', 'images/player.png', {frameWidth : 22, frameHeight : 16});

    phaser.load.spritesheet('enemy1', 'images/enemy1.png', {frameWidth : 22, frameHeight : 16});
    phaser.load.spritesheet('enemy2', 'images/enemy2.png', {frameWidth : 26, frameHeight : 20});
    phaser.load.spritesheet('boss1', 'images/boss1.png', {frameWidth : 156, frameHeight : 120});

    phaser.load.spritesheet('boss1Death', 'images/boss1Death.png', {frameWidth : 156, frameHeight : 120});

    phaser.load.spritesheet('bullet', 'images/bullet.png', {frameWidth : 6, frameHeight : 14});
    phaser.load.spritesheet('bulletEnemy', 'images/bulletEnemy.png', {frameWidth : 4, frameHeight : 12});
    phaser.load.spritesheet('hellBall', 'images/hellBall.png', {frameWidth : 52, frameHeight : 52});
    phaser.load.spritesheet('bossBullet1', 'images/bossBullet1.png', {frameWidth : 34, frameHeight : 34});
    phaser.load.spritesheet('bossBullet2', 'images/bossBullet2.png', {frameWidth : 26, frameHeight : 38});

    phaser.load.image('brick', 'images/brick.png');
    phaser.load.spritesheet('barrier', 'images/barrier.png', {frameWidth : 12, frameHeight : 10});

    phaser.load.image('stars1', 'images/stars/Aquarius.png');
    phaser.load.image('stars2', 'images/stars/Aries.png');
    phaser.load.image('stars3', 'images/stars/Cancer.png');
    phaser.load.image('stars4', 'images/stars/Capricorn.png');
    phaser.load.image('stars5', 'images/stars/Gemini.png');
    phaser.load.image('stars6', 'images/stars/Leo.png');
    phaser.load.image('stars7', 'images/stars/Libra.png');
    phaser.load.image('stars8', 'images/stars/Pisces.png');
    phaser.load.image('stars9', 'images/stars/Sagittarius.png');
    phaser.load.image('stars10', 'images/stars/Scorpio.png');
    phaser.load.image('stars11', 'images/stars/Taurus.png');
    phaser.load.image('stars12', 'images/stars/Virgo.png');
    
    /*phaser.load.image('joypadBase', 'joypad_base.png');
    phaser.load.svg('button','bouton.svg');
    phaser.load.svg('buttonPushed','bouton_pushed.svg');
    phaser.load.svg('joypadBall','joypad_ball.svg');
    phaser.load.svg('joypadBase','joypad_base.svg');*/
}

function createAnimations(phaser){
     /*
     * ENEMIESS
     */
    phaser.anims.create({
        key: 'enemy1',
        frames: phaser.anims.generateFrameNumbers('enemy1', { start: 0, end: 1 }),
        frameRate: 6,
        repeat: -1
    });
    phaser.anims.create({
        key: 'enemy2',
        frames: phaser.anims.generateFrameNumbers('enemy2', { start: 0, end: 1 }),
        frameRate: 7,
        repeat: -1
    });
    phaser.anims.create({
        key: 'boss1',
        frames: phaser.anims.generateFrameNumbers('boss1', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    phaser.anims.create({
        key: 'boss1Death',
        frames: phaser.anims.generateFrameNumbers('boss1Death', { start: 0, end: 16 }),
        frameRate: 8,
        repeat: 0
    });

    /*
     * PLAYER
     */
    phaser.anims.create({
        key: 'move',
        frames: phaser.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
        frameRate: 7,
        repeat: 1
    });
    phaser.anims.create({
        key: 'moveLoop',
        frames: phaser.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
        frameRate: 6,
        repeat: -1
    });
    phaser.anims.create({
        key: 'relax',
        frames: [ { key: 'player', frame: 0 } ],
        frameRate: 7,
        repeat: 1
    });

    /*
    *   BULLET
    */
    phaser.anims.create({
        key: 'bullet',
        frames: phaser.anims.generateFrameNumbers('bullet', { start: 0, end: 6 }),
        frameRate: 7,
        repeat: -1
    });
    phaser.anims.create({
        key: 'bulletEnemy',
        frames: phaser.anims.generateFrameNumbers('bulletEnemy', { start: 0, end: 6 }),
        frameRate: 7,
        repeat: -1
    });
    phaser.anims.create({
        key: 'hellBall',
        frames: phaser.anims.generateFrameNumbers('hellBall', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });
    phaser.anims.create({
        key: 'bossBullet1',
        frames: phaser.anims.generateFrameNumbers('bossBullet1', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });
    phaser.anims.create({
        key: 'bossBullet2',
        frames: phaser.anims.generateFrameNumbers('bossBullet2', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });

    /*
    *   OTHERS
    */
   phaser.anims.create({
    key: 'barrier',
    frames: phaser.anims.generateFrameNumbers('barrier', { start: 0, end: 6}),
    frameRate: 6,
    repeat: -1
});
}