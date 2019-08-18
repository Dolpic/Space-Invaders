function loadSprites(loader){
    loader.spritesheet('player', 'images/player.png',       {frameWidth : 22,  frameHeight : 16});

    loader.spritesheet('enemy1',    'images/enemy1.png',    {frameWidth : 22,  frameHeight : 16});
    loader.spritesheet('enemy2',    'images/enemy2.png',    {frameWidth : 26,  frameHeight : 20});
    loader.spritesheet('enemy3',    'images/enemy3.png',    {frameWidth : 30,  frameHeight : 30});
    loader.spritesheet('spaceship', 'images/spaceship.png', {frameWidth : 45,  frameHeight : 37});
    loader.spritesheet('boss1',     'images/boss1.png',     {frameWidth : 156, frameHeight : 120});

    loader.spritesheet('boss1Death', 'images/boss1Death.png', {frameWidth : 156, frameHeight : 120});

    loader.spritesheet('bullet',         'images/bullet.png',         {frameWidth : 6,  frameHeight : 14});
    loader.spritesheet('bulletEnemy',    'images/bulletEnemy.png',    {frameWidth : 4,  frameHeight : 12});
    loader.spritesheet('bulletDirected', 'images/bulletDirected.png', {frameWidth : 8,  frameHeight : 15});
    loader.spritesheet('hellBall',       'images/hellBall.png',       {frameWidth : 52, frameHeight : 52});
    loader.spritesheet('bossBullet1',    'images/bossBullet1.png',    {frameWidth : 34, frameHeight : 34});
    loader.spritesheet('bossBullet2',    'images/bossBullet2.png',    {frameWidth : 26, frameHeight : 38});
    loader.spritesheet('beer',           'images/beerPic.png',        {frameWidth : 6,  frameHeight : 14});

    loader.image('brick', 'images/brick.png');
    loader.spritesheet('barrier', 'images/barrier.png', {frameWidth : 12, frameHeight : 10});

    loader.image('stars1',  'images/stars/Aquarius.png');
    loader.image('stars2',  'images/stars/Aries.png');
    loader.image('stars3',  'images/stars/Cancer.png');
    loader.image('stars4',  'images/stars/Capricorn.png');
    loader.image('stars5',  'images/stars/Gemini.png');
    loader.image('stars6',  'images/stars/Leo.png');
    loader.image('stars7',  'images/stars/Libra.png');
    loader.image('stars8',  'images/stars/Pisces.png');
    loader.image('stars9',  'images/stars/Sagittarius.png');
    loader.image('stars10', 'images/stars/Scorpio.png');
    loader.image('stars11', 'images/stars/Taurus.png');
    loader.image('stars12', 'images/stars/Virgo.png');

    /*loader.image('joypadBase', 'joypad_base.png');
    loader.svg('button','bouton.svg');
    loader.svg('buttonPushed','bouton_pushed.svg');
    loader.svg('joypadBall','joypad_ball.svg');
    loader.svg('joypadBase','joypad_base.svg');*/
}


function createAnimations(animator){

    // ENEMIES
    createAnimation(animator, 'enemy1'    , 1,  6, -1)
    createAnimation(animator, 'enemy2'    , 1,  7, -1)
    createAnimation(animator, 'enemy3'    , 1,  7, -1)
    createAnimation(animator, 'spaceship' , 3,  6, -1)
    createAnimation(animator, 'boss1'     , 3,  7, -1)
    createAnimation(animator, 'boss1Death', 16, 8, 0 )

    // PLAYER
    createAnimation(animator, 'move'    , 1, 7, 1,  'player')
    createAnimation(animator, 'moveLoop', 1, 6, -1, 'player')
    animator.create({
        key: 'relax',
        frames: [ { key: 'player', frame: 0 } ],
        frameRate: 7,
        repeat: 1
    });

    // BULLET
    createAnimation(animator, 'bullet',         6, 7,  -1)
    createAnimation(animator, 'bulletEnemy',    6, 7,  -1)
    createAnimation(animator, 'bulletDirected', 6, 7,  -1)
    createAnimation(animator, 'hellBall',       2, 10, -1)
    createAnimation(animator, 'bossBullet1',    1, 10, -1)
    createAnimation(animator, 'bossBullet2',    1, 10, -1)

    // OTHERS
    createAnimation(animator, 'barrier', 6, 6, -1)
}

function createAnimation(animator, name, endFrame, frameRateValue, repeatValue, imageName = name){
    animator.create({
        key: name,
        frames: animator.generateFrameNumbers(imageName, { start: 0, end: endFrame }),
        frameRate: frameRateValue,
        repeat: repeatValue
    });
}
