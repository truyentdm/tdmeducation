import React, { Component } from "react"
import { Link } from  "react-router-dom"
class AEexistID extends Component {
    render(){
        return (
            <div id="wp_form_user_login">
                <div id="login_toolbar_top">
                    <h3 id="login_title">Chỉnh sửa</h3>
                </div>
                <div id="login_content">
                    <div class="tip_node">
                    <div style={{textAlign: "center"}}>
                        <p>ID {this.props.id} không tồn tại </p>
                            <br/>
                            <Link id="btnLogin" class="btn_primary" to="/panel/StudySmart/view" style={{"color": "white"}}>Back view</Link>  
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AEexistID