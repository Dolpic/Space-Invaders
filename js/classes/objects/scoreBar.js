class ScoreBar extends Object{
    constructor(game){
        super(game, 0, 0, undefined)

        this.height = this.game.height - 50
        this.marginLeft = 50
        this.scoreSpeed = 4
        this.currentScore = 0
        this.obstacles = new ObjectsTable()
    }

    create(){
        var textY = (this.game.height+this.height)/2-15

        this.textScore = this.game.scene.add.text(this.marginLeft,textY, 'Score : ' + this.game.score)
        SpaceInvaders.formatText(this.textScore, 30)

        this.textLives = this.game.scene.add.text(this.game.width/3+this.marginLeft, textY, 'Lives : ' + this.game.remainingLives)
        SpaceInvaders.formatText(this.textLives, 30)

        this.picBeers = this.game.scene.add.image(2*this.game.width/3+this.marginLeft, textY+15, 'beer')
        this.picBeers.setDisplaySize(35,35)
        this.textBeers = this.game.scene.add.text(2*this.game.width/3+this.marginLeft+20, textY, ' : ' + this.game.beersCaught)
        SpaceInvaders.formatText(this.textBeers, 30)

        this.graphics = this.game.scene.add.graphics()
        this.graphics.lineStyle(2,0x00ff00)
        this.graphics.fillStyle(0x00aa00, 0.5)

        this.graphics.strokeRect(0, this.height, this.game.width, this.game.height-this.height)
        this.graphics.fillRect(0, this.height, this.game.width, this.game.height-this.height)

        for(var i=0; i<Math.ceil(this.game.width/12); i++){
            this.obstacles.add(new Obstacle(this.game, i*12, this.height, false)).sprite.setImmovable(true)
        }
        this.game.scene.physics.add.collider(this.game.currentLevel.player.sprite, this.obstacles.getSprite())
    }

    update(){
        this.textLives.setText('Lives : ' + this.game.remainingLives)
        this.textScore.setText('Score : ' + this.currentScore)
        this.textBeers.setText(' : ' + this.game.beersCaught)

        if(this.currentScore < this.game.score){
            this.currentScore += this.scoreSpeed
        }

        if(this.currentScore > this.game.score){
            this.currentScore = this.game.score
        }
    }

    destroy(){
        super.destroy()

        this.textLives.destroy()
        this.textScore.destroy()
        this.graphics.destroy()
        this.picBeers.destroy()
        this.textBeers.destroy()
    }
}
