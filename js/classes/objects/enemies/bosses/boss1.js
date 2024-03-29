class Boss1 extends Boss{
    constructor(game, startX, startY, target){
        super(game, startX, startY, target, 'boss1', 140, 0x00e3b1)

        this.tableIntervals = []
        this.shootSpeed = 150
        this.points     = 1234
        this.hellBallSprite = null
    }

    start(){
        super.start()
        this.hellBall()
        setTimeout(function(){
                    this.tableIntervals.push(setInterval(this.shootToPlayer.bind(this), 700)
                )}.bind(this), 2500)
    }

    damage(){
        super.damage()

        switch(this.life){
            case 120:
                setTimeout(function(){
                    this.shootBouncingBall('bossBullet1', 100, 150)
                    this.shootBouncingBall('bossBullet1', -100, 150)
                }.bind(this), 2500)
                break
            case 100:
                setTimeout(function(){
                    this.shootBouncingBall('bossBullet1', 150, -100)
                    this.shootBouncingBall('bossBullet1', -150, -100)
                }.bind(this), 4000)
                break
            case 80:
                this.shootSpeed = 200
                break
            case 60:
                this.pelletCircle(1,1)
                this.tableIntervals.push(setInterval(this.pelletCircle.bind(this), 10000))
                break
            case 40:
                this.shootSpeed = 250;
                break
            case 20:
                this.pelletCircle(1,1)
                this.pelletCircle(-1,1)
                this.pelletCircle(1,-1)
                this.pelletCircle(-1,-1)
                break
            case 0:
                for(var i=0; i<this.tableIntervals.length; i++){
                    clearInterval(this.tableIntervals[i])
                }
                this.flash()
                setTimeout(function(){
                    this.sprite.setTexture('boss1Death',17);
                    this.sprite.anims.play('boss1Death', true)
                }.bind(this), 2000)
                setTimeout(function(){
                    this.game.score += this.points;
                    this.destroy()
                }.bind(this),5000)
                break
        }
    }

    hellBall(){
        this.hellBallSprite = this.game.scene.physics.add.sprite(this.sprite.x, this.sprite.y, "hellBall"); 
        this.hellBallSprite.anims.play("hellBall", true)
        this.hellBallSprite.setScale(1.5)
        this.hellBallSprite.tint = 0xf4ff65

        this.game.scene.physics.add.overlap(this.game.currentLevel.obstacles.getSprite(), 
                                            this.hellBallSprite, 
                                            this.game.currentLevel.collapse.bind(this.game.currentLevel))

        this.hellBallSprite.setGravityY(500)
        this.hellBallSprite.setVelocityY(50)
    }

    shoot(bulletType, velocityX, velocityY, rotation){
        if(rotation === undefined) rotation = 0

        var velocity = new Phaser.Math.Vector2(velocityX, velocityY)
        var position = new Phaser.Math.Vector2(this.sprite.x, this.sprite.y)

        var bullet = new Bullet(this.game, position, velocity.length(), bulletType, velocity)
        bullet.sprite.setRotation(rotation)
        bullet.sprite.setCircle(bullet.width/2)
        
        this.game.currentLevel.addBullet(bullet)
        return bullet
    }


    shootBouncingBall(bulletType, velocityX, velocityY){
        var bullet = this.shoot(bulletType, velocityX, velocityY)
        bullet.sprite.setScale(1.7).setBounce(1).setCollideWorldBounds(true)
        bullet.sprite.tint = 0xff0033
    }

    shootToPlayer(){
        var vector = new Phaser.Math.Vector2(this.game.currentLevel.player.sprite.x-this.sprite.x, this.game.currentLevel.player.sprite.y-this.sprite.y)
        vector.normalize().scale(this.shootSpeed)
        this.shoot('bossBullet1', vector.x, vector.y)
    }

    pelletCircle(directionX = Math.random(), directionY = Math.random()){
        var nbPellets = 25;
        var vector = new Phaser.Math.Vector2(directionX, directionY).normalize().scale(130)
        for(var i=0; i<nbPellets; i++){
            vector.setToPolar(vector.angle() + 2*Math.PI/nbPellets, vector.length())
            setTimeout(this.shoot.bind(this), i*200, 'bossBullet2', vector.x, vector.y, vector.angle()+Math.PI/2)
        }
    }

    flash(){
        this.tableIntervals.push(setInterval(function(){this.sprite.tint = 0x00e3b1}.bind(this), 200));
        this.tableIntervals.push(setTimeout(function(){
            setInterval(function(){this.sprite.tint = 0xffffff}.bind(this), 200)
        }.bind(this), 100))
    }

    destroy(){
        super.destroy()
        
        for(var i=0; i<this.tableIntervals.length; i++){
            clearInterval(this.tableIntervals[i])
        }
    }
}