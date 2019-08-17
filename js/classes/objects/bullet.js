class Bullet extends Object{
    constructor(game, startPos, speed, sprite, initialVelocity){
        super(game, startPos.x, startPos.y, sprite)

        this.startPos = startPos
        this.speed = speed

        this.sprite.anims.play(sprite, true)
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
}