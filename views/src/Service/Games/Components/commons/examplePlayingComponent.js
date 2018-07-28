import React,{Component} from "react"
import {Consumer} from "../../store/MyContext"

class ExamplePlayingComponent extends Component{
    render(){
        return(
            <Consumer>
                {(value)=>{
                    let {example} = value.state.data;
                    for(let i=0;i<example["en"].length;i++){
                        return (
                            <div class="media_example clearfix">
                                <div class="s2">
                                    <div class="example_img_desc">
                                        <img src="../../imgs/games/child.jpg" alt="" draggable="false"/>
                                    </div>
                                </div>
                                <div class="s3">
                                    <div class="example_summary">
                                        <span class="expAudio">
                                            <i class="fa fa-volume-up" aria-hidden="true"></i>
                                        </span>
                                        <span>{example["en"][i].phrase.text}</span>
                                        
                                    </div>
                                    <div class="example_Detail">
                                        <span class="expAudio">
                                            <i class="fa fa-volume-up" aria-hidden="true"></i>
                                        </span>
                                        <span>{example["en"][i].sentence.text}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    
                }}
                
            </Consumer>
        );
    }
}
export default ExamplePlayingComponent;