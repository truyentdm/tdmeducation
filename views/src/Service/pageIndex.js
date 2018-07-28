import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from './Home'
import StudySmart from './Games/StudySmart'

import Header from "./Components/Header"
import Footer from "./Components/Footer"
import { Consumer } from "../Store/rootContext"

import User from './User'

import "../Styles/service.css"


class PageIndex extends Component{
    render(){
        return(
            <Router>
                <div id="service">
                    {/* Show Area */}
                    <Header/>
                    <Consumer>
                        {(value)=>{
                            return <div>
                                <Route path="/" component={Home} exact />
                                <Route path="/web" component={Home} exact />
                                <Route path="/mobile" component={Home} exact />
                                <Route path="/Games/StudySmart_Play" component={StudySmart} />
                                <Route path="/user/:page" component={({match})=>{
                                    return <User context={value} match={match}/>
                                }} />
                            </div>
                        }}
                     </Consumer>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default PageIndex;
                                /* {<Route path="/login" component={()=>{
                                    return <Login context={value} />
                                }} />
                                <Route path="/logout" component={()=>{
                                    return <Logout context={value}/>
                                }}/>
                                <Route path="/register" component={Register} />} */
