import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import MessageHeader from "./MessageHeader"
import { Consumer } from '../../Store/rootContext'
import $ from "jquery"

class Header extends Component{
	menu_top = (value)=>{
		const isLogined = value.state.isLogined;
		const user = value.state.user;
		if(isLogined){
			return <ul id="menu_top">
					<li><a href="/">Home</a></li>
					<li>{user.user_login}</li>
					<li><a href="/user/logout">Đăng xuất</a></li>
				</ul>
		}else{
			return <ul id="menu_top">
					<li><a href="/">Home</a></li>
					<li><a href="/user/login">Login</a></li>
					<li><a href="/user/register">Register</a></li>
				</ul>
		}
	}
	componentDidMount(){
		$(window).scroll(function(){
			var obj_content = $("#root #header .hd-content");
			var logo = $("#root #header .logo");
			var scroll_top = $(this).scrollTop();
			var head_height = $(obj_content).height();
			
			if(scroll_top>0){
				$(obj_content).addClass('fixed');
			}
			if(scroll_top<=0){
				$(obj_content).removeClass('fixed');
			}
		});
	}
	showMessage = (array)=>{
		return array.map((item,index)=>{
			return(
				<MessageHeader >{item.title}</MessageHeader>
			);
		})
	}
	render(){
		return(
			<div id="header">
				<div class="hd-content">
					<div class="container clearfix">
					<div class="left fl_left">
						<div id="logo">
						<img src="imgs/Untitled-2.png" class="transfor" draggable="false"/>
						</div>
					</div>
					<Consumer>
						{(value)=>{
							return (
								<div class="right fl_right">
									{this.menu_top(value)}
								</div>
							);
						}}
					
					</Consumer>
					</div>
					<div id="message_header">
						<div id="wp_message">
							<Consumer>
								{(value)=>{
									const state = value.state
									return this.showMessage(state.messageHeader)
								}}
							</Consumer>
						</div>
					</div>
				</div>
				{/* <div class="header-buffer">
				</div> */}
			</div>
		);
	}
}
export default Header;