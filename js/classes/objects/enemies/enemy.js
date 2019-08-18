class Enemy extends Object{
    constructor(game, startX, startY, target, sprite, tint){
        super(game, startX, startY, sprite)

        this.target     = target

        this.started    = false
        this.invincible = false

        this.speed       = 120
        this.shootSpeed  = 1300
        this.bulletSpeed = 160
        this.points      = 20
        this.maxLife     = 0
        this.life        = this.maxLife

        this.lastShoot = this.shootSpeed
        this.initialVelocity = new Phaser.Math.Vector2(0,0)

        this.startY = startY
        this.startX = startX

        this.sprite.anims.play(sprite, true)
        this.sprite.tint = tint
        this.tint = tint
        this.sprite.setDepth(10)

        this.move = this.defaultMove
        this.margins    = 10
        this.lineHeight = 90

        this.shootDirected = false
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

        if(this.shootDirected){
            var bullet = new BulletDirected(this.game, this.sprite.getCenter(), this.bulletSpeed, velocity)
        }else{
            var bullet = new Bullet(this.game, this.sprite.getCenter(), this.bulletSpeed, 'bulletEnemy', velocity)
        }
        this.game.currentLevel.bullets.add(bullet, this.game.currentLevel.player, this.game.currentLevel.player.damage);

        this.game.currentLevel.addPlayerCollider(bullet)
        this.game.currentLevel.addBricksCollider(bullet)

        this.lastShoot = Date.now()
    }

    damage(){

        if(!this.invincible && this.life == 0){
            this.game.score += this.points
            this.beer_drop()
            this.destroy()
        }else{
            this.life--
        }
        this.blink()
    }

    beer_drop(){
      var velocity = new Phaser.Math.Vector2(0,1)

      var beer = new Beer(this.game, this.sprite.getCenter(), this.bulletSpeed, 'beerPic', velocity)

      this.game.currentLevel.bullets.add(beer, this.game.currentLevel.player, this.game.currentLevel.player.damage)
    }

    blink(){
        var newTint = Phaser.Display.Color.ValueToColor(this.tint).brighten(30)
        this.sprite.tint = newTint.color
        setTimeout(function(){this.sprite.tint = this.tint}.bind(this), 100)
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

        this.sprite.body.velocity.normalize().scale(this.speed)

    }
}
