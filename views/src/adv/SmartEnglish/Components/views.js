import React,{Component} from "react"
const {listView} =  require("../Common/view/listView");
const api = require("../../../utility/uri")

class Views extends Component{
    constructor(props){
        super(props)
        api.request(
            "/adv/api_select",
            {},
            "post"
        )
        .then(res=>{
            console.log("DATA>>>>>",res.data.data)
            this.setState({
                dict: res.data.data
            })
            setTimeout(()=>{
                console.log(this.state)
            },3000)
        });
    }
    state = {
        dict: []
    }
    componentDidMount = ()=>{
        
    }
    render(){
        return (
            <React.Fragment>
                <ul class="content-menu">
                    <li>
                        <a href="/panel"><i class="fa fa-home" aria-hidden="true"></i> Trang chủ</a>
                    </li>
                    <li>
                        <a href="#">Trang</a>
                    </li>
                    
                </ul>
                <ul class="head-menu">
                    <li>
                        <h1>Danh sách dữ liệu</h1>
                    </li>
                    <li>
                        <a href="/panel/StudySmart/AE" class="add">Thêm mới</a>
                    </li>
                </ul>
                <div class="tbl-view">
                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox"/></th>
                                <th>TT</th>
                                <th>Word English</th>
                                <th>Từ tiếng việt</th>
                                <th>Pronunciation</th>
                                <th>audio</th>
                                <th>Action</th>
                                <th>Ngày</th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log(this.state.dict.length)}
                            {
                                this.state.dict.length == 0 || typeof this.state.dict == "boolean" ? "Loading..." 
                                : this.state.dict.map(item=>{
                                    console.log(">>>>>",item)
                                    return listView(item)
                                })
                            }
                            
                        </tbody>
                    </table>
                    <ul class="dl-control">
                        <li>
                            Trang 
                            <input type="button" value="<"/>
                            <input type="text" value="2"/>
                            <input type="button" value=">"/>
                            trên 10
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                        </li>
                        <li>
                            xem
                            <select>
                                <option value="10">10</option>
                            </select>
                            bản ghi
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                        </li>
                        <li>Tổng 198 bản ghi</li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default Views