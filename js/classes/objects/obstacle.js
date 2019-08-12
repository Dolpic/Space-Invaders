class Obstacle{
    constructor(game, posX, posY, visible){
        this.game = game;
        this.sprite = this.game.scene.physics.add.sprite(posX, posY, 'barrier');

        if(visible){
            this.sprite.anims.play("barrier", true);
        }else{
            this.sprite.visible = false;
        }
    }

    update(){}

    damage(){}

    destroy(){
        this.sprite.destroy();
    }
}