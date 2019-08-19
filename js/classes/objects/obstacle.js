class Obstacle extends Object{
    constructor(game, posX, posY, visible){
        super(game, posX, posY, 'barrier')

        if(visible){
            this.sprite.anims.play("barrier", true);
        }else{
            this.sprite.visible = false;
        }
    }

    update(){}
    damage(){}
}