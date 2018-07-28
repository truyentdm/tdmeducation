import React,{Component } from "react"
import MenuLeft from "./Components/MenuLeft"
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import SmartEnglish from "./SmartEnglish/main"
class PageIndex extends Component{
    render(){
        return (
            <Router>
                <div id="middle">
                <div class="clearfix">
                    <MenuLeft/>
                    <div class="content fl_right">
                        <div id="category">
                            <Route path="/panel/StudySmart/:page" component={({match})=>{
                                return <SmartEnglish match={match}/>
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </Router>
        );
    }
}
export default PageIndex