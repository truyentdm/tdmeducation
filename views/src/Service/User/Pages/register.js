import React,{ Component } from "react"
import axios from "axios"

class Register extends Component{
    state = {
        username : "",
        password: "",
        re_password: "",
        email: "",
        chkSaveMe: true,
        slcGender: 1,
        error: {
            username: "",
            password: "",
            re_password: "",
            email: ""
        },
        message: {
            username: "Tài khoản không hợp lệ (3 - 25)",
            email: "Email không hợp lệ",
            password: "Mật khẩu không hợp lệ (độ dài 6 - 30)",
            re_password: "Mật khẩu không khớp"
        }
    }
    handlError = (name,value,server = "")=>{
        let _condition = false;
        let message = "";
        if(name === "username" && server == ""){
            const reqular = new RegExp(/^[a-zA-Z0-9]{3,25}$/);
            _condition = !reqular.test(value)
        }
        if(name === "email" && server == ""){
            const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            _condition = !email.test(value)
        }
        if(name === "password"){
            _condition = (value.length < 6 || value.length > 30)
        }
        if(name === "re_password"){
            _condition = (value != this.state.password)
        }

        //server
        if(server != ""){
            
            if(server.message.db != undefined && server.message.db == -1){
                 
            }else{
                if(server.message.error == 0 && server.message.exist){
                    console.log("CHECK SERVER")
                    _condition = true;
                    message = server.type == "email" ? "Email đã tồn tại" : "Tài khoản đã tồn tại" 
                }else if(server.message.error == 1){
                    _condition = true;
                    message = "Kiểm tra lại thông tin"
                }else{

                }
            }
        }

        ((name,condition,message="")=>{
            if(condition){
                this.setState({
                    error:{
                        ...this.state.error,
                        [name]: message == "" ? this.state.message[name] : message
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
        })(name,_condition,message)
        
    }
    handleChange = (event)=>{
        let name = event.target.name;
        let value = event.target.type === "checkbox" ? event.target.checked : event.target.value.trim();
        this.handlError(name,value)
        this.setState({
            [name]: value
        })
    }
    isEmptyError = ()=>{
        if(this.state.username != "" && 
            this.state.password != "" && 
            this.state.error.username == "" &&
            this.state.error.password == "" &&
            this.state.re_password != "" &&
            this.state.error.re_password == "" &&
            this.state.chkSaveMe == true &&
            this.state.slcGender >= -1 && this.state.slcGender <= 1
        ){
            return true;
        }else{
            return false;
        }
    }
    handleSubmit = (event)=>{
        event.preventDefault();
        console.log(this.state)
        if(this.isEmptyError()){
            axios({
                method: "POST",
                data: {
                    username:       this.state.username,
                    email:          this.state.email,
                    password:       this.state.password,
                    re_password:    this.state.re_password,
                    slcGender:      this.state.slcGender,
                    chkSaveMe:      this.state.chkSaveMe
                },
                url: "/user/register"
            })
            .then(result=>{
                console.log(result.data)
                if(result.data.error != undefined && result.data.error == 0){
                    window.location = "/user/login?user="+result.data.username
                }
            })
            .catch(e=>{
                console.log(e.toString())
            })
        }
    }
    handFocus = (name,value)=>{
        console.log("OUT",event)
        if(this.showError(name)==""){
            axios({
                method: "POST",
                data: {
                    type: name,
                    keyword: value
                },
                url: "/user/exist_user"
            })
            .then(result=>{
                console.log(result.data)
                this.handlError(result.data.type,"",result.data)
            })
            .catch(e=>{
                console.log(e.toString())
            })
        }
    }
    showError =(name)=>{
        var message = this.state.error[name] != "" ? this.state.error[name] : ""
        return message;
    }
    render(){
        return (
            <div id="wp_form_user_login">
                <div id="login_toolbar_top">
                    <h3 id="login_title">User Login</h3>
                    {/* <span id="login_close">x</span> */}
                </div>
                <div id="login_content">
                    <form onSubmit={this.handleSubmit}>
                        <label for="cin_email"><h3>Email</h3></label>
                        <input type="text" id="cin_email" 
                            name="email" 
                            onChange = {this.handleChange}
                            onBlur = {()=>{
                                this.handFocus("email",this.state.email)
                            }}
                            value = {this.state.email}
                        class="standard_input" placeholder="Email" autocomplete="off"/>
                        <div class={this.showError("email") != "" && "message_error"}>{this.showError("email")}</div>
                        <label for="cin_username"><h3>Account</h3></label>
                        <input type="text" id="cin_username" 
                            name="username" 
                            onChange = {this.handleChange}
                            value = {this.state.username}
                            onBlur = {()=>{
                                this.handFocus("username",this.state.username)
                            }}
                        class="standard_input" placeholder="Username" autocomplete="off"/>
                        <div class={this.showError("username") != "" && "message_error"}>{this.showError("username")}</div>
                        <label for="cin_password"><h3>Password</h3></label>
                        <input type="password" id="cin_password" 
                            name="password"
                            onChange = {this.handleChange}
                        class="standard_input" placeholder="Password" autocomplete="off"/>
                        <div class={this.showError("password") != "" && "message_error"}>{this.showError("password")}</div>
                        <input type="password" id="cin_repassword" 
                            name="re_password"
                            onChange = {this.handleChange}
                        class="standard_input" placeholder="Re password" autocomplete="off"/>
                        <div class={this.showError("re_password") != "" && "message_error"}>{this.showError("re_password")}</div>
                        
                        <select name="slcGender" value={this.state.slcGender} onChange={this.handleChange}>
                            <option value={-1}>-- Ẩn --</option>
                            <option value={0}>Nữ</option>
                            <option value={1}>Nam</option>
                        </select><br/><br/>
                        <input type="checkbox" id="chkBox" 
                            name="chkSaveMe"
                            checked = {this.state.chkSaveMe === true}
                            onChange={this.handleChange}
                        /> <label for="chkBox">Đồng ý điều khoản</label> <br/><br/>
                        <input type="submit" id="btnLogin" value="Register" class={this.isEmptyError() ? "btn_primary" : "btn_disable"}/>
                    </form>
                    <div class="tip_node">
                        <span class="not_account">Have account <a href="/user/login">login</a> now free!</span> <br/>
                        <span class="remember_account">Forgot password <a href="#">view here</a> !</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;