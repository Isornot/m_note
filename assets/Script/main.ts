import UtilHelper from "./UtilHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    lblShowNotes:{
        type: cc.Label,
        tooltip: '显示的音符',
        default: null
    }
    // lblShowNotes: cc.Label = null;

    @property(cc.EditBox)
    editNote: cc.EditBox = null;

    @property(cc.Node)
    nodeTip : cc.Node = null;

    inputNotes: string = '';

    start () {
        // init logic
    }

    onClickOk(){
        this.inputNotes = this.editNote.string;
    }

    onClickInfo(){
        this.nodeTip.active = true;
    }

    onClickMask(){
        this.nodeTip.active = false;
    }
}
