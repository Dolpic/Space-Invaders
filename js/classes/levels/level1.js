class Level1 extends Level{
    constructor(game){
        super(game)
    }

    create(){
        super.create("Level 1")

        var marginRight1 = 60
        var marginRight2 = 105

        for(var i=0; i<13; i++){
            var enemy = new Enemy(this.game, marginRight1+90*i, 110, this.player, 'enemy1', 0x8000ff);
            enemy.initialVelocity.setTo(1,0)
            this.addEnemy(enemy)
        }
        
        for(var i=0; i<12; i++){
            var enemy = new Enemy(this.game, marginRight2+90*i, 85, this.player, 'enemy1',  0xff9900);
            enemy.margins = 55
            enemy.speed = 55
            enemy.initialVelocity.setTo(1,0)
            this.addEnemy(enemy)
        }
    
        for(var i=0; i<13; i++){
            var enemy = new Enemy(this.game, marginRight1+90*i, 60, this.player, 'enemy1', 0xffdd00);
            enemy.initialVelocity.setTo(1,0)
            enemy.margins = 8
            enemy.shootSpeed = 2500
            enemy.bulletSpeed = 200
            this.addEnemy(enemy)
        }

        var bluePrint = [[4,2,1,1,0],[6,10,12,12,14]];
        this.createBricksGroup(this.game.width/6, 700, bluePrint)
        this.createBricksGroup(2*this.game.width/6, 700, bluePrint)
        this.createBricksGroup(4*this.game.width/6, 700, bluePrint)
        this.createBricksGroup(5*this.game.width/6, 700, bluePrint)
    }

    toNextLevel(){
        setTimeout(this.nextLevel.bind(this), 3000, new Level2(this.game))
    }
}
