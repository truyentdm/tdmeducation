import React,{Component} from "react"
import { Link, BrowserRouter as Router, Route, Redirect ,Switch } from "react-router-dom"
import IndexWeb from "../Pages/web/indexWeb"
import IndexMobile from "../Pages/app/indexMobile"
import IndexPublish from "../Pages/publish/indexPublish"
import About from "./aboutComponent"
import { Consumer } from '../../../Store/rootContext'
import "../Styles/viewContentComponent.css"
import "../Styles/viewContentComponentResponsive.css"
import "../Styles/video.css"

const MyMenu = ({label,to,activeOnlyWhenExact=false,isDefault=false})=>{
    let isDef = false;
    if(window.location.pathname == "/" && to == "/web"){
        isDef = true
    }
    return (
        <Route path={to} exact = {activeOnlyWhenExact} children= {({match})=>{
            let active = isDef || match ? "active" : "";
            return (
                <li class={active}><Link to={to}>{label}</Link></li>
            );
        }}
        />
    );
}

class ViewContent extends Component{
    constructor(props){
        super(props);
    }
    state = {
        keyword: "",
        error: ""
    }
    componentDidMount() {
        var canvasVideo = new CanvasVideoPlayer({
			videoSelector: '.js-video',
			canvasSelector: '.js-canvas',
			timelineSelector: '.js-timeline',
			audio: false,
			loop: false
		});
		canvasVideo.play();
    }
    onHandleChange = (e)=>{
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.handlError(name,value)
        this.setState({
            [name]: value
        })

    }
    handlError = (name,value)=>{
        if(name === "keyword"){
            const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            if( !email.test(value)){
                this.setState({
                    error: {
                        ...this.state.error,
                        [name]: "Định dạng email không hợp lệ",
                    }
                })
                console.log("error",this.state)
            }else{
                this.setState({
                    error: {
                        ...this.state.error,
                        [name]: "",
                    }
                })
            }
        }
    }
    haveError = (key)=>{
        return this.state.error[key] != ""
    }
    render(){
        return(
            <Router>
            <div id="wp_content">
                <div id="intro">
                    <div class="video">
                        <div class="video-responsive">
                            <video class="video js-video" muted>
                                <source src="/media/big_buck_bunny.webm" type="video/webm"/>
                                <source src="/media/big_buck_bunny.mp4" type="video/mp4"/>
                                <source src="/media/big_buck_bunny.ogv" type="video/ogg"/>
                                Your browser does not support HTML5 video.
                            </video>
            
                            <canvas class="canvas js-canvas"></canvas>
                        </div>
                        <div class="video-timeline js-timeline">
                            <div class="video-timeline-passed js-timeline-passed">
                            </div>
                        </div>
                    </div>
                    <div class="layer"></div>
                    <div id="main_search">
                        <div class="box_search">
                        <h2>TDM Education Online</h2>
                        <p>We don't make electronic document, We only make education interesting</p>
                        <form name="frmSearch">
                            <div class="input-group">
                            <input type="text" name="keyword" style={{ color: this.haveError("keyword") ? "red" : "black" }} onChange={this.onHandleChange} placeholder="Đăng ký nhận thông tin (example@mail.com)"/>
                            {/* <button name="btnSearch" type="submit"><i class="fa fa-search" aria-hidden="true"></i></button> */}
                            </div>
                        </form>
                        <div class="group">
                        <Consumer>
                            {(value)=>{
                                const { setMessageHeader } = value.action
                                return (<a onClick={()=>{
                                    if(this.haveError("keyword")){
                                        if(this.state.error["keyword"] == undefined){
                                            alert("Chưa điền email")
                                        }else{
                                            alert(this.state.error["keyword"])
                                        }
                                    }else{
                                        setMessageHeader({title: "Đăng ký thành công"})
                                    }
                                }} class="btn btn-success" style={{"margin-right": "10px","cursor":"pointer"}}>Đăng ký</a>);    
                            }}
                            
                        </Consumer>
                            <a href="#about" class="btn btn-info">Giới thiệu</a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="about"></div>  {/*only neo link */}
            <div id="view_left" class="container clearfix">
                <ul id="menu_view">	
                    <MyMenu label="WEB" to="/web"/>
                    <MyMenu label="App Mobile" to="/mobile"/>
                    <MyMenu label="Cộng đồng" to="/publish" />
                </ul>
                <div id="wp_view_home">
                <Switch>
                    <Route path="/web" component={IndexWeb}/>
                    <Route path="/mobile" component={IndexMobile}/>
                    <Route path="/publish" component={IndexPublish}/>
                    <Route component={IndexWeb}/>
                </Switch>
                </div>
            </div>
            <About/>
          </div>
          </Router>
        );
    }
}
export default ViewContent;