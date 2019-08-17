class ObjectsTable{
    constructor(){
        this.mainTable = []
    }

    add(element){
        this.mainTable.push(element)
        return element;
    }

    get(id){
        return this.mainTable[id];
    }

    update(){
        for(var i=0; i<this.mainTable.length; i++){
            if(this.mainTable[i].destroyed){
                this.mainTable.splice(i, 1)
            }else{
                this.mainTable[i].update()
            }
        }
    }

    count(){
        return this.mainTable.length;
    }

    start(){
        for(var i=0; i<this.mainTable.length; i++){
            this.mainTable[i].start()
        }
    }

    destroyElement(element){
        for(var i=0; i<this.mainTable.length; i++){
            if(this.mainTable[i] == element){
                this.mainTable[i].destroy()
                return;
            }
        }
    }

    getSprite(){
        var result = [];
        for(var i=0; i<this.mainTable.length; i++){
            result.push(this.mainTable[i].sprite)
        }
        return result;
    }

    damage(element){
        for(var i=0; i<this.mainTable.length; i++){
            if(this.mainTable[i].sprite == element){
                this.mainTable[i].damage()
            }
        }
    }

    destroy(){
        for(var i=0; i<this.mainTable.length; i++){
            this.mainTable[i].destroy()
        }
    }
}