class Boss2 extends Boss{
    constructor(game, startX, startY, target){
        super(game, startX, startY, target, 'boss2', 140, 0xff9940)
        this.sprite.setScale(4)
        this.tableIntervals = []
        this.shootSpeed = 150
        this.points     = 2345

        this.circles = []
        this.graphicsCircles = this.game.scene.add.graphics()
        this.graphicsCircles.lineStyle(3, 0x00ff00)
    }

    start(){
        super.start()
        var curCircle = undefined

        for(var i=1; i<10; i++){
            curCircle = new Phaser.Geom.Circle(this.game.width/2, this.game.height/2, i*50)
            this.circles.push(curCircle)
            this.graphicsCircles.strokeCircleShape(curCircle)
        }

    }
}