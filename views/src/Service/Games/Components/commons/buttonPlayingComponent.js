import React,{Component} from "react"
import {Consumer} from "../../store/MyContext"

class ButtonPlayingComponent extends Component{
    render(){
        return(
            <Consumer>
                {(value=>{
                    const {isNext,data, flat_data} = value.state
                    const {checkAnswer,nextPlaying,getDataDetail} = value.action
                    return(
                        <div id="media_control">
                            <div class="media_desc_point clearfix">
                                <div class="d1">
                                    {isNext && `Điểm từ vựng là ${flat_data.point}` }
                                </div>
                                <div class="d1">
                                    <input type="button" class="btn_white"
                                        value={isNext ? "Học tiếp" : "Xác nhận"} 
                                        onClick = {()=>{
                                            if(isNext){
                                                nextPlaying()
                                            }else{
                                                checkAnswer( getDataDetail(data,"wordbook")["en"])
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Consumer>
        );
    }
}
export default ButtonPlayingComponent;