class Background extends Object{
    constructor(game){
        super(game, 0, 0, undefined)
        this.starTable = []
    }

    create(){
        for(var i = 0; i<100; i++){
            this.starTable.push(this.createRandomStar(Math.random()*this.game.width, Math.random()*this.game.height))
        }
    }
    
    createRandomStar(posX, posY){
        var curImg = this.game.scene.add.image(-100,-100,'');
        this.resetStar(curImg, posX, posY)
        return curImg
    }

    update(){
        for(var i=0; i<this.starTable.length; i++){
            this.starTable[i].realPosY += Math.pow(this.starTable[i].scaleX, 3)/8
            this.starTable[i].setPosition(this.starTable[i].x, this.starTable[i].realPosY)

            if(this.starTable[i].y > this.game.height){
                this.resetStar(this.starTable[i], Math.random()*this.game.width, -20-Math.random()*30)
            }
        }
    }

    resetStar(star, posX, posY){
        var scale = 0.2+Math.random()*0.8
        star.setTexture('stars'+(Math.ceil((Math.random()*11))+1))
        star.setPosition(posX, posY)
        star.setRotation(Math.random()*Math.PI*2).setScale(scale)
        star.setAlpha(scale)
        star.realPosY = posY
    }

}