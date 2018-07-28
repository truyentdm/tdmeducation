import React,{ Component } from 'react'
import { Link,Redirect } from 'react-router-dom'
var parser = new DOMParser()
class IndexWeb extends Component{
    state = {
        show: false,
        idView: 0,
        data: [{id: 0,url: "/Games/StudySmart_Play" ,title: "Tiếng anh trắc nghiệm thông minh",image: "/imgs/games/english.jpg" , detail: `Trí nhớ của con người sẽ bị mất dần theo thời gian. Bạn nhớ một thông tin vào lúc này nhưng lại quên vào lúc khác. 
        Có môt cách để củng cố trí nhớ đó chính là ôn tập. Nhưng ôn tập như thế nào để không bị nhàm chán và có kết quả tốt nhất. 
        Một nghiên cứu về trí nhớ được thực hiện vào những năm 1990 cho thấy, nếu được củng cố đúng cách, thì chỉ cần khoảng 10 lần củng cố, trí nhớ bạn sẽ được duy trì trong 1-3 năm. Đó là nghiên cứu về thuật toán lặp cách đoạn (Spaced repetition).
        Nói một cách đơn giản, nếu bạn học được thông tin X `,
            button: "Chơi"
        }]
    }
    helpFunction =(id)=>{
        this.setState({show: !this.state.show})
        this.setState({idView: id})
    }
    onCloseShow = ()=>{
        this.setState({show: false})
    }
	render(){
		return(
			<div>
                <ul id="menu_list_view" class="clearfix">
                    {this.state.data.map((item,index)=>{
                        return(
                            <li class="fl_left">
                                <div class="ml_img" onClick={()=>{
                                    this.helpFunction(index);
                                }}> <img src={item.image}/> </div>
                                <a class="ml_content" href="/Games/StudySmart_Play">{item.title}</a>
                            </li>
                        );
                    })}
                </ul>
                {
                    this.state.show && (
                        <div id="summary_content">
                            <div id="sm_title">
                                <div id="sm_label_text">{this.state.data[this.state.idView].title}</div>
                                <div id="sm_close" onClick={this.onCloseShow}>
                                    x
                                </div>
                            </div>
                            <div id="sm_content">
                                <p>{this.state.data[this.state.idView].detail}</p><br/>
                                <a href="/Games/StudySmart_Play" class="btn btn-error">Áp dụng</a>
                            </div>
                        </div>
                    )
                
                }
                
            </div>
		);
	}
}
export default IndexWeb;