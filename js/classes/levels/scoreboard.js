/**
 *  -------------------------------------------------------------------
 *  !! IMPORTANT !!
 *  
 *  Ce fichier contient le script qui encode les pseudos + scores
 *  pour les envoyer au serveur de Sysmic. Cette procédure DOIT rester
 *  secrète sinon il est trivial de pirater le jeu et d'y introduire
 *  n'importe quel score.
 * 
 *  Ce fichier DOIT donc rester secret !
 * 
 *  Méthode de codage :
 *  (théoriquement pas sécurisée, mais une personne normalement constituée ne devrait pas pouvoir deviner ca)
 *  
 *  1. Prendre le pseudo, prendre son encodage en base 64, puis retourner la chaine, on obtient la première chaine
 *  2. Prendre le score,  prendre son encodage en base 64, puis retourner la chaine, on obtient la deuxième chaine
 *  3. Alterner les numéros des caractères des deux chaines, puis encoder la chaine obtenue
 *  4. Prendre la chaine du point 3, et transformer chaque caractère en son numéro de caractère, et
 *     ajouter entre chaque caratère de la nouvelle chaine obtenue un chiffre aléatoire totalement inutile
 * 
 *  (En réalité l'algorithme est encore un peu plus touffu que ca, 
 *   si tu es vraiment courageux tu peux te faire plaisir en lisant le code)
 * 
 *  TODO niveau protection :
 *  - Ne pas avoir de variable qui vaut le score actuel
 * 
 *  -------------------------------------------------------------------
 */

class Scoreboard{
    constructor(game){
        this.game = game
        game.setTitle('')
        game.setSubtitle('')

        this.objects = []

        game.scene.input.keyboard.on('keyup', this.keydown, this)

        this.scores = undefined
        this.loaded = false
        this.isInScoreboard = false
        this.nextEnterResetGame = false
        this.destroyed = false

        this.nameMaxLength = 20
        this.magicNumber   = 30 //It's magic !
        this.ultraMagicNumber = Math.floor(Math.random()*99)+1 //Magic strikes again !

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
        this.title = this.game.scene.add.text(0,0,'')
        this.subtitle = this.game.scene.add.text(0,0,'Loading scores...')

        this.objects.push(this.title)
        this.objects.push(this.subtitle)

        this.formatTitle(this.title,    this.game.width/2, this.game.height/10, 70)
        this.formatTitle(this.subtitle, this.game.width/2, this.game.height/5,  30)
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
        this.objects.push(text)
        return text
    }

    keydown(event){
        if(!this.loaded || this.destroyed) return

        var code = event.keyCode

        if(code == Phaser.Input.Keyboard.KeyCodes.ENTER){

            if(this.nextEnterResetGame){
                this.game.reset()
            }else if(this.editableText != undefined && this.editableText.text != ""){
                this.encodeDataAndSend(this.editableText.text, this.game.score, 0)
                this.subtitle.text = "You can do better ! Press <Enter> to retry !"
                this.formatTitle(this.subtitle, this.game.width/2, this.game.height/5,  25)
                this.nextEnterResetGame = true
            }

        }else if(this.isInScoreboard){

            var curText = this.editableText.text

            if(code == Phaser.Input.Keyboard.KeyCodes.BACKSPACE){
                this.editableText.text = curText.substring(0, curText.length-1)

            }else if( (code >= Phaser.Input.Keyboard.KeyCodes.A    && code <= Phaser.Input.Keyboard.KeyCodes.Z)   ||
                    code >= Phaser.Input.Keyboard.KeyCodes.ZERO && code <= Phaser.Input.Keyboard.KeyCodes.NINE ||
                    code == Phaser.Input.Keyboard.KeyCodes.SPACE){
                this.editableText.text = (curText + String.fromCharCode(code)).substring(0, this.nameMaxLength)
            }
        }
    }

    update(){
        if(this.scores != undefined && !this.loaded){
            this.createScoreboard()
            this.loaded = true
        }
    }

