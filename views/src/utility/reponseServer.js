import axios from 'axios'
import * as CONFIG from '../Constants/index'

const reponseServer = (urlAPI,dataAPI,methodAPI="post")=>{
    return axios({
        url: `${CONFIG.API_URL}/${urlAPI}`,
        data: dataAPI,
        method: methodAPI
    }).catch(e=>{
        console.log(e.toString());
    })
}

export default reponseServer;