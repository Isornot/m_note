// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class cNoteItem extends cc.Component {

    
    @property(cc.Label)
    lblNote: cc.Label = null;
    // @property
    noteId: string = '';    //yinfuid


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    updateData(id){
        this.noteId = id;
        this.lblNote.string = id;
    }

    // update (dt) {}
}
