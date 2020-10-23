import CViewBase from "./Common/CViewBase";

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
        let musicList = JSON.parse(cc.sys.localStorage.getItem('MusicList'));
        if(musicList){
            musicList.forEach(element => {
                let item = cc.instantiate(this.musicItem);
                if(item){
                    item.getComponent(item.name).updateData(element);
                }
            });
        }
    }

    /**
     * 保存谱子到本地
     * @param data {mid:'new Date().getTime()', name:'名称', content:'内容'}
     */
    saveMusicScoreToLocal(data){
        let mlistLocal = JSON.parse(cc.sys.localStorage.getItem('MusicList'));
        if(mlistLocal){
            mlistLocal.push(data);
        }else{
            mlistLocal = data;
        }
        cc.sys.localStorage.setItem('MusicList', JSON.stringify(mlistLocal));
    }

    onClickClearAll(){
        this.openPopup(null, '确定清空全部列表吗？（操作不可逆）', null, null, ()=>{
            this.musicList.removeAllChildren();
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
        this.saveMusicScoreToLocal(data);
    }    

    onClickCancel(){
        this.addMusicPopup.active = false;
    }

    onClickBack(){
        let midlist = [];
        this.musicList.children.forEach((item)=>{
            midlist.push(item.getComponent(item.name).modelData.mid);
        });
        cc.log('midlsist:'+JSON.stringify(midlist));
        this.node.destroy();
    }

    // update (dt) {}
}
