import React,{Component} from 'react'
import {Consumer} from "../store/MyContext"
import { request } from '../../../utility/uri';
import InfoStudyComponent from "./commons/infoStudyTotalComponent"
class MainComponent extends Component{
    constructor(props){
        super(props)
        request("/english/info_today",{},"post")
        .then(res=>{
            console.log(res.data)
            this.setState({
                info_total: res.data.data
            })
        })
    }
    state = {
        info_total: ""
    }
    addTypeOfGame = (data)=>{
        let listItem = typeof data == "object" ? data : [];
        for(let i=0;i<listItem.length;i++){
            listItem[i].type = Math.floor((Math.random() * 2) + 1);
        }
        return listItem;
    }
    
	render(){
		return (
			<div class="wp_play_game">
                <InfoStudyComponent data= {this.state.info_total}/>
                <table width="100%" class="tab_object">
                    <thead>
                        <th>Gói 3000 Từ vựng</th>
                        <Consumer>
                            {(value)=>{
                                const {playing} = value.state;
                                const {setShowPopup ,setIsloading , getDataGame } = value.action;

                                return <th><button onClick={()=>{
                                    setIsloading(true)
                                    if(!playing){
                                        getDataGame(()=>{
                                            setIsloading(false)
                                        });
                                    }
                                    setShowPopup(true);
                                }}>{playing? "Chơi tiếp":"Luyện tập"}</button></th>
                            }}
                        </Consumer>
                    </thead>
                </table>
            </div>
        );
	}
}

export default MainComponent;