    createScoreboard(){
        var tabScores      = this.scores.split('|')
        var baseX          = this.game.width/10
        var baseY          = this.game.height/3.5
        var marginBetween  = this.game.width/3.5
        var lineHeight     = this.game.height/25
        var fontSize       = 20

        for(var i = 0; i < Math.min(tabScores.length+1, 32); i++){

            if(i < tabScores.length)
                var curScore = tabScores[i].split(';')

            if((i >= tabScores.length || this.game.score > curScore[1]) && !this.isInScoreboard ){
                this.editableText  = this.createText("", baseX, baseY + i*lineHeight, fontSize).setFill("#ff0000")
                //this.editableText.text = "" //Aucune idée de pourquoi il faut faire ca....
                this.editableScore = this.createText(this.game.score, baseX + marginBetween, baseY + i*lineHeight, fontSize).setFill("#ff0000")
                this.isInScoreboard = true
            }else{
                this.createText(curScore[0], baseX, baseY + i*lineHeight, fontSize)
                this.createText(curScore[1], baseX + marginBetween, baseY + i*lineHeight, fontSize)
            }

            if(i == 15){
                baseX *= 6
                baseY -= (i+1)*lineHeight
            }
        }

        if(this.isInScoreboard){
            this.title.text = "You Rock !"
            this.subtitle.text = "Enter your name in the highscore and press <Enter>"
        }else{
            this.title.text = "Nice Try !"
            this.subtitle.text = "You didn't make it to the highscores, but press <Enter> to try again !"
            this.nextEnterResetGame = true
        }

        this.formatTitle(this.title,    this.game.width/2, this.game.height/10, 70)
        this.formatTitle(this.subtitle, this.game.width/2, this.game.height/5,  25)
    }

    destroy(){
        this.destroyed = true
        for(var i=0; i<this.objects.length; i++){
            this.objects[i].destroy()
        }
    }

    encodeDataAndSend(pseudo, score, sciper){
        //Let the fun begin
        var spaces = "                    "
        var realName = this.reverse(this.encode((pseudo+spaces).substring(0, this.nameMaxLength)))

        var zeros = "00000000000000000000"
        var realScore = zeros+score
        var realScore = this.reverse(this.encode(realScore.substring(realScore.length-this.nameMaxLength, realScore.length)))

        var data = ""
        for(var i = 0; i<realName.length; i++){
            var first  = "0000"+(this.persoCharCodeAt(realName, i)*this.ultraMagicNumber)
            first = first.substring(first.length-4, first.length)

            var second = "0000"+(this.persoCharCodeAt(realScore, i)*this.ultraMagicNumber)
            second = second.substring(second.length-4, second.length)

            data += first+""+second
        }
        data = this.encode(data)

        var codedData = ""
        for(var i = 0; i<data.length; i++){
            var firstNumber  = this.persoCharCodeAt(data, i).toString().charAt(0)
            var secondNumber = this.persoCharCodeAt(data, i).toString().charAt(1)
            codedData += firstNumber+""+Math.floor(Math.random()*10)+""+secondNumber+""+Math.floor(Math.random()*10)
        }
        codedData += this.ultraMagicNumber.toString()

        this.sendData(codedData)
    }

    encode(str) {
        return window.btoa(unescape(encodeURIComponent(str)))
    }
      
    decode(str) {
        return decodeURIComponent(escape(window.atob(str)))
    }

    persoCharCodeAt(string, index){
        return string.charCodeAt(index) - this.magicNumber
    }

    reverse(str){
        return str.split("").reverse().join("")
    }

    sendData(data){
        var ajaxRequest = new XMLHttpRequest()
        ajaxRequest.onreadystatechange = function() {
            if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
                this.editableText.setFill('#00ff00')
                this.editableScore.setFill('#00ff00')
                //console.log(ajaxRequest.responseText)
            }
        }.bind(this)
        ajaxRequest.open("POST", "https://www.sysmic.ch/game/ajax.php?action=saveScore", true)
        ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        ajaxRequest.send("data="+data);
    }
}