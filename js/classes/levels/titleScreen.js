class TitleScreen{
    constructor(game){
        this.game = game;
    }

    create(){
        this.player = this.game.physics.add.sprite(-20, 2*GAME_HEIGHT/3, 'player')
        this.player.anims.play("moveLoop")
        this.player.body.velocity.x = 100
    
        this.enemy = this.game.physics.add.sprite(GAME_WIDTH + 20, 2*GAME_HEIGHT/3, 'enemy1')
        this.enemy.setTint(0xff0000)
        this.enemy.anims.play("enemy1")
        this.enemy.body.velocity.x = -100
    }

    update(){
        if(this.game.keyboard.space.isDown){
            this.nextLevel()
        }

        if(this.player.x >= GAME_WIDTH/3){
            this.player.body.velocity.x = 0
        }
        if(this.enemy.x <= 2*GAME_WIDTH/3){
            this.enemy.body.velocity.x = 0
        }
    }

    nextLevel(){
        setSubtitle(this.game, '');
        this.game.currentLevel = new Level4(this.game)
        this.game.currentLevel.create()
        this.destroy()
    }

    destroy(){
        if(isDefined(this.player)) 
            this.player.destroy()
        if(isDefined(this.enemy))  
            this.enemy.destroy()
    }
}
