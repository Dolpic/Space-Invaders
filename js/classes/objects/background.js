class Background{
    constructor(game){
        this.game = game;
        this.starTable = [];
    }

    create(){
        for(var i = 0; i<100; i++){
            this.starTable.push(this.createRandomStar(Math.random()*GAME_WIDTH, Math.random()*GAME_HEIGHT));
        }
    }

    update(){
        for(var i=0; i<this.starTable.length; i++){
            this.starTable[i].realPosY += Math.pow(this.starTable[i].scaleX, 3)/8;
            this.starTable[i].setPosition(this.starTable[i].x, this.starTable[i].realPosY);

            if(this.starTable[i].y > GAME_HEIGHT){
                this.resetStar(this.starTable[i], Math.random()*GAME_WIDTH, -20-Math.random()*30);
            }
        }
    }

    createRandomStar(posX, posY){
        var curImg = this.game.add.image(-100,-100,'');
        this.resetStar(curImg, posX, posY)
        return curImg;
    }

    resetStar(star, posX, posY){
        var scale = 0.2+Math.random()*0.8;
        star.setTexture('stars'+(Math.ceil((Math.random()*11))+1));
        star.setPosition(posX, posY);
        star.setRotation(Math.random()*Math.PI*2).setScale(scale);
        star.setAlpha(((scale)));
        star.realPosY = posY;
    }

}