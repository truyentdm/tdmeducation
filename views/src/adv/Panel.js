import React,{Component} from "react"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import PageIndex from "./PageIndex"
import { Consumer } from "../Store/rootContext"
import "./Styles/layout.css"

class Pannel extends Component{
    passport(value){
        const action = value.action;
        action.isAuthenticated((data)=>{
            if(!data){
                location = "/user/login"
            }
        })
    }
    componentDidMount(){
    }
    render(){
        return (
            <div id="admin">
                <Consumer>
                {(value)=>{
                    this.passport(value)
                }}
                </Consumer>
                <Header/>
                <PageIndex/>
                {/* <Footer/> */}
            </div>
        );
    }
}
export default Pannel