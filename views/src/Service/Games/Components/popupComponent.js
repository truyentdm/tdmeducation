import React,{Component} from 'react'
import {Consumer} from "../store/MyContext"

import StartComponent from "./popup/startComponent"
import PlayingComponent from "./popup/playingComponent"
import EndComponent from './popup/endComponent';

class PopupComponent extends Component{
	render(){
		return (
            <div>
                <div id="wp_popup">
                    <div class="wp_game_frame">
                        <div class="wp_game_border">
                            <Consumer>
                                {value=>{
                                    const {setShowPopup,setPlaying} = value.action;
                                    const {count} = value.state;
                                    return <button onClick={()=>{
                                        setShowPopup(false)
                                        if(count == 0){
                                            setPlaying(false);
                                        }
                                    }} className="close_border">x</button>
                                }}
                            </Consumer>
                            <div class="wp_game_content">
                                <Consumer>
                                {value=>{
                                    const {playing,count} = value.state;
                                    return (!playing ? <StartComponent/> 
                                                : count > 0 && playing ? <PlayingComponent/> 
                                                : <EndComponent/>
                                    );
                                }}
                            </Consumer>
                            </div>
                            <Consumer>
                                {(value)=>{
                                    const {playing} = value.state;
                                    return !playing && <span class="tag_footer">@2018 TDM Edu</span>
                                }}
                            </Consumer>
                        </div>
                    </div>
                    <div class="wp_game_bg"></div>
                </div>
            </div>
        );
	}
}

export default PopupComponent;

