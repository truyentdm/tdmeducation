import React,{Component} from "react"
import View from "./Components/views"
import AE from "./Components/AE"
class SmartEnglish extends Component{
    router(){
        var slug = this.props.match.params.page;
        if(slug == "view"){
            return <View/>
        }else if(slug == "AE"){
            return <AE/>
        }

    }
    render(){
        return (
            <div>
                {this.router()}        
            </div>
        );
    }
}

export default SmartEnglish