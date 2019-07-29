class Brick{
    constructor(game, posX, posY){
        this.game = game;
        this.sprite = this.game.physics.add.sprite(posX, posY, 'brick');
        this.destroyed = false;
    }

    update(){}

    damage(){
        this.destroy();
    }

    destroy(){
        this.sprite.destroy();
        this.destroyed = true;
    }
}