class Level2 extends Level{
    constructor(game){
        super(game);
    }

    create(){
        super.create("Level 2")

        for(var i=0; i<9; i++){
            var enemy = new Enemy(this.game, 100+100*i, 20, this.player, 'enemy1', 0x7000b0);
            enemy.initialVelocity.setTo(-1,0)
            enemy.shootSpeed = 2200;
            enemy.speed = 60;
            this.enemies.add(enemy);
        }
        
        for(var i=0; i<10; i++){
            var enemy = new Enemy(this.game, 50+100*i, 45, this.player, 'enemy1', 0x0089bd);
            enemy.initialVelocity.setTo(1,0)
            enemy.shootSpeed = 2200;
            enemy.speed = 60;
            this.enemies.add(enemy);
        }
    
        for(var i=0; i<8; i++){
            var enemy = new Enemy(this.game, 150+100*i, 75, this.player, 'enemy2', 0xdc5500);
            enemy.initialVelocity.setTo(-1,0)
            enemy.speed = 120;
            enemy.shootSpeed = 1800;
            enemy.bulletSpeed = 160;
            enemy.lineHeight = 60;
            this.enemies.add(enemy);
        }

        for(var i=0; i<9; i++){
            var enemy = new Enemy(this.game, 100+100*i, 105, this.player,'enemy2', 0xdc5500);
            enemy.initialVelocity.setTo(1,0)
            enemy.speed = 120;
            enemy.shootSpeed = 1800;
            enemy.bulletSpeed = 160;
            enemy.lineHeight = 60;
            this.enemies.add(enemy);
        }
    
        for(var i=0; i<Math.ceil(this.game.width/12); i++){
            this.obstacles.add(new Obstacle(this.game, i*12, 570, true)).sprite.setImmovable(true);
            this.obstacles.add(new Obstacle(this.game, i*12, 653, false)).sprite.setImmovable(true);
        }

        var bluePrint = [[4,2,1,1,0],[2,6,8,8,10]];
        this.createBricksGroup(this.game.width/6, 500, bluePrint);
        this.createBricksGroup(2*this.game.width/6, 500, bluePrint);
        this.createBricksGroup(4*this.game.width/6, 500, bluePrint);
        this.createBricksGroup(5*this.game.width/6, 500, bluePrint);

        this.setOverlap()
        this.setCollider()
    }

    toNextLevel(){
        setTimeout(this.nextLevel.bind(this), 3000, new Level3(this.game));
    }
}