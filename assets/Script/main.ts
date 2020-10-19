import CommonData from "./CommonData";
import UtilHelper from "./UtilHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    lblShowNotes:cc.Label = null;

    @property(cc.EditBox)
    editNote: cc.EditBox = null;

    @property(cc.Node)
    nodeTip : cc.Node = null;

    @property(cc.AudioClip)
    soundList: cc.AudioClip[] = [];

    
    // properties: {
    //     audioSource: {
    //         type: cc.AudioSource,
    //         default: null
    //     },
    // }

    inputNotes: string = '';

    noteidList = new Map([
        ['1',0],
        ['2',1],
        ['3',2],
        ['4',3],
        ['5',4],
        ['6',5],
        ['7',6],
        ['A',7],
        ['B',8],
        ['C',9],
        ['D',10],
        ['E',11],
        ['F',12],
        ['G',13],
        ['H',14],
        ['I',15],
        ['J',16],
        ['K',17],
        ['L',18],
        ['M',19],
        ['N',20],
        ['a',21],
        ['b',22],
        ['c',23],
        ['d',24],
        ['e',25],
        ['f',26],
        ['g',27],
        ['h',28],
        ['i',29],
        ['j',30],
        ['k',31],
        ['l',32],
        ['m',33],
        ['n',34],
    ])

    start () {
        // init logic
    }

    onClickOk(){
        this.inputNotes = this.editNote.string;
        this.lblShowNotes.string = this.inputNotes;
    }

    onClickInfo(){
        this.nodeTip.active = true;
    }

    onClickMask(){ 
        this.nodeTip.active = false;
    }

    onClickPlay(){
        let str = this.inputNotes;
        let audio = this.getAudioById(str[0]);
        if (!audio) {
            return;
        }
        let aid = cc.audioEngine.play(audio, false, 1);
        if(str[1]){
            cc.audioEngine.setFinishCallback(aid, () => {
                audio = this.getAudioById(str[1]);
                if(audio){
                    let aid = cc.audioEngine.play(audio, false, 1);
                }
            })
        }
    }

    getAudioById(sid){
        let nlist = this.noteidList;
        let audio = this.soundList[nlist.get(this.inputNotes[sid])];
        if(!audio){
            return false;
        }
        
        return audio;
    }
}
