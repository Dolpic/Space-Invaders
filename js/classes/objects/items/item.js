class Item extends Object{
    constructor(game, startPos, sprite){
        super(game, startPos.x, startPos.y, sprite)

        this.speed     = 200
        this.direction = new Phaser.Math.Vector2(0,1)
        
        this.sprite.body.velocity = this.direction.normalize().scale(this.speed)
    }

    update(){
        if(this.sprite.x < this.sprite.width ||
           this.sprite.y < this.sprite.height ||
           this.sprite.x > this.game.width+this.sprite.width ||
           this.sprite.y > this.game.height+this.sprite.height){
                this.destroy()
        }
    }

    caught(){
        this.destroy()
    }

    destroy(){
        super.destroy()
    }
}