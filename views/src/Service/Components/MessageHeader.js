import React,{Component} from "react"

class MessageHeader extends Component{
    render(){
        return (
            <div class="box_message">
                <div class="close">x</div>
                <p>{this.props.children ? this.props.children : this.props.title}</p>
            </div>
        );
    }
}
export default MessageHeader