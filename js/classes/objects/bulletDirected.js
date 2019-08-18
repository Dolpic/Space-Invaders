class BulletDirected extends Bullet{
    constructor(game, startPos, speed, initialVelocity){
        super(game, startPos, speed, "bulletDirected", initialVelocity)

        this.isDirected = true
        this.decrocheDistance = 100
    }

    update(){
        if(this.isDirected){
            var centerPlayer = this.game.currentLevel.player.sprite.getCenter()
            var centerBullet = this.sprite.getCenter()

            var diff = new Phaser.Math.Vector2(centerPlayer.x-centerBullet.x, centerPlayer.y-centerBullet.y)
            var distance = Math.sqrt( Math.pow(centerPlayer.x-centerBullet.x,2) + Math.pow(centerPlayer.y-centerBullet.y,2) )

            this.sprite.body.velocity = diff
            this.sprite.setRotation(diff.angle() + Math.PI/2)
            this.sprite.body.velocity.normalize().scale(this.speed)

            if(distance < this.decrocheDistance){
                this.isDirected = false
            }
        }
    }
}