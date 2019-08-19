class Beer extends Item{
    constructor(game, startPos){
        super(game, startPos, "beer")
        this.sprite.setDisplaySize(20,20)
    }

    caught(){
        this.drink()
    }

    drink(){
       this.game.beersCaught++
       this.destroy()
    }
}
