class Level3 extends Level{
    constructor(game){
        super(game);
    }

    create(){
        super.create("Level 3")

        for(var i=0; i<12; i++){
            var enemy = new Enemy(this.game, 50+100*i, 90, this.player, 'enemy2', 0xff0000);
            enemy.initialVelocity.setTo(-1, 0)
            enemy.speed = 160;
            enemy.margins = 30;
            this.addEnemy(enemy)
        }
        
        for(var i=0; i<12; i++){
            var enemy = new Enemy(this.game, 50+100*i, 150, this.player, 'enemy2', 0xffb44b);
            enemy.initialVelocity.setTo(1,0)
            enemy.speed = 160;
            enemy.margins = 30;
            this.addEnemy(enemy)
        }
    
        for(var i=0; i<12; i++){
            var enemy = new Enemy(this.game, 50+100*i, 230, this.player, 'enemy1', 0xffe34b);
            enemy.initialVelocity.setTo(-1,0)
            enemy.sprite.tint = 0xdc5500;
            enemy.lineHeight = 60;
            enemy.margins = 30;
            this.addEnemy(enemy)
        }

        for(var i=0; i<12; i++){
            var enemy = new Enemy(this.game, 50+100*i, 280, this.player, 'enemy1', 0xffe34b);
            enemy.initialVelocity.setTo(1,0)
            enemy.lineHeight = 60;
            enemy.margins = 30;
            this.addEnemy(enemy)
        }

        var bluePrint = [[4,2,0,2,3,3,4],[2,6,10,6,4,4,2]];
        for(var i=1; i<8; i++){
            this.createBricksGroup(i*this.game.width/8, 650, bluePrint);
        }
    }

    toNextLevel(){
        setTimeout(this.nextLevel.bind(this), 3000, new Level4(this.game));
    }
}