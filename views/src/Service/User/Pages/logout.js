import React,{ Component } from "react"
import { Consumer } from "../../../Store/rootContext"
import axios from "axios"

class Logout extends Component{
    constructor(props){
        super(props)
        const {isAuthenticated} = props.context.action
        isAuthenticated((data)=>{
            if(!data){
                window.location = "/user/login"
            }
        })        
    }
    handleLogout = (event)=>{
        event.preventDefault();
        console.log("Logout")
        axios({
            method: "POST",
            url: "/user/logout"
        })
        .then(result=>{
            console.log("DATA",result.data);
            if(result.data){
                window.location = "/user/login"
            }
        })
        .catch(e=>console.log(e.toString()))
    }
    render(){
        const user_login = this.props.context.state.user.user_login;
        return (
            <div id="wp_form_user_login">
                <div id="login_toolbar_top">
                    <h3 id="login_title">Đăng xuất</h3>
                </div>
                <div id="login_content">
                    <div class="tip_node">
                    <div style={{textAlign: "center"}}>
                        <p>Chào <b>{user_login}</b>, Hẹn sớm gặp lại bạn nhé </p>
                            <br/>
                            <input type="button" id="btnLogin" value="Đăng xuất" class="btn_primary" onClick={this.handleLogout}/>  
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}
export default Logout;