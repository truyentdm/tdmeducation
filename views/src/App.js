import React,{Component} from "react"
import ReactDOM from "react-dom"
// import io from 'socket.io-client';
import Service from './Service/pageIndex'
import Panel from './adv/Panel'
import {Provider,Consumer} from "./Store/rootContext"

// const socket = io("/my-namespace");
class App extends Component{
	constructor() {
		super()
		global.baseURL = __dirname;
		this.state = {
			pathname: location.pathname
		}
	}
	switch_screen(){
		const isScreenAdmin = this.state.pathname.substring(0,7) == "/panel/" || this.state.pathname == "/panel" || this.state.pathname == "/panel/";
		return isScreenAdmin ? <Panel/> : <Service/>
	}
	render(){
		return(
		<Provider>
				{this.switch_screen()} 
		</Provider>);
	}
}
ReactDOM.render(<App/>,document.getElementById("root"));