import React,{ Component } from "react"
class ExampleComponent extends Component{
    getName = (name)=>{
        var data = this.props.data;
        return data != undefined && data[name] != undefined ? data[name] : ""
    }
    render(){
        console.log("PROPS",this.props)
        return (
            <div class="tbl_example">
                <h3>Example {this.props.index+1}</h3>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan="2">
                                Image
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="text" value={this.getName("image")} name="image" lang={this.props.lang} position= {this.props.index} onChange={this.props.onChangeExample}/>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>Summary</td>
                            <td>Audio</td>
                        </tr>
                        <tr>
                            <td><input type="text" value={this.getName("summary")} name="summary" lang={this.props.lang} position= {this.props.index} onChange={this.props.onChangeExample}/></td>
                            <td><input type="text" value={this.getName("audio")} name="audio" lang={this.props.lang} position= {this.props.index} onChange={this.props.onChangeExample}/></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>Sentence</td>
                            <td>Audio</td>
                        </tr>
                        <tr>
                            <td><input type="text" value={this.getName("sentence")} name="sentence" lang={this.props.lang} position= {this.props.index} onChange={this.props.onChangeExample}/></td>
                            <td><input type="text" value={this.getName("audio")} name="audio" lang={this.props.lang} position= {this.props.index} onChange={this.props.onChangeExample}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
export default ExampleComponent;