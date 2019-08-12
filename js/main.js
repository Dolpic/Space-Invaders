class SpaceInvaders{

  constructor(canvas, canvasWidth, canvasHeight){

    this.phaserConfig = {
      canvas: canvas,

      type: Phaser.WEBGL,
      antialias : false,

      physics: {default: 'arcade'/*,
        arcade : {debug: true}*/
      },

      scene: {
        preload: this.preload.bind(this),
        create: this.create.bind(this),
        update: this.update.bind(this)
      },

      width:  canvasWidth,
      height: canvasHeight,

      ratio: canvasWidth/canvasHeight
    }

    this.width  = canvasWidth
    this.height = canvasHeight
  }

  start(){
    this.phaserGame = new Phaser.Game(this.phaserConfig)
  }

  preload(){
    this.scene = this.phaserGame.scene.scenes[0]

    this.scene.load.setBaseURL('ressources/')
    this.scene.input.keyboard.addCapture('UP, DOWN, LEFT, RIGHT')
    
    loadSprites(this.scene.load)

    //Force the font to load
    this.scene.add.text(-100,-100,'Mock text').setFontFamily("courierCode")
  
    this.keyboard = this.scene.input.keyboard.createCursorKeys();
    this.background = new Background(this)
  }

  create(){
    createAnimations(this.scene.anims)

    this.mainTitle = this.scene.add.text(0,0,'')
    this.subtitle  = this.scene.add.text(0,0,'')

    this.mainTitle.setDepth(100)
    this.subtitle.setDepth(100)

    SpaceInvaders.formatText(this.mainTitle, 70)
    SpaceInvaders.formatText(this.subtitle,  30)

    SpaceInvaders.textFlash(this.subtitle, '#00ff00')

    this.reset()

    this.setTitle('Sysmic Invaders')
    this.setSubtitle('Insert coin and press <space>')

    this.background.create()
    this.currentLevel.create()
  }

  update(){
    this.background.update()
    this.currentLevel.update()
  
    if(this.isGameOver && this.keyboard.space.isDown){
      this.reset(this)
      this.currentLevel = new Level1(this)
      this.currentLevel.create()
    }
  }

  reset(){
    if(isDefined(this.currentLevel)){
      this.currentLevel.destroy()
    }
  
    this.currentLevel = new TitleScreen(this)
    this.remainingLives = 5
    this.score = 0
    this.scene.physics.world.isPaused = false
    this.setSubtitle('')
    this.isGameOver = false
  }

  gameOver(){
    this.scene.physics.world.isPaused = true
    this.setTitle("Game Over")
  
    setTimeout(
      function(){
        this.setSubtitle('Press <space> to retry')
        this.isGameOver = true
      }.bind(this), 2000)
  }

  setTitle(txt){

    this.mainTitle.setText(txt)
  
    var posX = this.width/2  - this.mainTitle.width/2
    var posY = this.height/3 - this.mainTitle.height/2
  
    this.mainTitle.setPosition(posX, posY)
  }
  
  setSubtitle(txt){
  
    this.subtitle.setText(txt)
  
    var posX = this.width/2  - this.subtitle.width/2
    var posY = this.height/2 - this.subtitle.height/2
    
    this.subtitle.setPosition(posX, posY)
  }

  static textFlash(txt, curColor){
    if(curColor == '#00ff00'){
        txt.setFill('#000000')
        curColor = '#000000'
        var nextCall = 700
    }else{
        txt.setFill('#00ff00')
        curColor = '#00ff00'
        var nextCall = 1400
    }
    
    setTimeout(SpaceInvaders.textFlash, nextCall, txt, curColor)
  }

  static formatText(text, size){
    text.setFontSize(size)
    text.setFontFamily("courierCode")
    text.setFill('#00ff00')
  }
}
