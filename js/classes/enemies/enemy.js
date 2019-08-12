class Enemy{
    constructor(game, startX, startY, target, sprite, tint){
        this.game = game
        this.spriteName = sprite
        this.target     = target
        this.destroyed  = false
        this.started    = false
        this.invincible = false

        this.speed       = 120
        this.shootSpeed  = 1300
        this.bulletSpeed = 160
        this.points      = 20
        this.maxLife     = 1
        this.life        = this.maxLife

        this.lastShoot = this.shootSpeed
        this.initialVelocity = new Phaser.Math.Vector2(0,0)

        this.startY = startY
        this.startX = startX

        this.sprite = this.game.scene.physics.add.sprite(startX, startY, this.spriteName);
        this.sprite.anims.play(this.spriteName, true)
        this.sprite.tint = tint
        this.sprite.setDepth(10)

        this.move = this.defaultMove
        this.margins    = 10
        this.lineHeight = 90
    }

    start(){
        this.life = this.maxLife
        this.started = true;
        this.sprite.body.velocity = this.initialVelocity
    }

    update(){
        if(this.started){
            if((this.target.sprite.x < this.sprite.x+3 && this.target.sprite.x > this.sprite.x-3) || Math.random() < 0.001){
                if(Date.now() - this.lastShoot >= this.shootSpeed){
                    this.shoot()
                }
            }

            this.move()
        }
    }

    shoot(){
        var velocity = new Phaser.Math.Vector2(0,1)
        var bullet = new Bullet(this.game, this.sprite.getCenter(), this.bulletSpeed, 'bulletEnemy', velocity)

        this.game.currentLevel.bullets.add(bullet, this.game.currentLevel.player, this.game.currentLevel.player.damage);

        this.game.currentLevel.addPlayerCollider(bullet)
        this.game.currentLevel.addBricksCollider(bullet)

        this.lastShoot = Date.now()
    }

    damage(){
        if(!this.invincible && this.life == 0){
            this.game.score += this.points
            this.destroy()
        }else{
            this.life--
        }
    }

    destroy(){
        this.sprite.destroy()
        this.destroyed = true
    }

    defaultMove(){

        if(this.nextLineHeight === undefined)
            this.nextLineHeight = this.startY + this.lineHeight;

        if(this.sprite.x < this.sprite.width/2 + this.margins){
            this.sprite.x = this.sprite.width/2 + this.margins;
            this.sprite.body.velocity.setTo(0,1);
        }

        if(this.sprite.x > this.game.width - this.sprite.width/2 - this.margins){
            this.sprite.x = this.game.width - this.sprite.width/2 - this.margins
            this.sprite.body.velocity.setTo(0,1);
        }

        if(this.sprite.y > this.nextLineHeight){
            if(this.sprite.x <= this.game.width/2){
                this.sprite.body.velocity.setTo(1,0);
            }else{
                this.sprite.body.velocity.setTo(-1,0);
            }
            this.nextLineHeight += this.lineHeight
        }
       // this.sprite.body.velocity.x = 1;
        this.sprite.body.velocity.normalize().scale(this.speed)

    }

    getSprite(){
        return this.sprite
    }
}