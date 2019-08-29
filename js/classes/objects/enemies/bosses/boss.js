class Boss extends Enemy{    
    constructor(game, startX, startY, target, sprite, maxLife, tint){
        super(game, startX, startY, target, sprite, tint)

        this.maxLife = maxLife
        this.life    = maxLife
        this.graphics = this.game.scene.add.graphics()
    }

    drawLifeBar(){
        this.graphics.clear()
        this.graphics.lineStyle(2,0x00ff00)
        this.graphics.fillStyle(0x00aa00, 0.5)
        this.graphics.strokeRect(this.game.width/3, 20, this.game.width/3, 30)
        this.graphics.fillRect(this.game.width/3, 20, (Math.max(this.life,0)/this.maxLife)*(this.game.width/3), 30)
    }

    start(){
        super.start()
        this.drawLifeBar()
    }

    update(){}

    damage(){
        if(!this.started) return
        this.life--
        this.blink()
        this.drawLifeBar()
    }

    destroy(){
        super.destroy()
        this.graphics.clear()
    }
}