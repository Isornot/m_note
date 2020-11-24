import CViewBase from "./Common/CViewBase";
import {UtilHelper} from "./Common/UtilHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MusicScore extends CViewBase {

    @property(cc.Node)
    musicList: cc.Node = null;

    @property(cc.Prefab)
    musicItem: cc.Prefab = null;

    @property(cc.Node)
    addMusicPopup: cc.Node = null;

    @property(cc.EditBox)
    editCtt: cc.EditBox = null;

    @property(cc.EditBox)
    editName: cc.EditBox = null;


    start () {

    }

    onLoad(){        
        let musicList = UtilHelper.getLocalMusicScore();
        cc.log('mmm:'+JSON.stringify(musicList));
        if(musicList){
            musicList.forEach(element => {
                let item = cc.instantiate(this.musicItem);
                if(item){
                    item.getComponent(item.name).updateData(element);
                }
                this.musicList.addChild(item);
            });
        }else{
            // 暂无谱子，可添加新谱子
        }
    }

    onClickClearAll(){
        this.openPopup({
            content: '确定清空全部列表吗？（操作不可逆）',
            cbBtn1: ()=>{
                this.musicList.removeAllChildren();
                UtilHelper.removeLocalMusicAll()
            }
        });
    }

    onClickOpenAddWin(){
        this.addMusicPopup.active = true;
    }

    onClickSave(){
        let data = {
            mid: new Date().getTime(),
            name: this.editName.string||this.editCtt.string.slice(0, 7),
            content: this.editCtt.string,
        }
        UtilHelper.saveMusicScoreToLocal(data);
        this.addMusicPopup.active = false;
    }    

    onClickCancel(){
        this.addMusicPopup.active = false;
    }

    onClickBack(){
        this.node.destroy();
    }

    // update (dt) {}
}
