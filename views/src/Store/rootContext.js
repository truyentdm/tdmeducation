import React,{Component} from "react"
import axios from "axios"
const RootContext = React.createContext();

var timer = null;
export class Provider extends Component{
    constructor(props){
        super(props)
        this.getDataServer()
        .then(data=>{
            this.setState({
                user: data.user,
                isLogined: data.isLogined
            })
        })
        .catch(e=>console.log(e.toString()))
    }
    state = {
        user: {},
        isLogined: false,
        messageHeader: []
    }
    isAuthenticated = (fb)=>{
        this.getDataServer().then(data=>{
            fb(data.isLogined);
        })
    }
    getDataServer(){
        return new Promise((resolve,reject)=>{
            axios({
                method: "POST",
                url: "/user/passport"
            })
            .then(result=>{
                resolve(result.data)
            })
            .catch(e=>reject(e.toString()))
        }) 
    }
    setMessageHeader = (data)=>{
        this.setState({
            messageHeader: [...this.state.messageHeader,data]
        })
    }
    componentDidUpdate(){
        if(this.state.messageHeader.length > 0){
            clearInterval(timer)
            timer = setInterval(()=>{
                console.log("timer")
                if(this.state.messageHeader.length>0){
                    let tmp = [...this.state.messageHeader]
                    tmp.shift();
                    this.setState({
                        messageHeader: tmp
                    })
                }
            },1500)
        }else{
            clearInterval(timer)
        }
        if(this.state.messageHeader.length == 0){
            
        }
    }
    render(){
        return (
            <RootContext.Provider value={{
                state: this.state,
                action: {
                    isAuthenticated : this.isAuthenticated,
                    setMessageHeader: this.setMessageHeader
                }
            }}>
                {this.props.children}
            </RootContext.Provider>
        );
    }
}

export const Consumer = RootContext.Consumer