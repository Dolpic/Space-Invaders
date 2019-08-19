class Level6 extends Level{
    constructor(game){
        super(game)
    }

    create(){
        super.create("Level 6")

        this.addEnemy(new Spaceship(this.game, this.game.width/2, 40, 0xaa00ee, new Phaser.Math.Vector2(-1,0)))
        
        for(var i=0; i<10; i++){
            var enemy = new Enemy(this.game, 150+100*i, 130, this.player, 'enemy3', 0xf29922)
            enemy.initialVelocity.setTo(1,0)
            enemy.speed = 120
            enemy.margins = 30
            enemy.life = 3
            enemy.shootDirected = true
            this.addEnemy(enemy)
        }

        for(var i=0; i<11; i++){
            var enemy = new Enemy(this.game, 100+100*i, 190, this.player, 'enemy2', 0xf22287)
            enemy.initialVelocity.setTo(1,0)
            enemy.speed = 180
            enemy.margins = 30
            enemy.life = 0
            this.addEnemy(enemy)
        }

        var bluePrint = [[4,3,2,1,0],[2,4,6,8,10]]
        for(var i=1; i<3; i++){
            this.createBricksGroup(i*this.game.width/3, 650, bluePrint)
        }
    }

    toNextLevel(){
        setTimeout(this.nextLevel.bind(this), 3000, new Scoreboard(this.game))
    }
}