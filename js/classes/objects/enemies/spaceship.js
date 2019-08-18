class Spaceship extends Enemy{
    constructor(game, startX, startY, tint, initialVelocity){
        super(game, startX, startY, undefined, "spaceship", tint)

        this.maxLife    = 7
        this.shootSpeed = 3000
        this.points     = 250
        this.speed      = 60

        this.borderMargins   = 40
        this.move            = this.spaceshipMove
        this.initialVelocity = initialVelocity
    }

    update(){
        if(this.started && Date.now() - this.lastShoot >= this.shootSpeed){
            this.shoot()
        }
        this.move()
    }

    shoot(){
        var newEnemy = new Enemy(this.game, this.sprite.x, this.sprite.y + 40, this.game.currentLevel.player, "enemy1", randomHueColor(1,0.5))
        newEnemy.initialVelocity.setTo(1,0)
        newEnemy.points = 0
        newEnemy.start()
        this.game.currentLevel.addEnemy(newEnemy)
        this.lastShoot = Date.now()
    }

    spaceshipMove(){
        if(this.sprite.x < this.borderMargins){
            this.sprite.body.velocity.setTo(1,0);
        }

        if(this.sprite.x > this.game.width - this.borderMargins){
            this.sprite.body.velocity.setTo(-1,0);
        }

        this.sprite.body.velocity.normalize().scale(this.speed)
    }
}