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

    loadSprites(this.scene.load)

    this.scene.input.keyboard.addCapture('UP, DOWN, LEFT, RIGHT')
    this.keyboard = this.scene.input.keyboard.createCursorKeys();

    //Force the font to load
    this.scene.add.text(-100,-100,'Dummy').setFontFamily("courierCode")
    this.scene.add.text(-100,-100,'Dummy').setFontFamily("silkscreen")

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

    this.reset()

    this.background.create()
  }

  update(){
    this.background.update()
    this.currentLevel.update()

    if(this.isGameOver && this.keyboard.space.isDown){
      var curLevel = new Scoreboard(this)
      curLevel.create()
      this.currentLevel.destroy()
      this.currentLevel = curLevel
      this.isGameOver = false
    }
  }

  reset(){
    if(isDefined(this.currentLevel)){
      this.currentLevel.destroy()
    }

    this.currentLevel = new TitleScreen(this)
    this.currentLevel.create()
    this.beersCaught = 0
    this.remainingLives = 5
    this.score = 0
    this.scene.physics.world.isPaused = false
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
