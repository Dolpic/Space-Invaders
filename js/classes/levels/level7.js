class Level7 extends Level{
    constructor(game){
        super(game)
    }

    create(){
        super.create("Level 7")

        this.boss = new Boss2(this.game, this.game.width/2, this.game.height/2 - 30, this.player, 'boss2')
        this.boss.start()

        var bluePrint = [[4,3,2,1,0],[2,4,6,8,10]]
        for(var i=1; i<3; i++){
            this.createBricksGroup(i*this.game.width/3, 650, bluePrint)
        }
    }

    toNextLevel(){
        setTimeout(this.nextLevel.bind(this), 3000, new Scoreboard(this.game))
    }
}