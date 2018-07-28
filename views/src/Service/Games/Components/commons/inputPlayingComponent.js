import React,{Component} from "react"
import {Consumer} from "../../store/MyContext"

class Text_Input extends Component{
    render(){
        return(
            <Consumer>
                {(value)=>{
                    const { isNext,user_input } = value.state
                    const { updateInput } = value.action
                    return <div class= {isNext ? "input_desc read_input" : "input_desc write_input"}>{this.props.children}</div>
                }}
            </Consumer>
        );
    }
}
class InputPlayingComponent extends Component{

    render(){
        return(
            <Consumer>
                {(value)=>{
                    const { isNext,user_input } = value.state
                    const { updateInput } = value.action
                    return  <div id="media_description">
                                
                                <textarea class={isNext ? "user_input user_error" : "user_input"}
                                    onChange={(event)=>{
                                        updateInput(event.target.value);
                                    }}
                                    value = {user_input}
                                    readOnly = {isNext}
                                ></textarea>
                                <div class="input_desc">
                                    
                                </div>
                                
                            </div>
                }}
            </Consumer>
        );
    }
}
export default InputPlayingComponent;