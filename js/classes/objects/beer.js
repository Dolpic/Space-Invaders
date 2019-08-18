class Beer extends Object{
    constructor(game, startPos, speed, sprite, initialVelocity){
        super(game, startPos.x, startPos.y, sprite)

        this.speed = speed
        this.sprite.setDisplaySize(20,20)

        this.sprite.body.velocity = initialVelocity.normalize().scale(this.speed)

        this.game.scene.physics.add.overlap(this.sprite, this.game.currentLevel.player.sprite, this.drink.bind(this))
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
       this.game.beersCaught++
       this.destroy()
    }
}
