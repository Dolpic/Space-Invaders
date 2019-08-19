class Level5 extends Level{
    constructor(game){
        super(game)
    }

    create(){
        super.create("Level 5")

        this.addEnemy(new Spaceship(this.game, this.game.width/2, 90, 0xff0022, new Phaser.Math.Vector2(1,0)))
        this.addEnemy(new Spaceship(this.game, this.game.width/2, 40, 0x2200ff, new Phaser.Math.Vector2(-1,0)))
        
        for(var i=0; i<12; i++){
            var enemy = new Enemy(this.game, 50+100*i, 150, this.player, 'enemy2', 0xffb44b)
            enemy.initialVelocity.setTo(1,0)
            enemy.speed = 160
            enemy.margins = 30
            this.addEnemy(enemy)
        }

        for(var i=0; i<11; i++){
            var enemy = new Enemy(this.game, 100+100*i, 200, this.player, 'enemy2', 0xffb44b)
            enemy.initialVelocity.setTo(-1,0)
            enemy.speed = 160
            enemy.margins = 30
            this.addEnemy(enemy)
        }

        var bluePrint = [[0,3,4,5,6,7,7],[16,10,8,6,4,2,2]]
        for(var i=0; i<5; i++){
            this.createBricksGroup(i*this.game.width/5 + 100, 650, bluePrint)
        }
    }

    toNextLevel(){
        setTimeout(this.nextLevel.bind(this), 3000, new Level6(this.game))
    }
}