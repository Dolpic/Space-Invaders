class Level{
    constructor(game){
        this.game      = game
        this.bullets   = new ObjectsTable()
        this.enemies   = new ObjectsTable()
        this.obstacles = new ObjectsTable()
        this.bricks    = new ObjectsTable()
        this.items     = new ObjectsTable()
        this.scoreBar  = new ScoreBar(this.game)
        this.started   = false
        this.finished  = false
        this.colliders = []

        this.scoreBar.currentScore = this.game.score
    }

    start(){
        if(!this.started){
            this.enemies.start()
            this.started = true
            this.game.setTitle("")
        }
    }

    create(title){
        this.player = new Player(this.game,this.game.width/2, 820, 'player');
        this.game.setTitle(title);
        this.scoreBar.create();

        for(var i=0; i<Math.ceil(this.game.width/12); i++){
            this.obstacles.add(new Obstacle(this.game, i*12, 770, true)).sprite.setImmovable(true)
            this.obstacles.add(new Obstacle(this.game, i*12, 853, false)).sprite.setImmovable(true)
        }

        this.playerCollider = this.game.scene.physics.add.collider(this.player.sprite, this.obstacles.getSprite())
        this.colliders.push(this.playerCollider)
    }

    update(){
        if(this.game.keyboard.left.isDown  || 
           this.game.keyboard.right.isDown ||
           this.game.keyboard.up.isDown    || 
           this.game.keyboard.down.isDown){
            this.start()
        }

        this.player.update();
        this.enemies.update();
        this.bullets.update();
        this.scoreBar.update();
        this.bricks.update();
        this.items.update();

        if(this.enemies.count() == 0 && !this.finished && (this.boss === undefined || this.boss.destroyed)){
            this.game.setTitle('Well Done !')
            this.player.controlledByPlayer = false
            this.game.currentLevel.toNextLevel()
            this.finished = true
        }

        if(this.finished && this.player.sprite != undefined){
            this.player.sprite.anims.play('move', true)
        }
    }

    createBricksGroup(posX, posY, bluePrint){
        var brickSize = 8
        var marginRight = 5
        for(var i=0; i<bluePrint[0].length; i++){
            for(var j=0; j<bluePrint[1][i]; j++){
                var brickX = posX+(bluePrint[0][i]+j-marginRight)*brickSize
                var brickY = posY+i*brickSize
                var brick = new Brick(this.game, brickX, brickY)
                brick.sprite.tint = 0x00ff55
                this.addBrick(brick)
            }
        }
    }

    nextLevel(newLevel){
        var oldLevel = this.game.currentLevel
        this.game.setSubtitle('');
        this.game.currentLevel = newLevel
        this.game.currentLevel.create()
        oldLevel.destroy()
    }

    addCollider(obj1, obj2, callback, context = this){
        this.colliders.push(this.game.scene.physics.add.overlap(obj1.getSprite(), obj2.getSprite(), callback.bind(context)))
    }

    addItem(item){
        this.items.add(item)
        this.addCollider(item, this.player, item.caught, item)
    }

    addEnemy(enemy){
        this.enemies.add(enemy)
        this.addCollider(this.bricks,    enemy, Level.colliderDamageFirst)
        this.addCollider(this.obstacles, enemy, Level.colliderGameOver)
    }

    addBullet(bullet){
        this.bullets.add(bullet)
        this.addCollider(this.player, bullet, Level.colliderDamageBoth)
        this.addCollider(this.bricks, bullet, Level.colliderDamageBoth)
    }

    addPlayerBullet(bullet){
        this.bullets.add(bullet)
        this.addCollider(this.enemies, bullet, Level.colliderDamageBoth)
        this.addCollider(this.bricks,  bullet, Level.colliderDamageBoth)
        if(isDefined(this.boss)){
            this.addCollider(this.boss, bullet, Level.colliderDamageBoth)
        }
    }

    addBrick(brick){
        this.bricks.add(brick)
        this.addCollider(this.bullets, brick, Level.colliderDamageBoth)
        this.addCollider(brick, this.enemies, Level.colliderDamageFirst)
    }

    gameOver(){
        this.game.scene.physics.world.isPaused = true
        this.game.setTitle("Game Over")
      
        setTimeout(
          function(){
            this.game.setSubtitle('Press <space>')
            this.game.isGameOver = true
        }.bind(this), 2000)
    }

    destroy(){
        this.player.destroy()
        this.enemies.destroy()
        this.bullets.destroy()
        this.obstacles.destroy()
        this.scoreBar.destroy()
        this.bricks.destroy()
        this.items.destroy()

        for(var i=0; i<this.colliders.length; i++){
            this.game.scene.physics.world.removeCollider(this.colliders[i])
            this.colliders[i].destroy()
        }
    }

    static colliderDamageBoth(a, b){
        a.getParent().damage()
        b.getParent().damage()
    }

    static colliderDamageFirst(a ,b){
        a.getParent().damage()
    }

    static colliderGameOver(){
        this.gameOver(this.game.currentLevel.game)
    }
}