
export  class UtilHelper {

    /**
     * 保存谱子到本地
     * @param data {mid:'new Date().getTime()', name:'名称', content:'内容'}
     */
    static saveMusicScoreToLocal(data){
        cc.log('准备缓存的数据:'+JSON.stringify(data));
        let mlistLocal = JSON.parse(cc.sys.localStorage.getItem('MusicList'));
        if(mlistLocal){
            mlistLocal.push(data);
        }else{
            mlistLocal = [data];
        }
        cc.log('当前缓存数据：'+JSON.stringify(mlistLocal));
        cc.sys.localStorage.setItem('MusicList', JSON.stringify(mlistLocal));
    }

    /**
     * 获取本地的谱子
     */
    static getLocalMusicScore(){
        return JSON.parse(cc.sys.localStorage.getItem('MusicList'));
    }


    /**
     * 根据谱子id移除本地的谱子
     * @param id 谱子id
     */
    static removeLocalMusicScoreById(id){
        let data = JSON.parse(cc.sys.localStorage.getItem('MusicList'));
        cc.log('准备移除：'+id);
        cc.log('移除前：'+JSON.stringify(data));
        if(data){
            for(let i = 0; i<data.length; i++){
                if(data[i] == id){
                    data.splice(i, 1);
                    break;        
                }
            }
        }
        cc.log('移除后：'+JSON.stringify(data));        
        cc.sys.localStorage.setItem('MusicList', JSON.stringify(data));
    }

    /**
     * 移除所有本地的谱子
     */
    static removeLocalMusicAll(){
        cc.sys.localStorage.removeItem('MusicList');
    }
}
