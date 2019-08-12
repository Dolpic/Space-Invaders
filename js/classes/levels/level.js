class Level{
    constructor(game){
        this.game      = game
        this.bullets   = new ObjectsTable()
        this.enemies   = new ObjectsTable()
        this.obstacles = new ObjectsTable()
        this.bricks    = new ObjectsTable()
        this.scoreBar  = new ScoreBar(this.game)
        this.started   = false
        this.finished  = false

        this.scoreBar.currentScore = this.game.score

        this.player = new Player(this.game,this.game.width/2, 620, 'player');
    }

    start(){
        if(!this.started){
            this.enemies.start()
            this.started = true
            this.game.setTitle("")
        }
    }

    update(){
        if(this.game.keyboard.left.isDown  || 
           this.game.keyboard.right.isDown ||
           this.game.keyboard.up.isDown    || 
           this.game.keyboard.down.isDown  ||
           this.game.keyboard.space.isDown){
            this.start()
        }

        this.player.update();
        this.enemies.update();
        this.bullets.update();
        this.scoreBar.update();
        this.bricks.update();

        if(this.enemies.count() == 0 && !this.finished && (this.boss === undefined || this.boss.destroyed)){
            this.game.setTitle('Well Done !')
            this.player.controlledByPlayer = false
            this.game.currentLevel.toNextLevel()
            this.finished = true
        }

        if(this.finished){
            this.player.sprite.anims.play('move', true)
        }
    }

    destroy(){
        this.player.destroy()
        this.enemies.destroy()
        this.bullets.destroy()
        this.obstacles.destroy()
        this.scoreBar.destroy()
        this.bricks.destroy()
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
                this.bricks.add(brick)
            }
        }
    }

    nextLevel(newLevel){
        this.game.setSubtitle('');
        this.game.currentLevel.destroy()
        this.game.currentLevel = newLevel
        this.game.currentLevel.create()
    }

    setOverlap(){
        this.game.scene.physics.add.overlap(  this.bricks.getSprite(), 
                                        this.enemies.getSprite(), 
                                        function(a,b){
                                            this.game.currentLevel.bricks.damage(a)
                                        }.bind(this)
                                    )

        this.game.scene.physics.add.overlap(  this.obstacles.getSprite(), 
                                        this.enemies.getSprite(), 
                                        function(a,b){
                                            gameOver(this.game.currentLevel.game)
                                        }.bind(this)
                                    )
    }

    setCollider(){
        this.playerCollider = this.game.scene.physics.add.collider(this.player.sprite, this.obstacles.getSprite())
    }

    addPlayerCollider(object){
        if(isDefined(this.player)){
            this.game.scene.physics.add.overlap(this.player.getSprite(), object.getSprite(), this.generateColliderFunction(this.player, object));
        }
    }

    addEnemiesCollider(object){
        this.game.scene.physics.add.overlap(this.enemies.getSprite(), object.getSprite(), this.generateColliderFunction(this.enemies, object));
    }

    addBricksCollider(object){
        this.game.scene.physics.add.overlap(this.bricks.getSprite(), object.getSprite(), this.generateColliderFunction(this.bricks, object));
    }

    addBulletsCollider(object){
        this.game.scene.physics.add.overlap(this.bullets.getSprite(), object.getSprite(), this.generateColliderFunction(this.bullets, object));
    }

    addBossCollider(object){
        if(isDefined(this.boss)){
            this.game.scene.physics.add.overlap(this.boss.getSprite(), object.getSprite(), this.generateColliderFunction(this.boss, object));
        }
    }

    generateColliderFunction(obj1, obj2){
        return function(a, b){
            obj1.damage()
            obj2.damage()
        }.bind(this)
    }
}