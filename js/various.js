function isDefined($obj){
  return ($obj !== undefined)
}

function randomNumber(min, max){
  return Math.floor(Math.random()*(max+1-min))+min
}

function randomHueColor(saturation, brightness){
  var color = Phaser.Display.Color.HSLToColor(Math.random(), saturation, brightness)
  return Phaser.Display.Color.GetColor(color.r, color.g, color.b)
}