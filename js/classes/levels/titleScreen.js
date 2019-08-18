class TitleScreen{
    constructor(game){
        this.game = game
        this.destroyed = false
    }

    create(){
        this.player = this.game.scene.physics.add.sprite(-20, 2*this.game.height/3, 'player')
        this.player.anims.play("moveLoop")
        this.player.body.velocity.x = 100

        this.enemy = this.game.scene.physics.add.sprite(this.game.width + 20, 2*this.game.height/3, 'enemy1')
        this.enemy.setTint(Phaser.Display.Color.GetColor(randomNumber(0,255), randomNumber(0,255), randomNumber(0,255)))
        this.enemy.anims.play("enemy1")
        this.enemy.body.velocity.x = -100

        this.game.setTitle('Sysmic Invaders')
        this.game.setSubtitle('Insert coin and press <space>')
        SpaceInvaders.textFlash(this.game.subtitle, '#00ff00')
    }

    update(){
        if(!this.destroyed){

            if(this.game.keyboard.space.isDown){
                this.nextLevel()
            }
            //Pourquoi checker player.body ? Mystère...
            if(this.player.body != undefined && this.player.x >= this.game.width/3){
                this.player.body.velocity.x = 0
            }
            //Pourquoi checker enemy.body ? ...
            if(this.enemy.body != undefined && this.enemy.x <= 2*this.game.width/3){
                this.enemy.body.velocity.x = 0
            }
        }
    }

    nextLevel(){
        this.game.setSubtitle('')
        this.game.currentLevel = new Level6(this.game)
        this.game.currentLevel.create()
        this.destroy()
    }

    destroy(){
        this.destroyed = true

        if(isDefined(this.player))
            this.player.destroy()
        if(isDefined(this.enemy))
            this.enemy.destroy()
    }
}
