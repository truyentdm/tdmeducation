import React,{Component } from "react"
import $ from "jquery"
class Header extends Component{
    componentDidMount(){
        var len = $('.content-menu').find('li').length;
        for(var i=0;i<len;i++){
            if(i!=(len-1)){
                $('.content-menu').find('li').eq(i).addClass('c-right');
            }
        }
    }
    render(){
        return(
            <div id="header" class="clearfix">
			<div class="sidebar fl_left">
				<div class="clearfix">
					<a href="#" id="logo" class="fl_left">Panel</a>
					<a id="menu-bar" class="fl_right"><i class="fa fa-bars" aria-hidden="true"></i></a>
				</div>
			</div>
			<div class="content fl_right">
				<div class="clearfix">
					<ul class="header-menu fl_right">
						<li>
							<a href="#" class="notification">
								<i class="far fa-bell"></i>
								<span class="num-nf">4</span>
							</a>
						</li>
						<li>
							<a class="user-info clearfix">
								<div class="user-img fl_left"></div>
								<span class="fl_left">Admin <i class="fas fa-angle-down"></i></span>
							</a>
							<div id="user-config">
								<ul>
									<li><a href="#">Cài đặt</a></li>
									<li><a href="#">Đăng xuất</a></li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
        );
    }
}
export default Header