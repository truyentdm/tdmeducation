import React,{Component} from "react"
import {Consumer} from "../../store/MyContext"

class InfoStudyComponent extends Component{
    render(){
        const { totalStudy,totalStudyToday } = this.props.data;
        if( totalStudy == null || totalStudy == undefined|| totalStudyToday == null || totalStudyToday == undefined){
            return(
                <div>
                    Chúc bạn học tập vui vẻ
                </div>
            );            
        }else{
            return(
                <div>
                    <p>Số từ đã học hôm nay: <b>{totalStudyToday}</b></p>
                    <p>Số từ đã nhớ: <b>{totalStudy}</b></p>
                </div>
            );
        }
        
    }
}

export default InfoStudyComponent;