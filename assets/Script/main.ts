
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
    @property(cc.Button)
    btnPlay: cc.Button = null;

    inputNotes: string = '';    //输入的字符
    currentPlayStrIndex: 0;     //当前播放的字符下标

    matchNoteAndAudio = new Map([
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

    // init play audio index
    initPlayIndex(){
        this.currentPlayStrIndex = 0;
    }

    onClickOk(){
        this.initPlayIndex();
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
        this.initPlayIndex();
        this.btnPlay.interactable = false;
        let count = this.inputNotes.length-1;
        let currentTurn = 0;
        this.schedule(
            ()=>{
                currentTurn++;
                let audio = this.getAudioById();
                if (audio) {
                    cc.audioEngine.play(audio, false, 1);
                }  
                if(currentTurn == count){
                    this.btnPlay.interactable = true;
                }
            }, 0.5, count, 0);
    }

    getAudioById(){
        if(this.currentPlayStrIndex == this.inputNotes.length){
            console.log('播放完毕');            
            return;
        }
        let mlist = this.matchNoteAndAudio;
        let audio = this.soundList[mlist.get(this.inputNotes[this.currentPlayStrIndex])];
        this.currentPlayStrIndex++;
        if(!audio){
            return false;
        }
        
        return audio;
    }
}
