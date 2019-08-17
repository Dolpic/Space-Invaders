class Brick extends Object{
    constructor(game, posX, posY){
        super(game, posX, posY, 'brick')
    }

    update(){}

    damage(){
        this.destroy();
    }

    getSprite(){
        return this.sprite
    }
}