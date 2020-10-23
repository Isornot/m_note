import CViewBase from "./Common/CViewBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Hello extends CViewBase {

    @property(cc.Prefab)
    musicScore: cc.Prefab = null;
    @property(cc.Prefab)
    create: cc.Prefab = null;

    start () {

    }

    onClickCreate(){
        this.node.addChild(cc.instantiate(this.create));
    }

    onClickPractice(){
        this.node.addChild(cc.instantiate(this.musicScore));
    }

    // update (dt) {}
}
