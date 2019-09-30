class Boss2 extends Boss{
    constructor(game, startX, startY, target){
        super(game, startX, startY, target, 'boss2', 140, 0xff9940)
        this.sprite.setScale(4)
        this.tableIntervals = []
        this.shootSpeed = 150
        this.points     = 2345

        this.circles = []
        this.graphicsCircles = this.game.scene.add.graphics()
        this.graphicsCircles.lineStyle(8, 0x00ff00, 0.2)

        this.hasAppeared = false;
    }

    start(){
        super.start()
        var curCircle = undefined

        for(var i=1; i<11; i++){
            curCircle = new Phaser.Geom.Circle(this.game.width/2, this.game.height/2, i*70)
            curCircle.currentAlpha = i/6
            this.circles.push(curCircle)
        }

        this.game.background.changeToMoveInCircle()

    }

    update(){
        if(!this.hasAppeared){
            this.graphicsCircles.clear()
            for(var i=0; i<this.circles.length; i++){
                var curCircle = this.circles[i]
                curCircle.currentAlpha -= 0.03
                if(curCircle.currentAlpha < -1.5){
                    curCircle.currentAlpha = 1
                }
                this.graphicsCircles.lineStyle(4, 0xcc6620, Math.max(curCircle.currentAlpha, 0))
                this.graphicsCircles.strokeCircleShape(curCircle)
            }
        }
    }
}