import React,{Component} from "react"
import ExampleComponent from "../Common/exampleComponent"
import AENotExist from "../Common/AE/idAENotExist"
const api = require("../../../utility/uri")
import "../../Styles/ae.css"

var uri = api.getURI()
class AE extends Component{
    constructor(props){
        super(props)
        this.exist_id = uri.id != undefined && uri.id != "" && uri.id.length == 24
        if(this.exist_id){
            console.log("request server")
            api.request("/adv/api_select",api.getURI(),"post")
            .then(data=>{
                console.log("<>>>>>>",data.data.data[0])
                this.setState({
                    ...data.data.data[0],
                    totalExample: data.data.data[0].example["en"].length
                })
                setTimeout(()=>{
                    console.log(this.state)
                },2000)
            })
        }
        this.total = 2
    }
    state = {
        totalExample: 1,
        wordbook: {
            en: "",
            vi: ""
        },
        audio: {
            en: "",
            vi: ""
        },
        pronunciation: {
            en: "",
            vi: ""
        },
        example: {
            en : [],
            other: []
        },
        image: {
            en: ""
        },
        message: ""

    }
    handChange = (event)=>{
        const target = event.target;
        const lang = target.lang
        const name = target.name
        const value = target.type == "checkbox" ? target.checked : target.value
        this.setState({
            [name]: {
                ...this.state[name],
                [lang]: value
            }
        })
    }
    handleChangeExample = (event)=>{
        const name = event.target.name
        const lang = event.target.lang
        const position = event.target.getAttribute("position")
        const value = event.target.value
        var data = this.state.example[lang] == undefined ? [] : [...this.state.example[lang]]
        data[position] = this.state.example[lang] == undefined ? {
            [name] : value
        } : {
            ...this.state.example[lang][position],
            [name] : value
        }
        
        this.setState({
            example: {
                ...this.state.example,
                [lang] : data
            }
        })

    }
    handSubmit = (event)=>{
        event.preventDefault();
        var data = {
            wordbook: this.state.wordbook,
            audio:this.state.audio,
            example: this.state.example,
            pronunciation: this.state.pronunciation,
            image: this.state.image
        }
        if(this.isEmptyError()){
            if(this.exist_id){
                api.request("/adv/api_update",{data: data,id: uri.id},"post")
                .then(res=>{
                    console.log(res.data)
                    if(res.data.error == false){
                        location = "/panel/StudySmart/view"
                    }
                })
            }else{
                //thêm mới
                api.request("/english/api_insert",data,"post")
                .then(result=>{
                    console.log(result.data)
                    if(result.data.data){
                        this.setState({
                            totalExample: 1,
                            wordbook: {
                                en: "",
                                vi: ""
                            },
                            audio: {
                                en: "",
                                vi: ""
                            },
                            pronunciation: {
                                en: "",
                                vi: ""
                            },
                            example: {
                                en : [],
                                other: []
                            },
                            image: {
                                en: ""
                            },
                            message: ""
                    
                        })
                    }
                })
            }
        }else{
           
        }
        console.log(this.state)
    }
    isEmptyError = ()=>{
        if(this.state.wordbook["en"] == "" || this.state.wordbook["en"] == undefined || this.state.wordbook["en"] == null){
            this.setState({
                message: "Word book không được để trống"
            })
            return false
        }else{
            this.setState({
                message: ""
            })
            return true
        }
    }
    renderExample(lang){
        var element = []
        var data = null;
        for(var i = 0;i<this.state.totalExample;i++){
            data = this.state.example[lang] != undefined ? this.state.example[lang][i] : null
            element.push(<ExampleComponent data = {data} lang={lang} key={i} index={i} onChangeExample= {this.handleChangeExample}/>)
        }
        return element;
    }
    upExample(){
        this.setState({
            totalExample: this.state.totalExample+1
        })
    }
    downExample(){
        var current = this.state.totalExample <= 0 ? 0 : this.state.totalExample-1
        this.setState({
            totalExample: current
        })
    }
    render(){
        console.log(api.getURI())
        console.log("<><><>",this.exist_id)
        if(uri.id != undefined && this.exist_id == false){
            return (<AENotExist id = {uri.id}></AENotExist>);
        }
        return (
            <React.Fragment>
                <div id="ae">
                    <form>
                    <table cellSpacing="0">
                        <thead>
                            <tr>
                                <th colSpan="3" align="left">{this.exist_id ? "Chỉnh sửa" : "Thêm mới" }</th>   
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Key</td>
                                <td>English</td>
                                <td>
                                    <select>
                                        <option value="vi">Việt Nam</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Word book</td>
                                <td><input type="text" name="wordbook" lang="en" 
                                    onChange={this.handChange}
                                    value = {this.state.wordbook["en"]}
                                    />
                                </td>
                                <td>
                                    <input type="text" name="wordbook" lang="vi" 
                                        onChange={this.handChange}
                                        value = {this.state.wordbook["vi"]}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>audio</td>
                                <td><input type="text" name="audio" lang="en" 
                                    onChange={this.handChange}
                                    value = {this.state.audio["en"]}
                                    /></td>
                                <td>
                                    <input type="text" name="audio" lang="vi" 
                                    onChange={this.handChange}
                                    value = {this.state.audio["vi"]}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>pronunciation</td>
                                <td><input type="text" name="pronunciation" lang="en" 
                                    onChange={this.handChange}
                                    value = {this.state.pronunciation["en"]}
                                    /></td>
                                <td>
                                    <input type="text" name="pronunciation" lang="vi" 
                                    onChange={this.handChange}
                                    value = {this.state.pronunciation["vi"]}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>image</td>
                                <td><input type="text" name="image" lang="en" 
                                    onChange={this.handChange}
                                    value = {this.state.image["en"]}
                                    /></td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Example
                                    <div class="add_plus" onClick={this.upExample.bind(this)}><i class="fas fa-plus-square"></i></div>
                                    <div class="add_plus" onClick={this.downExample.bind(this)}><i class="fas fa-minus-square"></i></div>
                                </td>
                                <td>
                                    {this.renderExample("en")}
                                </td>
                                <td>
                                    {this.renderExample("vi")}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td colspan="2" align="left" class="message_error">
                                    {this.state.message}
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colspan="2" align="left">
                                    <input type="button" value="Lưu" class="btn_primary" onClick={this.handSubmit}/>
                                    &nbsp;&nbsp;
                                    <input type="button" value="Hủy" class="btn_white" onClick={()=>{
                                        location = "/panel/StudySmart/view"
                                    }}/>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default AE