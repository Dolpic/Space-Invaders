class Background extends Object{
    constructor(game){
        super(game, 0, 0, undefined)
        this.starTable = []
        this.moveInCircle = true
        this.maxDistance = Math.sqrt(Math.pow(this.game.width/2,2)+Math.pow(this.game.height/2,2))
        this.speedRotation = 0.01
    }

    create(){
        var pos = new Phaser.Math.Vector2(0,0)

        for(var i = 0; i<130; i++){
            pos.setToPolar(Math.floor(Math.random()*360), Math.random()*this.maxDistance)
            this.starTable.push(this.createRandomStar(pos.x+this.game.width/2, pos.y+this.game.height/2))
        }
    }

    update(){
        var pos = new Phaser.Math.Vector2(0,0)

        for(var i=0; i<this.starTable.length; i++){

            if(this.moveInCircle){
                pos.set(this.starTable[i].x - this.game.width/2, this.game.height/2 - this.starTable[i].realPosY)
                pos.setToPolar(pos.angle()+this.starTable[i].rotationSpeed, pos.length())
                pos.set(pos.x + this.game.width/2, this.game.height/2 - pos.y)

            }else{
                pos.set(this.starTable[i].x, this.starTable[i].realPosY + Math.pow(this.starTable[i].scaleX, 3)/8)
            }

            this.starTable[i].realPosY = pos.y
            this.starTable[i].setPosition(pos.x, pos.y)

            if(pos.y > this.game.height+20 && !this.moveInCircle){
                this.resetStar(this.starTable[i], Math.random()*this.game.width, -20-Math.random()*30)
            }
    
        }
    }

    createRandomStar(posX, posY){
        var curImg = this.game.scene.add.image(-100,-100,'')
        this.resetStar(curImg, posX, posY)
        return curImg
    }

    resetStar(star, posX, posY){
        var scale = 0.2+Math.random()*0.8
        star.setTexture('stars'+(Math.ceil((Math.random()*11))+1))
        star.setPosition(posX, posY)
        star.setRotation(Math.random()*Math.PI*2).setScale(scale)
        star.setAlpha(scale)
        star.realPosY = posY
        star.rotationSpeed = (Math.random()-0.5)*this.speedRotation
    }
}