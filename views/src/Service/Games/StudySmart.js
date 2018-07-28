import React,{Component} from "react"
import {Provider,Consumer} from "./store/MyContext"
import MainComponent from "./Components/mainComponent"
import PopupComponent from "./Components/popupComponent"
import queue from './data/queue'
import "./Styles/style.css"
import "./Styles/styleResponsive.css"
import "./Styles/game.css"

var myFrame = new queue();

class StudySmart extends Component{
    render(){
        return(
            <Provider>
                <div class="header-buffer"></div>
                <div id="main_content">
                    <MainComponent/>
                    <Consumer>
                        {(value)=>{
                            const {popupShow} = value.state;
                            return popupShow && <PopupComponent/>
                        }}
                    </Consumer>
                </div>
            </Provider>
        );
    }
}

export default StudySmart;


