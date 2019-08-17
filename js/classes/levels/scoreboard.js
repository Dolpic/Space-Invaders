class Scoreboard{
    constructor(game){
        this.game = game
        game.setTitle('')
        game.scene.input.keyboard.on('keyup', this.keydown, this)

        this.scores = undefined
        this.loaded = false

        this.nameMaxLength = 20

        var ajaxRequest = new XMLHttpRequest()
        ajaxRequest.onreadystatechange = function() {
            if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
                this.scores = ajaxRequest.responseText
            }
        }.bind(this)
        ajaxRequest.open("POST", "https://www.sysmic.ch/game/ajax.php?action=getScores", true)
        ajaxRequest.send()
    }

    create(){
        var title = this.game.scene.add.text(0,0,'You rock !')
        var subtitle = this.game.scene.add.text(0,0,'Enter your name in the highscore and press <Enter>')

        this.formatTitle(title,    this.game.width/2, this.game.height/10, 70)
        this.formatTitle(subtitle, this.game.width/2, this.game.height/5,  30)
    }

    formatTitle(text, posX, posY, size){
        text.setFontSize(size)
        text.setFontFamily("courierCode")
        text.setFill('#00ff00')
        text.setPosition(posX - text.width/2, posY - text.height/2)
    }

    createText(string, posX, posY, size){
        var text = this.game.scene.add.text(0, 0, string)
        text.setFontSize(size)
        text.setFontFamily("silkscreen")
        text.setFill('#00ff00')
        text.setPosition(posX, posY)
        return text
    }

    keydown(event){
        if(!this.loaded) return

        var curText = this.editableText.text
        var code = event.keyCode

        if(code == Phaser.Input.Keyboard.KeyCodes.ENTER){

            if(this.editableText != undefined && this.editableText.text != ""){

                

                var ajaxRequest = new XMLHttpRequest()
                ajaxRequest.onreadystatechange = function() {
                    if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
                        this.editableText.setFill('#00ff00')
                        this.editableScore.setFill('#00ff00')
                        console.log(ajaxRequest.responseText)
                    }
                }.bind(this)
                ajaxRequest.open("POST", "https://www.sysmic.ch/game/ajax.php?action=saveScore", true)
                ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                ajaxRequest.send("data="+this.game.score);
            }

        }else if(code == Phaser.Input.Keyboard.KeyCodes.BACKSPACE){
            this.editableText.text = curText.substring(0, curText.length-1)

        }else if( (code >= Phaser.Input.Keyboard.KeyCodes.A    && code <= Phaser.Input.Keyboard.KeyCodes.Z)   ||
                   code >= Phaser.Input.Keyboard.KeyCodes.ZERO && code <= Phaser.Input.Keyboard.KeyCodes.NINE ||
                   code == Phaser.Input.Keyboard.KeyCodes.SPACE){
            this.editableText.text = (curText + String.fromCharCode(code)).substring(0, this.nameMaxLength)
        }
    }

    update(){

        if(this.scores != undefined && !this.loaded){

            var tabScores = this.scores.split('|')

            var baseX = this.game.width/10
            var baseY = this.game.height/3.5
            var marginBetween = this.game.width/3.5
            var lineHeight = this.game.height/25
            var fontSize = 20

            for(var i = 0; i < Math.min(tabScores.length+1, 40); i++){

                if(i < tabScores.length)
                    var curScore = tabScores[i].split(';')

                if(i >= tabScores.length || this.game.score > curScore[1]){
                    this.editableText  = this.createText("", baseX, baseY + (i-1)*lineHeight, fontSize).setFill("#ff0000")
                    this.editableText.text = "" //Aucune idée de pourquoi il faut faire ca....
                    this.editableScore = this.createText(this.game.score, baseX + marginBetween, baseY + (i-1)*lineHeight, fontSize).setFill("#ff0000")
                }else{
                    this.createText(curScore[0], baseX, baseY + i*lineHeight, fontSize)
                    this.createText(curScore[1], baseX + marginBetween, baseY + i*lineHeight, fontSize)
                }

                if(i == 15){
                    baseX *= 6
                    baseY -= (i+1)*lineHeight
                }
            }

            this.loaded = true
        }

    }

    destroy(){}
}