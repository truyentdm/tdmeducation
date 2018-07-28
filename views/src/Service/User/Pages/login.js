import React,{ Component } from "react"
const uri = require("../../../utility/uri")

class Login extends Component{
    constructor(props){
        super(props);
        const {isAuthenticated} = props.context.action
        this.query_search = uri.getURI()
        console.log(this.query_search)
        isAuthenticated((data)=>{
            if(data){
                window.location = "/user/logout"
            }
        })     
    }
    state = {
        username : "",
        password: "",
        chkSaveMe: true,
        error: {
            username: "",
            password: "",
            server: ""
        }
    }
    componentDidMount(){
        var user = this.query_search !== {} && this.query_search["user"] !== undefined ? this.query_search["user"] : ""
        if(user !== ""){
            this.setState({
                username: user
            })
        }
    }

    handlError = (name,value)=>{
        if(name === "username"){
            const reqular = new RegExp(/^[a-zA-Z0-9]{3,25}$/);
            const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            if( !reqular.test(value) && !email.test(value)){
                this.setState({
                    error: {
                        ...this.state.error,
                        [name]: "Tài khoản không hợp lệ (3 - 25 ký tự hoặc là một email)",
                    }
                })
            }else{
                this.setState({
                    error: {
                        ...this.state.error,
                        [name]: "",
                    }
                })
            }
        }
        if(name === "password"){
            if(value.length < 6 || value.length > 30){
                this.setState({
                    error: {
                        ...this.state.error,
                        [name]: "Mật khẩu không hợp lệ (độ dài 6 - 30)",
                    }
                })
            }else{
                this.setState({
                    error: {
                        ...this.state.error,
                        [name]: ""
                    }
                })
            }
        }
    }
    handleChange = (event)=>{
        let name = event.target.name;
        let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        this.handlError(name,value)
        this.setState({
            [name]: value
        })
    }
    isEmptyError = ()=>{
        if(this.state.username != "" && 
            this.state.password != "" && 
            this.state.error.username == "" &&
            this.state.error.password == ""
        ){
            return true;
        }else{
            return false;
        }
    }
    handleSubmit = (event)=>{
        event.preventDefault();
        this.setState({
            error: {
                ...this.state.error,
                server: ""
            }
        })
        if(this.isEmptyError()){
            console.log(this.state)
            uri.request("/user/login",{
                username: this.state.username,
                password: this.state.password,
                chkSaveMe: this.state.chkSaveMe
            },"POST")
            .then(result=>{
                if(typeof result.data == "object" && result.data.db == -1){
                    console.log("Server")
                    this.setState({
                        error: {
                            ...this.state.error,
                            server: "Server không trả lời, bạn vui lòng nhấn đăng nhập lại nhé"
                        }
                    })
                }else if(result.data === true){
                    console.log("Thanh cong")
                    this.setState({
                        error: {
                            ...this.state.error,
                            server: ""
                        }
                    })
                    window.location = "/";
                }else{
                    console.log("ko Thanh cong")
                    this.setState({
                        error: {
                            ...this.state.error,
                            server: "Tài khoản hoặc mật khẩu không chính xác"
                        }
                    })
                }
                
            })
        }
    }
    showError =(name)=>{
        var message = this.state.error[name] != "" ? this.state.error[name] : ""
        return <div class={message != "" && "message_error"}>{message}</div>
    }
    render(){
        return (
            <div id="wp_form_user_login">
                <div id="login_toolbar_top">
                    <h3 id="login_title">User Login</h3>
                    {/* <span id="login_close">x</span> */}
                </div>
                <div id="login_content">
                {this.showError("server")}
                    <form onSubmit={this.handleSubmit}>
                        <label for="cin_username"><h3>Account</h3></label>
                        <input type="text" id="cin_username" 
                            name="username" 
                            onChange = {this.handleChange}
                            value = {this.state.username}
                        class="standard_input" placeholder="Username or Email" autocomplete="off"/>
                        {this.showError("username")}
                        <label for="cin_password"><h3>Password</h3></label>
                        <input type="password" id="cin_password" 
                            name="password"
                            onChange = {this.handleChange}
                        class="standard_input" placeholder="Password" autocomplete="off"/>
                        {this.showError("password")}
                        <input type="checkbox" id="chkBox" 
                            name="chkSaveMe"
                            checked = {this.state.chkSaveMe === true}
                            onChange={this.handleChange}
                        /> <label for="chkBox">Auto login</label> <br/><br/>
                        <input type="submit" id="btnLogin" value="Login" class={this.isEmptyError() ? "btn_primary" : "btn_disable"}/>
                    </form>
                    <div class="tip_node">
                        <span class="not_account">Not account <a href="/user/register">register</a> now free!</span> <br/>
                        <span class="remember_account">Forgot password <a href="#">view here</a> !</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;