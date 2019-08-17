class Scoreboard{
    constructor(game){
        this.game = game
        game.setTitle('')
        game.scene.input.keyboard.on('keyup', this.keydown, this);

        this.scores = undefined
        this.loaded = false

        this.ajaxRequest = new XMLHttpRequest();
        this.ajaxRequest.onreadystatechange = function() {
            if (this.ajaxRequest.readyState == 4 && this.ajaxRequest.status == 200) {
                this.scores = this.ajaxRequest.responseText;
            }
        }.bind(this);
        this.ajaxRequest.open("POST", "https://www.sysmic.ch/game/ajax.php?action=getScores", true);
        this.ajaxRequest.send();

        /*this.charsTable = [
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
            ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
            ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
            ["U", "V", "W", "X", "Y", "U", "V", "W", "X", "Y"],
            ["Z"],
            ["a", "b", "c", "d", "e", "f", "g", "H", "I", "J"],
            ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
            ["U", "V", "W", "X", "Y", "U", "V", "W", "X", "Y"],
            ["Z"],
        ]*/
    }

    create(){
        var title = this.game.scene.add.text(0,0,'You rock !')
        var subtitle = this.game.scene.add.text(0,0,'Enter your name in the highscore')

        this.formatTitle(title, this.game.width/2, this.game.height/10, 70)
        this.formatTitle(subtitle, this.game.width/2, this.game.height/5, 35)
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
        var curText = this.editableText.text
        var code = event.keyCode

        if(code == Phaser.Input.Keyboard.KeyCodes.ENTER){
            console.log("Enter")

        }else if(code == Phaser.Input.Keyboard.KeyCodes.BACKSPACE){
            this.editableText.text = curText.substring(0, curText.length-1)

        }else if( (code >= Phaser.Input.Keyboard.KeyCodes.A    && code <= Phaser.Input.Keyboard.KeyCodes.Z)   ||
                   code >= Phaser.Input.Keyboard.KeyCodes.ZERO && code <= Phaser.Input.Keyboard.KeyCodes.NINE ||
                   code == Phaser.Input.Keyboard.KeyCodes.SPACE){
            this.editableText.text = curText + String.fromCharCode(code)
        }
    }

    update(){

        if(this.scores != undefined && !this.loaded){

            var tabScores = this.scores.split('|')

            var baseX = this.game.width/10
            var baseY = this.game.height/3
            var marginBetween = this.game.width/5
            var lineHeight = this.game.height/20

            for(var i = 0; i < Math.min(tabScores.length+1, 40); i++){

                if(i < tabScores.length)
                    var curScore = tabScores[i].split(';')

                if(i >= tabScores.length || this.game.score > curScore[1]){
                    this.editableText = this.createText('', baseX, baseY + i*lineHeight, 25)
                    this.createText(this.game.score, baseX + marginBetween, baseY + i*lineHeight, 25)
                }else{
                    this.createText(curScore[0], baseX, baseY + i*lineHeight, 25)
                    this.createText(curScore[1], baseX + marginBetween, baseY + i*lineHeight, 25)
                }

                if(i > 20){
                    baseX *= 5
                }
            }

            this.loaded = true
        }

    }

    destroy(){

    }
}