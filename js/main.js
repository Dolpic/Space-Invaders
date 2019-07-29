function main(){
  document.getElementById("gameCanvas").style.height = phaserConfig.height + "px"
  document.getElementById("gameCanvas").style.width  = phaserConfig.width  + "px"

  // Global object
  new Phaser.Game(phaserConfig)
}

// TODO encapsuler tout ca dans un objet
function preload(){
  this.load.setBaseURL('ressources/')
  this.input.keyboard.addCapture('UP, DOWN, LEFT, RIGHT')
  
  loadSprites(this)
  forceLoadFonts(this)

  this.keyboard = this.input.keyboard.createCursorKeys();
  this.background = new Background(this)
}

function create(){
  createAnimations(this)

  this.mainTitle = this.add.text(0,0,'')
  this.subtitle  = this.add.text(0,0,'')

  mainTitle = this.mainTitle

  this.mainTitle.setDepth(100)
  this.subtitle.setDepth(100)

  formatText(this.mainTitle, 70)
  formatText(this.subtitle,  30)

  textFlash(this.subtitle, '#00ff00')

  reset(this)

  setTitle(this,    'Sysmic Invaders')
  setSubtitle(this, 'Insert coin and press <space>')

  this.background.create()
  this.currentLevel.create()
}

function update(){
  this.background.update()
  this.currentLevel.update()

  if(this.isGameOver && this.keyboard.space.isDown){
    reset(this)
    this.currentLevel = new Level1(this)
    this.currentLevel.create()
  }
}

function reset(game){
  if(isDefined(game.currentLevel))
    game.currentLevel.destroy()

  game.currentLevel = new TitleScreen(game)
  game.remainingLives = 5
  game.score = 0
  game.physics.world.isPaused = false

  setSubtitle(game, '')

  game.isGameOver = false
}

function gameOver(game){
  game.physics.world.isPaused = true
  setTitle(game, "Game Over")

  setTimeout(
    function(){
      setSubtitle(game, 'Press <space> to retry')
      game.isGameOver = true
    }.bind(this), 2000)
}