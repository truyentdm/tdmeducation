import React,{Component } from "react"
import { Link, BrowserRouter as Router } from "react-router-dom"
import $ from "jquery"
class MenuLeft extends Component{
    componentDidMount(){
        $('#middle .sidebar-menu .sub-menu').prev().addClass('chevron-right');
        $('#middle .sidebar-menu>li').click(function(e){
            $('#middle .sidebar-menu .sub-menu').removeClass('select').prev().removeClass('chevron-down').addClass('chevron-right');
            if($(this).children().hasClass('sub-menu')){
                $(this).find('ul').prev().removeClass('chevron-right').addClass('chevron-down');
                $(this).find('ul').addClass('select');
            }
        });
    }
    render(){
        return (
            <div class="sidebar fl_left">
                <ul class="sidebar-menu">
                    <li>
                        <Link to="/panel/">
                            <i class="fa fa-home" aria-hidden="true"></i>
                            <span>Bảng tin</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/panel/StudySmart/view">
                            <i class="fa fa-map" aria-hidden="true"></i>
                            <span>Trắc nghiệm thông minh</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/panel/">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                            <span>Bài viết</span>
                        </Link>
                        <ul class="sub-menu">
                            <li>
                                <Link to="/panel/">Viết mới</Link>
                            </li>
                            <li>
                                <Link to="/panel/">Tất cả các trang</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/panel/">
                            <i class="fa fa-product-hunt" aria-hidden="true"></i>
                            <span>Sản phẩm</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/panel/">
                            <i class="fa fa-database" aria-hidden="true"></i>
                            <span>Đơn hàng</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/panel/">
                            <i class="fa fa-users" aria-hidden="true"></i>
                            <span>Khác hàng</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/panel/">
                            <i class="fa fa-user" aria-hidden="true"></i>
                            <span>Thành viên</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/panel/">
                            <i class="fa fa-windows" aria-hidden="true"></i>
                            <span>Giao diện</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/panel/">
                            <i class="fa fa-cogs" aria-hidden="true"></i>
                            <span>Cấu hình</span>
                        </Link>
                    </li>
                </ul>
			</div>
        );
    }
}
export default MenuLeft