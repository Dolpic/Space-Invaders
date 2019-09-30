class Player extends Object{
    constructor(game, startX, startY, sprite){
        super(game, startX, startY, sprite)

        this.speed               = 250
        this.bulletSpeed         = 250
        this.shootSpeed          = 300
        this.invulnerabilityTime = 3000
        this.hitPenalty          = -100

        this.controlledByPlayer = true

        this.lastShoot = this.shootSpeed
        this.lastHit = 0

        this.sprite.setCollideWorldBounds(true)
    }
    
    shoot(){
        if (this.game.currentLevel.started){
        var vector = new Phaser.Math.Vector2(0, -1)
        var bullet = new Bullet(this.game, this.sprite.getCenter(), this.bulletSpeed, 'bullet', vector)
        this.game.currentLevel.addPlayerBullet(bullet)
        this.lastShoot = Date.now()
        }
    }

    update(){
        if(this.controlledByPlayer){

            var keyboard = this.game.keyboard
            var velocity = new Phaser.Math.Vector2(0, 0)
    
            if(keyboard.left.isDown){
                velocity.x = -1
            }
            if(keyboard.right.isDown){
                velocity.x = 1
            }
            if(keyboard.up.isDown){
                velocity.y = -1
            }
            if(keyboard.down.isDown){
                velocity.y = 1
            }
            if(keyboard.space.isDown && Date.now() - this.lastShoot >= this.shootSpeed){
                this.shoot()
            }
    
            velocity.normalize().scale(this.speed)

            this.sprite.body.velocity = velocity

            if(velocity.x == 0 && velocity.y == 0){
                this.sprite.anims.play('relax', true)
            }else{
                this.sprite.anims.play('move', true)
            }
        }
    }

    damage(){
        if(this.controlledByPlayer && Date.now() - this.lastHit > this.invulnerabilityTime){
            this.game.remainingLives--
            this.game.score += this.hitPenalty
            this.lastHit = Date.now()
            Player.blink(this.sprite, 0, this.invulnerabilityTime)
            if(this.game.remainingLives <= 0){
                this.game.currentLevel.gameOver(this.game)
            }
        }
    }

    static blink(sprite, state, duration){
        if(state == 0){
            sprite.tint = 0x006600
        }else{
            sprite.tint = 0xffffff
        }

        if(duration > 0){
            setTimeout(Player.blink, 120, sprite, state == 0 ? 1 : 0, duration-120)
        }else{
            sprite.tint = 0xffffff
        }
    }
}
