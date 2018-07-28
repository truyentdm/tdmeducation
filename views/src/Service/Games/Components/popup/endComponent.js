import React,{Component} from 'react'
import {Consumer} from "../../store/MyContext"
import { request } from '../../../../utility/uri';
class EndComponent extends Component{
	render(){
		return (
			<Consumer>
				{(value)=>{
					const {setPlaying , setIsloading, getDataGame } = value.action;
					return (
						<div id="end_played">
							<p>Hoàn thành</p>
							<button class="study" onClick={()=>{
								console.log("luyen tap",typeof setPlaying)
								setPlaying(false)
								setIsloading(true)
								getDataGame(()=>{
									setIsloading(false)
								});
							}}><i class="fas fa-play-circle"></i> Luyện tập</button>
							<button class="home" onClick={()=>{
								location = "/web"
							}} > Home</button>
						</div>
					);
				}}
			</Consumer>
		);
	}
}

export default EndComponent;