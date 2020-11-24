
const {ccclass, property} = cc._decorator;

@ccclass
export default class CViewBase extends cc.Component {

    modelData: any;    //

    onLoad(){
        this.initView();
        this.initLogic();
    }

    initView(){
        // 初始化界面
    }

    initLogic(){
        // 初始逻辑处理（按钮事件绑定类似处理）
    }

    updateData(data){
        // /
        this.modelData = data;
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
    openPopup(info){
        // parent ,title, content,lblOk, lblCancel, sureCallback
        cc.resources.load('prefab/Popup', cc.Prefab, (err, prefab)=>{
            cc.log('woierueokdfmncskdj')
            if(err){
                cc.log(err);
                return;
            }
            let node = cc.instantiate(prefab);
            node.getComponent(node.name).updateData(info)
            let parent = info.parent||this.node;
            parent.addChild(node);
        })
    }
}
