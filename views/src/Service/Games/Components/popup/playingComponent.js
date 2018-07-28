import React,{Component} from 'react'
import {Consumer} from '../../store/MyContext'
import HeadPlayingComponent from "../commons/headPlayingComponent"
import ExamplePlayingComponent from "../commons/examplePlayingComponent"
import InputPlayingComponent from "../commons/inputPlayingComponent"
import ButtonPlayingComponent from "../commons/buttonPlayingComponent"

const TypeOfPlay = Object.freeze({
	"type_1" : 1, // only sound (emglish)
	"type_2" : 2, // only translate and image
	"type_3" : 3 
});
class PlayingComponent extends Component{

	render(){
		return(
			<Consumer>
				{(value)=>{
					let {type,flag,datadetails} = value.state.data
					return(
						<div class="playing_color">	
							<div class="media_top">
								<div id="media_summary">
									<HeadPlayingComponent audio= {datadetails[0].audio["en"]} type={type}/>
									{flag && <ExamplePlayingComponent/>}
								</div>
								<InputPlayingComponent/>
							</div>
							<ButtonPlayingComponent/>
						</div>
					);
				}}
			</Consumer>
		);
	}
}

export default PlayingComponent;