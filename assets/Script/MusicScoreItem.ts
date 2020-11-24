import CViewBase from "./Common/CViewBase";
import Popup from "./Popup";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MusicScoreItem extends CViewBase {

    @property(cc.Label)
    lbl: cc.Label = null;

    start () {

    }

    initLogic(){

    }

    // data :{id:'', name:'', content:''}
    updateData(data){   
        super.updateData(data);
        this.lbl.string = data.name;
    }

    onClickRemove(){
        let info = {
            parent: this.node.parent.parent,
            content: '确定删除谱子'+this.modelData.name+'吗？（操作不可逆）',
            cbBtn1: ()=>{
                this.node.removeFromParent();
            }
        }
        this.openPopup(info);
    }
}
