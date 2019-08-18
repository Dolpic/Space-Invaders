class Level1 extends Level{
    constructor(game){
        super(game)
    }

    create(){
        super.create("Level 1")

        for(var i=0; i<11; i++){
            var enemy = new Enemy(this.game,50+90*i, 80, this.player, 'enemy1', 0x8000ff);
            enemy.initialVelocity.setTo(1,0)
            this.enemies.add(enemy);
        }

        for(var i=0; i<10; i++){
            var enemy = new Enemy(this.game, 95+90*i, 55, this.player, 'enemy1',  0xff9900);
            enemy.margins = 55;
            enemy.speed = 55;
            enemy.initialVelocity.setTo(1,0)
            this.enemies.add(enemy);
        }

        for(var i=0; i<11; i++){
            var enemy = new Enemy(this.game,50+90*i, 30, this.player, 'enemy1', 0xffdd00);
            enemy.initialVelocity.setTo(1,0)
            enemy.margins = 8;
            enemy.shootSpeed = 2500;
            enemy.bulletSpeed = 200;
            this.enemies.add(enemy);
        }

        for(var i=0; i<Math.ceil(this.game.width/12); i++){
            this.obstacles.add(new Obstacle(this.game, i*12, 570, true)).sprite.setImmovable(true);
            this.obstacles.add(new Obstacle(this.game, i*12, 653, false)).sprite.setImmovable(true);
        }

        var bluePrint = [[4,2,1,1,0],[6,10,12,12,14]];
        this.createBricksGroup(this.game.width/6, 500, bluePrint);
        this.createBricksGroup(2*this.game.width/6, 500, bluePrint);
        this.createBricksGroup(4*this.game.width/6, 500, bluePrint);
        this.createBricksGroup(5*this.game.width/6, 500, bluePrint);

        this.setOverlap()
        this.setCollider()
    }

    toNextLevel(){
        setTimeout(this.nextLevel.bind(this), 3000, new Level2(this.game));
    }
}
