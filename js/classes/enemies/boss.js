class Boss{
    constructor(game, startX, startY, target, sprite){
        this.game = game;
        this.spriteName = sprite
        this.target = target;
        this.destroyed = false;
        this.started = false;
        this.tableIntervals = [];
        this.bullets = new ObjectsTable();
        this.maxLife = 140;
        this.life = this.maxLife;

        this.shootSpeed = 150;
        this.points = 1234;

        this.sprite = this.game.physics.add.sprite(startX, startY, this.spriteName); 
        this.sprite.anims.play(this.spriteName, true);
        this.sprite.setDepth(10);

        this.hellBallSprite = null;

        this.graphics = this.game.add.graphics();
    }

    start(){
        this.drawLifeBar();
        this.hellBall();
        this.started = true;
        setTimeout(function(){
                    this.tableIntervals.push(setInterval(this.shootToPlayer.bind(this), 700)
                )}.bind(this), 2500);
    }

    update(){}

    drawLifeBar(){
        this.graphics.clear();
        this.graphics.lineStyle(2,0x00ff00);
        this.graphics.fillStyle(0x00aa00, 0.5);
        this.graphics.strokeRect(GAME_WIDTH/3, 20, GAME_WIDTH/3, 30);
        this.graphics.fillRect(GAME_WIDTH/3, 20, (Math.max(this.life,0)/this.maxLife)*(GAME_WIDTH/3), 30);
    }

    damage(){
        this.life--;
        this.drawLifeBar();
        this.sprite.tint = 0x61ffdc;

        setTimeout(function(){this.sprite.tint = 0x00e3b1}.bind(this), 100);

        switch(this.life){
            case 120:
                setTimeout(function(){
                    this.shootBouncingBall('bossBullet1', 100, 150);
                    this.shootBouncingBall('bossBullet1', -100, 150);
                }.bind(this), 2500);
                break;
            case 100:
                setTimeout(function(){
                    this.shootBouncingBall('bossBullet1', 150, -100);
                    this.shootBouncingBall('bossBullet1', -150, -100);
                }.bind(this), 4000);
                break;
            case 80:
                this.shootSpeed = 200;
                break;
            case 60:
                this.pelletCircle(1,1);
                this.tableIntervals.push(setInterval(this.pelletCircle.bind(this), 15000));
                break;
            case 40:
                this.shootSpeed = 250;
                break;
            case 20:
                this.pelletCircle(1,1);
                this.pelletCircle(-1,1);
                this.pelletCircle(1,-1);
                this.pelletCircle(-1,-1);
                break;
            case 0:
                for(var i=0; i<this.tableIntervals.length; i++){
                    clearInterval(this.tableIntervals[i]);
                }
                this.flash();
                setTimeout(function(){
                    this.sprite.setTexture('boss1Death',17);
                    this.sprite.anims.play('boss1Death', true)
                }.bind(this), 2000);
                setTimeout(function(){
                    this.game.score += this.points;
                    this.destroy();
                }.bind(this),5000);
                break;
        }

    }

    hellBall(){
        this.hellBallSprite = this.game.physics.add.sprite(this.sprite.x, this.sprite.y, "hellBall"); 
        this.hellBallSprite.anims.play("hellBall", true);
        this.hellBallSprite.setScale(1.5)
        this.hellBallSprite.tint = 0xf4ff65;
        this.game.physics.add.overlap(this.game.currentLevel.obstacles.getSprite(), this.hellBallSprite, this.game.currentLevel.collapse.bind(this.game.currentLevel));
        this.hellBallSprite.setGravityY(500);
        this.hellBallSprite.setVelocityY(50);
    }

    shootBouncingBall(bulletType, velocityX, velocityY){
        var bullet = this.shoot(bulletType, velocityX, velocityY);
        bullet.setScale(1.3).setBounce(1).setCollideWorldBounds(true);
        bullet.tint = 0xff0033;
    }

    shoot(bulletType, velocityX, velocityY, rotation){
        if(rotation === undefined) rotation = 0;

        var bullet = this.game.physics.add.sprite(this.sprite.x, this.sprite.y, bulletType); 
        bullet.anims.play(bulletType, true);
        bullet.setVelocity(velocityX, velocityY)
        bullet.setRotation(rotation);
        bullet.setCircle(bullet.width/2);
        this.game.physics.add.overlap(this.game.currentLevel.player.sprite, bullet, function(a,b){this.game.currentLevel.player.damage(a)}.bind(this));
        this.bullets.add(bullet);
        return bullet;
    }

    shootToPlayer(){
        var vector = new Phaser.Math.Vector2(this.game.currentLevel.player.sprite.x-this.sprite.x, this.game.currentLevel.player.sprite.y-this.sprite.y);
        vector.normalize().scale(this.shootSpeed);
        this.shoot('bossBullet1', vector.x, vector.y)
    }

    pelletCircle(directionX, directionY){
        if(directionX === undefined) directionX = Math.random();
        if(directionY === undefined) directionY = Math.random();

        var nbPellets = 25;
        var vector = new Phaser.Math.Vector2(directionX, directionY).normalize().scale(130);
        for(var i=0; i<nbPellets; i++){
            vector.setToPolar(vector.angle() + 2*Math.PI/nbPellets, vector.length());
            setTimeout(this.shoot.bind(this), i*200, 'bossBullet2', vector.x, vector.y, vector.angle()+Math.PI/2);
        }
    }

    flash(){
        this.tableIntervals.push(setInterval(function(){this.sprite.tint = 0x00e3b1}.bind(this), 200));
        this.tableIntervals.push(setTimeout(function(){
            setInterval(function(){this.sprite.tint = 0xffffff}.bind(this), 200);
        }.bind(this), 100));
    }

    destroy(){
        this.graphics.clear();
        this.sprite.destroy();
        for(var i=0; i<this.tableIntervals.length; i++){
            clearInterval(this.tableIntervals[i]);
        }
        this.bullets.destroy();
        this.destroyed = true;
    }
}