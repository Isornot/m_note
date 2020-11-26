import CViewBase from "./Common/CViewBase";
import { UtilHelper } from "./Common/UtilHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Create extends CViewBase {

    @property(cc.Label)
    lblTip:cc.Label = null;

    @property(cc.EditBox)
    editNote: cc.EditBox = null;

    @property(cc.Node)
    nodeTip : cc.Node = null;

    @property(cc.Node)
    btnSave: cc.Node = null;

    @property(cc.AudioClip)
    soundList: cc.AudioClip[] = [];
    @property(cc.Button)
    btnPlay: cc.Button = null;

    inputNotes: string = '';    //输入的字符
    currentPlayStrIndex: 0;     //当前播放的字符下标
    rightNotesInfo : any;     //正确的谱子信息
    rightNotes: '';         //正确的谱子
    localMusicScore: any;       //本地存储的谱子

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

    initView(){
        super.initView();
        this.changeMusicScore();
    }

    initLogic(){
        super.initLogic();

    }

    // init play audio index
    initPlayIndex(){
        this.currentPlayStrIndex = 0;
    }

    updateRightNotesInfo(info){
        this.rightNotesInfo = info;
        this.rightNotes = info.content;
    }

    showInputUI(bool){
        this.editNote.node.parent.active = bool;
    }

    showSaveUI(bool){
        this.btnSave.active = bool;
    }

    /**
     * 更换谱子
     */
    changeMusicScore(){
        this.initPlayIndex();
        if(!this.localMusicScore){
            this.localMusicScore = UtilHelper.getLocalMusicScore();
        }
        let data = this.localMusicScore;
        if(data && data.length>0){
            let randomIndex = 0;
            if(data.length > 1){
                randomIndex = Math.floor(Math.random()*data.length)
            }
            this.updateRightNotesInfo(data[randomIndex]);
        }else{
            this.lblTip.string = '请先返回上一级添加谱子';
        }
    }

    /**
     * 播放谱子
     * @param playNotes 谱子内容
     */
    playNotes(notes){
        this.initPlayIndex();
        this.btnPlay.interactable = false;
        let count = notes.length-1;
        let currentTurn = 0;
        this.schedule(
            ()=>{
                currentTurn++;
                let audio = this.getAudioById(notes);
                cc.log('audio')
                cc.log(audio)
                if (audio) {
                    cc.audioEngine.play(audio, false, 1);
                }  
                if(currentTurn == count){
                    this.btnPlay.interactable = true;
                }
            }, 0.5, count, 0);
    }

    /**
     * 点击更换谱子
     */
    onClickChangeMusicScore(){
        this.changeMusicScore();
        this.playNotes(this.rightNotes);
    }

    onClickCheck(){
        this.initPlayIndex();
        // check the answer
        this.inputNotes = this.editNote.string;
        if(this.rightNotes == this.editNote.string){
            this.lblTip.string = 'bingo！'
        }else{
            this.lblTip.string = '错了，正确答案是：'+this.rightNotes
        }
    }

    /**
     * 点击试听
     */
    onClickAudition(){
        if(this.editNote.string == ''){
            this.editNote.placeholderLabel.string = '请在此输入想要试听的简谱';
        }else{
            this.playNotes(this.editNote.string);
        }
    }

    onClickPlay(){
        let playNotes = this.rightNotes;
        if(!playNotes || playNotes == ''){
            return
        }
        this.showInputUI(true);
        this.playNotes(playNotes);
    }

    /**
     * 点击生成
     */
    onClickGenerate(){
        //当前生成只
        let index = parseInt(this.editNote.string [0]) || 8    //需要非法字符
        let createdNotes = ''
        // 取出生成的音符区域
        let notesArr = Array.from(this.matchNoteAndAudio.keys())
        cc.log('noteAr234r:'+notesArr)
        for(let i = 0; i<index; i++){
            createdNotes += notesArr[Math.floor(Math.random()*this.matchNoteAndAudio.size)] || '';
        }
        cc.log('生成lellel：'+createdNotes);
        if(createdNotes && createdNotes.length>0){
            let info = {
                mid: new Date().getTime(),
                name: createdNotes.slice(0, 7),
                content: createdNotes
            }
            this.updateRightNotesInfo(info);
            this.playNotes(this.rightNotes);
            this.showSaveUI(true);
        }
    }

    /**
     * 添加到本地
     */
    onClickSave(){
        // 将试听和生成添加到本地
        UtilHelper.saveMusicScoreToLocal(this.rightNotesInfo);
        this.showSaveUI(false);
    }   

    onClickInfo(){
        this.nodeTip.active = true;
    }

    onClickMask(){ 
        this.nodeTip.active = false;
    }

    onClickBack(){
        this.node.destroy();
    }

    /**
     * 获取当前应播放的audio
     */
    getAudioById(playNotes){
        if(!playNotes || playNotes == ''){
            return;
        }
        if(this.currentPlayStrIndex == playNotes.length){
            console.log('播放完毕');            
            return;
        }
        let mlist = this.matchNoteAndAudio;
        let audio = this.soundList[mlist.get(playNotes[this.currentPlayStrIndex])];
        this.currentPlayStrIndex++;
        if(!audio){
            return false;
        }
        
        return audio;
    }

}
