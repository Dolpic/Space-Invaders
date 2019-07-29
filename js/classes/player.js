class Player{
    constructor(game, startX, startY, sprite){
        this.speed = 250
        this.bulletSpeed = 250
        this.shootSpeed = 200
        this.destroyed = false
        this.controlledByPlayer = true

        this.lastShoot = this.shootSpeed
        this.lastHit = 0
        this.invulnerabilityTime = 3000
        this.game = game
        this.spriteName = sprite

        this.sprite = this.game.physics.add.sprite(startX, startY, this.spriteName);
        this.sprite.setCollideWorldBounds(true);
    }

    manageKeyboard(){
        this.sprite.body.velocity.x = 0
        this.sprite.body.velocity.y = 0

        if(this.game.keyboard.left.isDown){
            this.sprite.body.velocity.x = -1
        }
        if(this.game.keyboard.right.isDown){
            this.sprite.body.velocity.x = 1
        }
        if(this.game.keyboard.up.isDown){
            this.sprite.body.velocity.y = -1
        }
        if(this.game.keyboard.down.isDown){
            this.sprite.body.velocity.y = 1
        }
        if(this.game.keyboard.space.isDown && Date.now() - this.lastShoot >= this.shootSpeed){
            this.shoot()
        }

        this.sprite.body.velocity.normalize().scale(this.speed);
    }

    shoot(){
        var bullet = new Bullet(this.game, this.sprite.getCenter(), this.bulletSpeed,'bullet');
        bullet.sprite.body.velocity.setTo(0,-1);

        this.game.currentLevel.bullets.add(bullet);

        this.game.physics.add.overlap(this.game.currentLevel.enemies.getSprite(), 
                                      bullet.sprite, 
                                      function(a,b){
                                          this.game.currentLevel.enemies.damage(a)
                                          bullet.damage(b)
                                      }.bind(this)
                                    );

        this.game.physics.add.overlap(this.game.currentLevel.bricks.getSprite(), 
                                      bullet.sprite, 
                                      function(a,b){
                                          this.game.currentLevel.bricks.damage(a)
                                          bullet.damage(b)
                                      }.bind(this)
                                    );

        if(this.game.currentLevel.boss != undefined && this.game.currentLevel.boss.started){
            this.game.physics.add.overlap(this.game.currentLevel.boss.sprite, bullet.sprite, function(a,b){this.game.currentLevel.boss.damage(a);bullet.damage(b);}.bind(this));
        }

        this.lastShoot = Date.now();
    }

    update(){
        if(this.controlledByPlayer){

            this.manageKeyboard()

            if(this.sprite.body.velocity.x == 0 && this.sprite.body.velocity.y == 0){
                this.sprite.anims.play('relax', true);
            }else{
                this.sprite.anims.play('move', true);
            }
        }
    }

    damage(){
        if(this.controlledByPlayer && Date.now() - this.lastHit > this.invulnerabilityTime){
            this.game.remainingLives--;
            this.game.score -= 100;
            this.lastHit = Date.now();
            Player.blink(this.sprite, 0, this.invulnerabilityTime);
            if(this.game.remainingLives <= 0){
                gameOver(this.game);
            }
        }
    }

    destroy(){
        this.sprite.destroy();
        this.destroyed = true;
    }

    static blink(sprite, state, duration){
        if(state == 0){
            sprite.tint = 0x006600;
        }else{
            sprite.tint = 0xffffff;
        }

        if(duration > 0){
            setTimeout(Player.blink, 120, sprite, state == 0 ? 1 : 0, duration-120);
        }else{
            sprite.tint = 0xffffff;
        }
    }
}

