import CViewBase from "./Common/CViewBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Popup extends CViewBase {

    @property(cc.Label)
    lblTitle: cc.Label = null;

    @property(cc.Label)
    lblContent: cc.Label = null;

    @property(cc.Label)
    lblBtn1: cc.Label = null;

    @property(cc.Label)
    lblBtn2: cc.Label = null;

    @property(cc.Node)
    nodeOk: cc.Node = null;

    @property(cc.Node)
    nodeCancel: cc.Node = null;

    start () {

    }

    /**
     * @param info = {
     *      parent: 弹窗父节点，
     *      title:  标题
     *      content：内容
     *      lblBtn1： 按钮1标签    'hide' 则不显示确定按钮 ； null则默认
     *      lblBtn2： 按钮2标签    'hide' 则不显示取消按钮 ; null则默认
     *      cbBtn1： 按钮1回调
     *      cbBtn2:  按钮2回调
     * }
     */
    updateData(data){
        super.updateData(data);
        this.lblTitle.string = data.title || '提示';
        this.lblContent.string = data.content || '啥？';
        this.lblBtn1.string = data.lblBtn1 || '确定';
        this.lblBtn2.string = data.lblBtn2 || '取消';
        if(data.lblBtn1 == 'hide'){
            this.nodeOk.active = false;
        }
        if(data.lblBtn2 == 'hide'){
            this.nodeCancel.active = false;
        }
    }

    onClickOk(){
        cc.log('click ok')
        if(this.modelData.cbBtn1){
            this.modelData.cbBtn1();
        }
        this.node.destroy();
    }

    onClickCancel(){
        cc.log('click cancel')
        if(this.modelData.cbBtn2){
            this.modelData.cbBtn2();
        }
        this.node.destroy();
    }

    // update (dt) {}
}
