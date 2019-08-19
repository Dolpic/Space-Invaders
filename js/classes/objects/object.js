class Object{
    constructor(game, startX, startY, sprite){
        this.game      = game
        this.destroyed = false

        if(sprite != undefined){
            this.sprite = this.game.scene.physics.add.sprite(startX, startY, sprite)
            
            // Utilisé durant les collisions pour récupérer l'objet courant
            this.sprite.getParent = function() {
                return this
            }.bind(this)
        }
    }

    destroy(){
        this.destroyed = true

        if(this.sprite != undefined){
            this.sprite.destroy()
        }
    }

    damage(){
        console.log("Error : damage not implemented")
    }

    getSprite(){
        return this.sprite
    }
}