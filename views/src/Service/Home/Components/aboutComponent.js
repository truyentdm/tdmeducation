import React,{ Component } from 'react'
import "../Styles/about.css"

class About extends Component{
	render(){
		return(
			<div class="container">
				<div class="row clearfix">
                    <div class="w50 fl_right center-block">
                        <img src="./imgs/home/safe.png" alt="Hoc Truc Tuyen" class="img-responsive img-circle center-block" />
                    </div>
                    <div class="w50 fl_left">
                        <h3>Học trực tuyến</h3>
                        <p class="lead">Cổng nội dung giáo dục trực tuyến, được xây dựng nhằm mục tiêu đồng hành cùng các bạn học sinh, sinh viên trong quá trình học tập, trau dồi kiến thức, kỹ năng.</p>
                        <p class="lead">Cung cấp phương pháp học tập mới, hiệu quả, ít tốn kém giúp các em tiếp cận với những kiến thức chuẩn thông qua bài giảng của các thầy cô giỏi trên cả nước</p>
                    </div>
                </div>
				<div class="row clearfix">
                    <div class="w50 fl_left center-block">
                        <img src="./imgs/home/time.png" alt="Hoc Truc Tuyen" class="img-responsive img-circle center-block"/>
                    </div>
                    <div class="w50 fl_left">
                        <h3>Không giới hạn thời gian</h3>
                        <p class="lead">Thời gian truy cập không giới hạn, bạn có thể xem lại bài học bất cứ khi nào.</p>
                        <p class="lead">Cung cấp phương pháp học tập mới, hiệu quả, ít tốn kém giúp các em tiếp cận với những kiến thức chuẩn thông qua bài giảng của các thầy cô giỏi trên cả nước</p>
                    </div>
                </div>
			</div>
		);
	}
}
export default About;