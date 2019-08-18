class Beer extends Object{
    constructor(game, startPos, speed, sprite, initialVelocity){
        super(game, startPos.x, startPos.y, sprite)

        this.speed = speed

        this.sprite.setSize(500,500)

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

    drink(){
        this.destroy()
    }
}
