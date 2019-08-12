class ScoreBar{
    constructor(game){
        this.game = game;
        this.height = 650;
        this.marginLeft = 50;
        this.scoreSpeed = 1;
        this.currentScore = 0;
        this.obstacles = new ObjectsTable();
    }

    create(){
        var textY = (this.game.height+this.height)/2-15;

        this.textScore = this.game.scene.add.text(this.marginLeft,textY, 'Score : ' + this.game.score);
        SpaceInvaders.formatText(this.textScore, 30);

        this.textLives = this.game.scene.add.text(this.game.width/2+this.marginLeft, textY, 'Lives : ' + this.game.remainingLives);
        SpaceInvaders.formatText(this.textLives, 30);

        this.graphics = this.game.scene.add.graphics();
        this.graphics.lineStyle(2,0x00ff00);
        this.graphics.fillStyle(0x00aa00, 0.5);
        
        this.graphics.strokeRect(0, this.height, this.game.width, this.game.height-this.height);
        this.graphics.fillRect(0, this.height, this.game.width, this.game.height-this.height);

        for(var i=0; i<Math.ceil(this.game.width/12); i++){
            this.obstacles.add(new Obstacle(this.game, i*12, this.height, false)).sprite.setImmovable(true);
        }
        this.game.scene.physics.add.collider(this.game.currentLevel.player.sprite, this.obstacles.getSprite());
    }

    update(){
        this.textLives.setText('Lives : ' + this.game.remainingLives);
        this.textScore.setText('Score : ' + this.currentScore);

        if(this.currentScore < this.game.score){
            this.currentScore += this.scoreSpeed;
        }

        if(this.currentScore > this.game.score){
            this.currentScore = this.game.score;
        }
    }

    destroy(){
        this.textLives.destroy();
        this.textScore.destroy();
        this.graphics.destroy();
    }
}