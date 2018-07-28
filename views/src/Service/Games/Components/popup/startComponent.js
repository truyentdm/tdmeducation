import React,{Component} from 'react'
import {Consumer} from '../../store/MyContext'

class StartComponent extends Component{
	state = {
		isReadly: false
	}
	render(){
		return (
			<div>
				<Consumer>
					{(value)=>{
						const {isLoading,user_info} = value.state
						const {startPlaying} = value.action
						console.log("user_info",user_info)
						return isLoading ? (
							<div class="wp_center_icon">
								<img src="/imgs/games/load_ico.png" class="load_icon"/>
								<div>Load data</div>
							</div>
						) : (
							<div class="game_list_msg">
								<div class="clearfix">
									<div class="sys_icon fl_left">System</div>
									<div class="sys_msg fl_left">
										<div> { user_info != null ? user_info.user_target : 0 } từ cần ghi nhớ để vượt qua ván chơi</div>
										<div>Có { user_info != null ? user_info.repeatStudy : 0 } từ đã học cần ôn lại</div>
										<div>Còn { user_info != null && (user_info.user_target > user_info.todayStudy) ? (user_info.user_target - user_info.todayStudy) : 0 } từ mới cần học để đạt mục tiêu mỗi ngày</div>
									</div>	
								</div>
								{
									this.state.isReadly ? (
										<div class="clearfix">
										   <div class="me_msg fl_right">
											   <span>Sẵn sàng</span>
										   </div>	
									   </div>
								   ) : (
									<button class="button_game_play" onClick={()=>{
										console.log("Start")
										this.setState({isReadly: true});
										setTimeout(()=>{
											startPlaying();
										},1000)
									}}>Sẵn sàng</button>
								   )
								}
						</div>
						)
					}}
				</Consumer>
			</div>
		);
	}
}

export default StartComponent;