import React,{ Component } from "react"
import Login from "./Pages/login"
import Register from "./Pages/register"
import Logout from "./Pages/logout"
import "./Styles/style.css"
class User extends Component{
    constructor(props){
        super(props)
        console.log(props.match)
    }
    router(){
        var slug = this.props.match.params.page;
        if(slug == "login"){
            return <Login {...this.props}/>
        }else if(slug == "register"){
            return <Register {...this.props}/>
        }else if(slug == "logout"){
            return <Logout {...this.props}/>
        }else{
            window.location = "/user/login"
        }
    }
    render(){
        return (
            <React.Fragment>
                <div class="header-buffer"></div>
                {this.router()}
            </React.Fragment>
        );
    }
}

export default User