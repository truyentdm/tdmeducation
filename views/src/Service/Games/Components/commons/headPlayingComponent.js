import React,{Component} from "react"
import {Consumer} from "../../store/MyContext"
class HeadPlayingComponent extends Component{
    constructor(props){
        super(props);
        this.audio = new Audio()
        this.type = [
            {
                id: 1,
                image: true,
                playAudio: true,
                world: false,
                translate: false
            },
            {
                id: 2,
                image: false,
                playAudio: false,
                world: false,
                translate: true
            }
        ]
    }
    state = {
        image: false,
        playAudio: false,
        world: false,
        translate: false
    }
    getDataType = (key)=>{
        let data = null;
        this.type.forEach(item => {
            if(item.id == this.props.type){
                data = item[key]
            }
        });
        return data;
    }
    componentDidUpdate(){
        // if(this.getDataType("playAudio")){
        //     this.playAudio(this.props.audio)
        // }
    }
    
    playAudio = (source)=>{
        console.log("click play")
        
        if(this.audio.duration > 0 && !this.audio.paused){
            console.log("is Playing")
        }else{
            console.log("Pause")
            this.audio.src = source;
            this.audio.load();
            this.audio.play();
        }
        
    }
    getDataDetail = (data,key)=>{
        return data.datadetails[0][key];
    }
    
    render(){
        return(
            <Consumer>
                {(value)=>{
                    const {isNext,data,flag} = value.state;
                    console.log("Data >>>> ",value.state)
                    return (
                        <div class="media_section clearfix">
                            <div class="s1">
                                <span class="media_img_desc">
                                    {((this.getDataType("image")|| isNext) && this.getDataDetail(data,"image") != undefined && this.getDataDetail(data,"image")["en"] != undefined  ) && <img src={ this.getDataDetail(data,"image")["en"]} alt="" draggable="false"/>}
                                </span>
                            </div>
                            <div class="s1">
                                <span class="playAudio">
                                    {(this.getDataType("playAudio")|| isNext) && <i class="volume-small volume-small fa fa-volume-up" aria-hidden="true" onClick={()=>{this.playAudio(this.getDataDetail(data,"audio")["en"])}}></i>}
                                </span>
                                <span class="audio_word">
                                    { (isNext || this.getDataType("world")) && this.getDataDetail(data,"wordbook")["en"]}
                                    { (!isNext && this.getDataType("translate")) && this.getDataDetail(data,"wordbook")["vi"]}
                                </span>
                                <span class="audio_pa">
                                    { isNext && this.getDataDetail(data,"pronunciation")["en"]}
                                </span>
                                {
                                    //Detail Word
                                    (!flag && isNext) && <div class="audio_intro">
                                            <i class="fa fa-book" aria-hidden="true"></i>
                                            <h3>Thông tin từ</h3>
                                        </div>
                                }
                                
                            </div>
                            <div class="s1">
                                <span class="media_conf">
                                    <i class="fa fa-cog" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}
export default HeadPlayingComponent;