
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

    openPopup(title, content,lblOk, lblCancel, callback){
        cc.resources.load('prefab/Popup', cc.Prefab, (err, prefab)=>{
            cc.log('woierueokdfmncskdj')
            if(err){
                cc.log(err);
                return;
            }
            let node = cc.instantiate(prefab);
            node.getComponent(node.name).updateData({
                title: title,
                content: content,
                lblOk: lblOk,
                lblCancel: lblCancel,
                sureCallback: callback
            })
            this.node.addChild(node);
        })
    }
}
