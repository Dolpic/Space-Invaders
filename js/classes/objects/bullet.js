class Bullet{
    constructor(game, startPos, speed, sprite, initialVelocity){
        this.startPos = startPos
        this.speed = speed
        this.game = game
        this.spriteName = sprite
        this.destroyed = false

        this.sprite = this.game.scene.physics.add.sprite(this.startPos.x, this.startPos.y, this.spriteName)
        this.sprite.anims.play(this.spriteName, true)
        this.sprite.body.velocity = initialVelocity.normalize().scale(this.speed)
    }

    update(){
        if(this.sprite.x < this.sprite.width ||
           this.sprite.y < this.sprite.height ||
           this.sprite.x > this.game.width+this.sprite.width ||
           this.sprite.y > this.game.height+this.sprite.height){
                this.destroy()
            }
    }

    damage(){
        this.destroy()
    }

    destroy(){
        this.sprite.destroy()
        this.destroyed = true
    }

    getSprite(){
        return this.sprite
    }
}