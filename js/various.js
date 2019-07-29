function setTitle(game, txt){

  game.mainTitle.setText(txt)

  var posX = GAME_WIDTH/2  - game.mainTitle.width/2
  var posY = GAME_HEIGHT/3 - game.mainTitle.height/2

  game.mainTitle.setPosition(posX, posY)
}

function setSubtitle(game, txt){

  game.subtitle.setText(txt)

  var posX = GAME_WIDTH/2  - game.subtitle.width/2
  var posY = GAME_HEIGHT/2 - game.subtitle.height/2
  
  game.subtitle.setPosition(posX, posY)
}

function textFlash(txt, curColor){
  if(curColor == '#00ff00'){
      txt.setFill('#000000')
      curColor = '#000000'
      var nextCall = 700
  }else{
      txt.setFill('#00ff00')
      curColor = '#00ff00'
      var nextCall = 1400
  }
  
  setTimeout(textFlash, nextCall, txt, curColor)
}

function formatText(text, size){
  text.setFontSize(size)
  text.setFontFamily("courierCode")
  text.setFill('#00ff00')
}

function forceLoadFonts(game){
  // Force the font to be loaded... ?
  game.add.text(-100,-100,'Mock text').setFontFamily("courierCode")
}

function isDefined($obj){
  return ($obj !== undefined)
}