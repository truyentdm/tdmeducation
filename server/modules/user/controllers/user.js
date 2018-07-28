const CONST = require("../../../constants")
const path = require("path")
const { Controller } = require(baseURL+"engine")
const { UserModel } = require("../models/userModel")
var crypto = require('crypto');

class User extends Controller{
    constructor(){
        super();
        this.um = new UserModel();
        this.user_pattern = new RegExp(/^[a-zA-Z0-9]{3,25}$/);
        this.email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
    async login(){
        console.log(">>>>>>>>>>>",this.req.body)
        const data = this.req.body;
        const username = data.username.trim();
        const password = data.password.trim();
        const chkSaveMe = data.chkSaveMe;
        var condition = "";
        //kiem tra => done =>
        var pwd = crypto.createHash('md5').update(password).digest("hex");
        if(this.user_pattern.test(username)){
            console.log("use username")
            condition = { username: username, password: pwd}
        }else if(this.email_pattern.test(username)){
            console.log("use email")
            condition = { email: username, password: pwd}
        }else{
            condition = ""
        }
        if(condition == ""){
            this.res.send(this.req.isAuthenticated())
        }else{
            await this.um.api_find(condition)
            .then(data=>{
                console.log("Data>>>>>>>>",data)
                if(data.error == 0 && data.exist == false){
                    this.res.send(this.req.isAuthenticated())
                }else if(data.error == 0 && data.exist == true){
                    this.req.session["user"] = {
                        user_login: data.result.username,
                        user_id: data.result._id,
                        isLogined: true
                    }
                    if(chkSaveMe){
                        this.res.cookie("user",this.req.session.user,{expires: new Date(Date.now()+1000*60*60)})
                    }
                    this.res.send(this.req.isAuthenticated())
                }else{
                    this.res.send(this.req.isAuthenticated())
                }
            })
            .catch(e=>{
                this.res.send({db: -1})
            })
        }
    }
    logout(){
        this.res.clearCookie("user");
        this.req.session.user = "";        
        this.res.send(true)
    }
    async register(){
        var response = null;
        const user_pattern = new RegExp(/^[a-zA-Z0-9]{3,25}$/);
        const email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(user_pattern.test(this.req.body.username.trim()) 
        && email_pattern.test(this.req.body.email.trim())
        && this.req.body.password.trim() ==  this.req.body.re_password.trim()
        && this.req.body.chkSaveMe 
        && this.req.body.slcGender >= -1 && this.req.body.slcGender <= 1
        ){
            var pwd = crypto.createHash('md5').update(this.req.body.password.trim()).digest("hex");
            let data = {
                username: this.req.body.username.trim(),
                email: this.req.body.email.trim(),
                password: pwd,
                gender: Number(this.req.body.slcGender),
                permission: null
            }
            console.log("<<<<<<<<<<<<<",data)
            await this.um.register(data)
            .then(res=>{
                if(typeof res == "boolean" && res){
                    response = { error : 0, username: this.req.body.username.trim()}
                }else{
                    response = { error : 1, username: this.req.body.username.trim()}
                }
            })
            .catch(e=>{
                response = { error : 0, db: -1}
            })
            
        }else{
            response = { error : 1, username: null}
        }
        this.res.send(response)
    }
    passport(){
        let data = ""
        if(this.req.isAuthenticated()){
            const user = this.req.session["user"] != undefined ? this.req.session["user"] : "" 
            data = user;
        }
        this.res.send(JSON.stringify({
            user: data,
            isLogined: this.req.isAuthenticated()
        }));
    }
    async update(){
        let res = "I Love Dung"
        await this.um.update()
        .then(data => {res = data})
        .catch(e=>console.log(e.toString()))
        this.res.send(res);
    }
    async exist_user(){
        let res = null;
        await this.um.api_Register(this.req.body.type,this.req.body.keyword)
        .then(data =>{
            res = {
                message: data,
                type: this.req.body.type
            }
        })
        .catch(e=>{
            res = {
                message:e,
                type: this.req.body.type
            };
        })
        
        this.res.send(res)
    }
}

module.exports.User = User;
