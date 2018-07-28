import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import ViewContent from "./Components/viewContentComponent"
import SlideBottom from "./Components/slideBottomComponent"
import "./Styles/style.css"

class Home extends Component{
    constructor(props){
        super(props);
        this.changeURL = this.changeURL.bind(this)
    }

    changeURL(){
        this.props.history.push("/Games/StudySmart_Play")
    }
    
    render(){
        return(
            <div>
                <ViewContent/>
                {/* <SlideBottom/> */}
            </div>
        );
    }
}

export default Home;
