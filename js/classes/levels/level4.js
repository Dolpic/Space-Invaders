class Level4 extends Level{
    constructor(game){
        super(game)
        this.bossApeared = false
        this.collapsed = false
        this.hellBallCreated = false
    }

    create(){
        super.create("Level 4")
        
        this.boss = new Boss1(this.game, this.game.width/2, 3*this.game.height/8, this.player)
        this.boss.sprite.setAlpha(0)
        this.boss.sprite.setScale(1.5)
        this.boss.sprite.setTint(0x00e3b1)

        for(var i=0; i<12; i++){
            var enemy = new Enemy(this.game, 50+100*i, 50, this.player, 'enemy2', 0x0089bd);
            this.setEnemy(enemy, 1)
        }
        for(var i=0; i<12; i++){
            var enemy = new Enemy(this.game, 50+100*i, 100, this.player, 'enemy2', 0x0089bd);
            this.setEnemy(enemy, -1)
        }
        for(var i=0; i<12; i++){
            var enemy = new Enemy(this.game, 50+100*i, 150, this.player, 'enemy2', 0x0089bd);
            this.setEnemy(enemy, 1)
        }

        var bluePrint = [[4,2,1,1,1,0,0],[2,6,8,8,8,10,10]]
        this.createBricksGroup(this.game.width/8, 680, bluePrint)
        this.createBricksGroup(2*this.game.width/8, 680, bluePrint)
        this.createBricksGroup(3*this.game.width/8, 680, bluePrint)
        this.createBricksGroup(5*this.game.width/8, 680, bluePrint)
        this.createBricksGroup(6*this.game.width/8, 680, bluePrint)
        this.createBricksGroup(7*this.game.width/8, 680, bluePrint)
    }

    setEnemy(enemy, direction){
        enemy.initialVelocity.setTo(direction,0)
        enemy.sprite.tint = 0x0089bd
        enemy.shootSpeed = 2200
        enemy.speed = 400
        enemy.lineHeight = 50
        this.addEnemy(enemy)
    }

    update(){
        this.boss.update();
        
        if(this.bossApeared && this.boss.sprite.alpha < 1){
            this.boss.sprite.setAlpha(this.boss.sprite.alpha + 0.01);
        }

        var allCircle = true;
        for(var i = 0; i<this.enemies.count(); i++){
            if(this.enemies.get(i).sprite.y >= 200 && 
               this.enemies.get(i).sprite.x < 2*this.game.width/3 + 4 && 
               this.enemies.get(i).sprite.x > 2*this.game.width/3 - 4 && 
               this.enemies.get(i).move != this.moveInCircle){

                this.enemies.get(i).sprite.body.velocity.setTo(0, 0) 
                this.enemies.get(i).sprite.setPosition(2*this.game.width/3, 200)
                this.enemies.get(i).speed = 5
                this.enemies.get(i).move = this.moveInCircle
                this.enemies.get(i).invincible = true

            }else if(this.enemies.get(i).move != this.moveInCircle){
                allCircle = false
            }
        }

        if(allCircle && this.enemies.count() != 0){
            var newBossAlpha = Math.min(this.boss.sprite.alpha*1.02, 1);
            if(this.enemies.get(0).speed >= 25){
                this.boss.sprite.setAlpha(this.boss.sprite.alpha == 0 ? 0.01 : newBossAlpha);
            }
            for(var i = 0; i<this.enemies.count(); i++){
                if(this.enemies.get(i).speed < 40){
                    this.enemies.get(i).speed *= 1.01
                }
                if(1-newBossAlpha == 0){
                    this.enemies.get(i).destroy()
                }else{
                    this.enemies.get(i).sprite.setAlpha(1-newBossAlpha)
                }
            }
        }else if(this.enemies.count() == 0 && !this.hellBallCreated){
            this.boss.start()
            this.playerCollider.destroy()
            this.hellBallCreated = true
        }

        super.update();
    }

    collapse(){
        if(!this.collapsed){
            for(var i = 0; i<this.obstacles.count(); i++){
                var cur = this.obstacles.get(i).sprite;
                cur.setAngle((Math.random()-0.5)*70);
                cur.setVelocity((Math.random()-0.5)*70,-170*(1+Math.random()*0.5));
                cur.setGravityY(500);
            }
            for(var i = 0; i<this.bricks.count(); i++){
                cur = this.bricks.get(i).sprite;
                cur.setAngle((Math.random()-0.5)*70);
                cur.setVelocity((Math.random()-0.5)*70,-170*(1+Math.random()*0.5));
                cur.setGravityY(500);
            }
            this.boss.hellBallSprite.setVelocityY(-260);
            this.collapsed = true;
        }
    }

    toNextLevel(){
        setTimeout(this.nextLevel.bind(this), 3000, new Level5(this.game))
    }

    destroy(){
        super.destroy();
        this.boss.destroy();
    }

    moveInCircle(){
        var vector = new Phaser.Math.Vector2(this.sprite.x - this.game.width/2, 3*this.game.height/8 - this.sprite.y)
        vector.setToPolar(vector.angle()+this.speed/360, vector.length())
        this.sprite.setPosition(vector.x + this.game.width/2, 3*this.game.height/8 - vector.y)
    }
}