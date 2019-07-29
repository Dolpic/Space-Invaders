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
        var textY = (GAME_HEIGHT+this.height)/2-15;

        this.textScore = this.game.add.text(this.marginLeft,textY, 'Score : ' + this.game.score);
        formatText(this.textScore, 30);

        this.textLives = this.game.add.text(GAME_WIDTH/2+this.marginLeft, textY, 'Lives : ' + this.game.remainingLives);
        formatText(this.textLives, 30);

        this.graphics = this.game.add.graphics();
        this.graphics.lineStyle(2,0x00ff00);
        this.graphics.fillStyle(0x00aa00, 0.5);
        
        this.graphics.strokeRect(0, this.height, GAME_WIDTH, GAME_HEIGHT-this.height);
        this.graphics.fillRect(0, this.height, GAME_WIDTH, GAME_HEIGHT-this.height);

        for(var i=0; i<Math.ceil(GAME_WIDTH/12); i++){
            this.obstacles.add(new Obstacle(this.game, i*12, this.height, false)).sprite.setImmovable(true);
        }
        this.game.physics.add.collider(this.game.currentLevel.player.sprite, this.obstacles.getSprite());
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