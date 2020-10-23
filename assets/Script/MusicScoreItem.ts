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
        this.node.on('click', ()=>{               
            this.openPopup(this.modelData.name, this.modelData.content, 'hide', 'hide', null);
        })   
    }

    // data :{id:'', name:'', content:''}
    updateData(data){   
        this.lbl.string = data.name;
    }

    onClickRemove(){
        this.openPopup(null, '确定删除谱子'+this.modelData.name+'吗？（操作不可逆）', null, null, ()=>{
            this.node.removeFromParent();
        }); 
    }
}
