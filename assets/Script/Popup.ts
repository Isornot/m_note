import CViewBase from "./Common/CViewBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Popup extends CViewBase {

    @property(cc.Label)
    lblTitle: cc.Label = null;

    @property(cc.Label)
    lblContent: cc.Label = null;

    @property(cc.Label)
    lblOk: cc.Label = null;

    @property(cc.Label)
    lblCancel: cc.Label = null;

    @property(cc.Node)
    nodeOk: cc.Node = null;

    @property(cc.Node)
    nodeCancel: cc.Node = null;

    start () {

    }

    /**
     * 
     * @param data {title:'', content:'', lblOk:'', lblCancel:'', sureCallback:(确定按钮回调)}
     */
    updateData(data){
        super.updateData(data);
        this.lblTitle.string = data.title || '提示';
        this.lblContent.string = data.content || '啥？';
        this.lblOk.string = data.lblOk || '确定';
        this.lblCancel.string = data.lblCancel || '取消';
        if(data.lblOk == 'hide'){
            this.nodeOk.active = false;
        }
        if(data.lblCancel == 'hide'){
            this.nodeCancel.active = false;
        }
    }

    onClickOk(){
        if(this.modelData.sureCallback){
            this.modelData.sureCallback();
        }
        this.node.destroy();
    }

    onClickCancel(){
        this.node.destroy();
    }

    // update (dt) {}
}
